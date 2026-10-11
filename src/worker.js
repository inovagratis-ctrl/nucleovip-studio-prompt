export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Redirecionamento 301 de /wp-sitemap.xml para /sitemap.xml
    if (url.pathname === "/wp-sitemap.xml") {
      return Response.redirect(`${url.origin}/sitemap.xml`, 301);
    }

    // 2. Processamento Server-Side do formulário /contato/ (O e-mail pessoal fica 100% oculto no servidor)
    if (request.method === "POST" && (url.pathname === "/contato/" || url.pathname === "/contato")) {
      try {
        const formData = await request.formData();
        const nome = (formData.get("nome") || "").toString().trim();
        const email = (formData.get("email") || "").toString().trim();
        const assunto = (formData.get("assunto") || "duvida").toString().trim();
        const mensagem = (formData.get("mensagem") || "").toString().trim();
        const honeypot = (formData.get("website_url") || "").toString().trim();

        if (!honeypot && nome && email && mensagem) {
          // Encaminha em segundo plano para o endpoint de redirecionamento sem expor o e-mail pessoal no cliente
          ctx.waitUntil(
            fetch("https://formsubmit.co/ajax/eusimar72@gmail.com", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Origin: "https://nucleovip.com.br",
                Referer: "https://nucleovip.com.br/contato/",
              },
              body: JSON.stringify({
                _subject: `[Núcleo VIP - ${assunto.toUpperCase()}] Mensagem de ${nome}`,
                Canal_Institucional: "contato@nucleovip.com.br",
                Nome: nome,
                Email_Leitor: email,
                Assunto: assunto,
                Mensagem: mensagem,
                _replyto: email,
                _template: "table",
              }),
            }).catch(() => {})
          );
        }
      } catch (e) {
        // Ignora erro de parse e redireciona com feedback amigável
      }
      return Response.redirect(`${url.origin}/contato/?enviado=1#contato-sucesso`, 303);
    }

    // 3. Entrega de todos os arquivos estáticos do portal (HTML, WebP, CSS, JS, Sitemap)
    return env.ASSETS.fetch(request);
  },
};
