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

    // 3. Processamento e Validação Server-Side Rigorosa do Formulário de Contato (POST /contato/)
    if (request.method === "POST" && (url.pathname === "/contato/" || url.pathname === "/contato")) {
      let nome = "";
      let email = "";
      let assunto = "duvida";
      let mensagem = "";
      let honeypot = "";

      try {
        const contentType = request.headers.get("content-type") || "";
        if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
          const formData = await request.formData();
          nome = (formData.get("nome") || "").toString().trim();
          email = (formData.get("email") || "").toString().trim();
          assunto = (formData.get("assunto") || "duvida").toString().trim();
          mensagem = (formData.get("mensagem") || "").toString().trim();
          honeypot = (formData.get("website_url") || "").toString().trim();
        } else if (contentType.includes("application/json")) {
          const jsonBody = await request.json();
          nome = (jsonBody.nome || "").toString().trim();
          email = (jsonBody.email || "").toString().trim();
          assunto = (jsonBody.assunto || "duvida").toString().trim();
          mensagem = (jsonBody.mensagem || "").toString().trim();
          honeypot = (jsonBody.website_url || "").toString().trim();
        }
      } catch (e) {
        return new Response(JSON.stringify({ error: "Formato de requisição inválido." }), {
          status: 400,
          headers: { "Content-Type": "application/json; charset=UTF-8" },
        });
      }

      // Validação Server-Side contra bots e requisições vazias
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      const isNomeValido = nome.length >= 2 && nome.length <= 100;
      const isEmailValido = emailRegex.test(email) && email.length <= 120;
      const isMensagemValida = mensagem.length >= 5 && mensagem.length <= 3000;
      const isHoneypotLimpo = honeypot.length === 0;

      // Rejeita com HTTP 400 se campos obrigatórios estiverem vazios ou inválidos
      if (!isHoneypotLimpo || !isNomeValido || !isEmailValido || !isMensagemValida) {
        // Se a requisição veio de um formulário de navegador tradicional, redireciona com indicador de erro
        const accept = request.headers.get("accept") || "";
        if (accept.includes("text/html")) {
          return Response.redirect("https://nucleovip.com.br/contato/?erro=1#contato-erro", 303);
        }
        return new Response(
          JSON.stringify({
            status: "error",
            error: "Falha na validação: nome (mín. 2 caracteres), e-mail válido e mensagem (mín. 5 caracteres) são obrigatórios.",
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              "X-Content-Type-Options": "nosniff",
            },
          }
        );
      }

      // Se passou em todas as validações, dispara envio seguro em segundo plano
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

      return Response.redirect("https://nucleovip.com.br/contato/?enviado=1#contato-sucesso", 303);
    }

    // 4. Entrega dos arquivos estáticos com charset UTF-8 e cabeçalhos de segurança (HSTS, nosniff, etc.)
    const response = await env.ASSETS.fetch(request);
    const newHeaders = new Headers(response.headers);

    const contentType = newHeaders.get("content-type") || "";
    if (contentType.includes("text/html") && !contentType.includes("charset")) {
      newHeaders.set("content-type", "text/html; charset=UTF-8");
    }

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
