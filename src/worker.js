export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Redirecionamento canônico 301 para HTTPS e domínio sem www (Elimina duplicidade de host e protocolo)
    if (url.protocol === "http:" || url.hostname === "www.nucleovip.com.br") {
      return Response.redirect(`https://nucleovip.com.br${url.pathname}${url.search}`, 301);
    }

    // 2. Redirecionamento 301 de /wp-sitemap.xml para /sitemap.xml
    if (url.pathname === "/wp-sitemap.xml") {
      return Response.redirect("https://nucleovip.com.br/sitemap.xml", 301);
    }

    // 3. Processamento Server-Side do formulário de contato (POST /contato/ e /contato)
    if (request.method === "POST" && (url.pathname === "/contato/" || url.pathname === "/contato")) {
      try {
        const formData = await request.formData();
        const nome = (formData.get("nome") || "").toString().trim();
        const email = (formData.get("email") || "").toString().trim();
        const assunto = (formData.get("assunto") || "duvida").toString().trim();
        const mensagem = (formData.get("mensagem") || "").toString().trim();
        const honeypot = (formData.get("website_url") || "").toString().trim();

        if (!honeypot && nome && email && mensagem) {
          // Encaminha a mensagem em segundo plano para o destino do administrador
          ctx.waitUntil(
            fetch("https://api.web3forms.com/submit", {
              method: "POST",
              headers: { "Content-Type": "application/json", "Accept": "application/json" },
              body: JSON.stringify({
                access_key: "627ca384-3580-45ec-9df2-9b2f6bb8bb2c",
                from_name: "Ouvidoria Núcleo VIP",
                subject: `[Núcleo VIP - ${assunto.toUpperCase()}] Mensagem de ${nome}`,
                email_leitor: email,
                replyto: email,
                name: nome,
                message: mensagem,
                assunto: assunto,
                canal_oficial: "contato@nucleovip.com.br",
              }),
            }).catch(() => {})
          );
        }
      } catch (e) {
        // Ignora erro e redireciona
      }
      return Response.redirect("https://nucleovip.com.br/contato/?enviado=1#contato-sucesso", 303);
    }

    // 4. Entrega dos arquivos estáticos com charset UTF-8 e cabeçalhos de segurança (HSTS, nosniff, etc.)
    const response = await env.ASSETS.fetch(request);
    const newHeaders = new Headers(response.headers);

    const contentType = newHeaders.get("content-type") || "";
    if (contentType.includes("text/html") && !contentType.includes("charset")) {
      newHeaders.set("content-type", "text/html; charset=UTF-8");
    }

    // Cabeçalhos de segurança e boas práticas de rede
    newHeaders.set("X-Content-Type-Options", "nosniff");
    newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
    newHeaders.set("X-Frame-Options", "SAMEORIGIN");
    newHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
