export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Entrega direta do ads.txt oficial em qualquer protocolo e subdomínio (Garante 200 OK sem redirects para o robô do AdSense)
    if (url.pathname === "/ads.txt") {
      return new Response("google.com, pub-3922432751903141, DIRECT, f08c47fec0942fa0\n", {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=UTF-8",
          "Cache-Control": "public, max-age=300",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    // 2. Redirecionamento canônico 301 para HTTPS e domínio sem www (Elimina duplicidade de host e protocolo)
    if (url.protocol === "http:" || url.hostname === "www.nucleovip.com.br") {
      return Response.redirect(`https://nucleovip.com.br${url.pathname}${url.search}`, 301);
    }

    // 2.0 API de Indicadores Financeiros em Tempo Real (Selic Oficial BCB, Dólar, Euro, IPCA e Parâmetros)
    if (url.pathname === "/api/indicadores" || url.pathname === "/api/indicadores/") {
      const fallbackData = {
        updated_at: new Date().toISOString(),
        status: "success",
        selic: { valor: 13.75, formato: "13,75% a.a.", fonte: "Banco Central do Brasil" },
        dolar: { valor: 5.48, variacao: 0.15, formato: "R$ 5,48", fonte: "Mercado Financeiro / BCB" },
        euro: { valor: 6.16, variacao: 0.20, formato: "R$ 6,16", fonte: "Mercado Financeiro / BCB" },
        ipca_12m: { valor: 4.58, formato: "4,58% (12m)", fonte: "IBGE / BCB" },
        salario_minimo: { valor: 1621.00, formato: "R$ 1.621", vigencia: "2026" },
        teto_inss: { valor: 8475.55, formato: "R$ 8.475", vigencia: "Portaria Interministerial MPS/MF" }
      };

      try {
        let selicVal = fallbackData.selic.valor;
        let dolarVal = fallbackData.dolar.valor;
        let dolarVar = fallbackData.dolar.variacao;
        let euroVal = fallbackData.euro.valor;
        let euroVar = fallbackData.euro.variacao;
        let ipcaVal = fallbackData.ipca_12m.valor;

        const [selicRes, moedasRes, ipcaRes] = await Promise.allSettled([
          fetch("https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json", {
            headers: { "Accept": "application/json" }
          }).then(r => r.ok ? r.json() : null),
          fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL", {
            headers: { "Accept": "application/json" }
          }).then(r => r.ok ? r.json() : null),
          fetch("https://api.bcb.gov.br/dados/serie/bcdata.sgs.13522/dados/ultimos/1?formato=json", {
            headers: { "Accept": "application/json" }
          }).then(r => r.ok ? r.json() : null)
        ]);

        if (selicRes.status === "fulfilled" && Array.isArray(selicRes.value) && selicRes.value[0]?.valor) {
          const parsed = parseFloat(selicRes.value[0].valor);
          if (!isNaN(parsed) && parsed > 0) selicVal = parsed;
        }

        if (moedasRes.status === "fulfilled" && moedasRes.value?.USDBRL?.bid) {
          const parsedUsd = parseFloat(moedasRes.value.USDBRL.bid);
          const parsedUsdVar = parseFloat(moedasRes.value.USDBRL.pctChange);
          if (!isNaN(parsedUsd)) dolarVal = parsedUsd;
          if (!isNaN(parsedUsdVar)) dolarVar = parsedUsdVar;
        }

        if (moedasRes.status === "fulfilled" && moedasRes.value?.EURBRL?.bid) {
          const parsedEur = parseFloat(moedasRes.value.EURBRL.bid);
          const parsedEurVar = parseFloat(moedasRes.value.EURBRL.pctChange);
          if (!isNaN(parsedEur)) euroVal = parsedEur;
          if (!isNaN(parsedEurVar)) euroVar = parsedEurVar;
        }

        if (ipcaRes.status === "fulfilled" && Array.isArray(ipcaRes.value) && ipcaRes.value[0]?.valor) {
          const parsedIpca = parseFloat(ipcaRes.value[0].valor);
          if (!isNaN(parsedIpca) && parsedIpca > 0) ipcaVal = parsedIpca;
        }

        const payload = {
          updated_at: new Date().toISOString(),
          status: "success",
          selic: {
            valor: selicVal,
            formato: `${selicVal.toFixed(2).replace(".", ",")}% a.a.`,
            fonte: "Banco Central do Brasil (Copom)"
          },
          dolar: {
            valor: dolarVal,
            variacao: dolarVar,
            formato: `R$ ${dolarVal.toFixed(2).replace(".", ",")}`,
            variacao_texto: `${dolarVar >= 0 ? "+" : ""}${dolarVar.toFixed(2).replace(".", ",")}%`,
            fonte: "Mercado Financeiro / BCB"
          },
          euro: {
            valor: euroVal,
            variacao: euroVar,
            formato: `R$ ${euroVal.toFixed(2).replace(".", ",")}`,
            variacao_texto: `${euroVar >= 0 ? "+" : ""}${euroVar.toFixed(2).replace(".", ",")}%`,
            fonte: "Mercado Financeiro / BCB"
          },
          ipca_12m: {
            valor: ipcaVal,
            formato: `${ipcaVal.toFixed(2).replace(".", ",")}%`,
            fonte: "IBGE / Banco Central"
          },
          salario_minimo: {
            valor: 1621.00,
            formato: "R$ 1.621,00",
            vigencia: "Ano Base 2026"
          },
          teto_inss: {
            valor: 8475.55,
            formato: "R$ 8.475,55",
            vigencia: "Portaria Interministerial MPS/MF"
          }
        };

        return new Response(JSON.stringify(payload), {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Cache-Control": "public, max-age=180, s-maxage=300",
            "Access-Control-Allow-Origin": "*",
            "X-Content-Type-Options": "nosniff"
          }
        });
      } catch (err) {
        return new Response(JSON.stringify(fallbackData), {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Cache-Control": "public, max-age=60",
            "Access-Control-Allow-Origin": "*",
            "X-Content-Type-Options": "nosniff"
          }
        });
      }
    }

    // 3. Redirecionamento 301 de /wp-sitemap.xml para /sitemap.xml
    if (url.pathname === "/wp-sitemap.xml") {
      return Response.redirect("https://nucleovip.com.br/sitemap.xml", 301);
    }

    // 2.2 Redirecionamento 301 de feeds legados do WordPress (/feed/, */feed/) para a página canônica
    if (url.pathname.endsWith("/feed/") || url.pathname.endsWith("/feed")) {
      let canonicalPath = url.pathname.replace(/\/feed\/?$/, "") || "/";
      if (!canonicalPath.endsWith("/") && !canonicalPath.includes(".")) {
        canonicalPath += "/";
      }
      return Response.redirect(`https://nucleovip.com.br${canonicalPath}`, 301);
    }

    // 2.3 Resposta amigável para endpoints REST legados (/wp-json/*) para evitar 404 no Googlebot
    if (url.pathname.startsWith("/wp-json")) {
      return new Response(JSON.stringify({
        status: "ok",
        name: "Núcleo VIP — Guia do Cidadão",
        url: "https://nucleovip.com.br",
        description: "Portal Independente de Utilidade Pública"
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "Cache-Control": "public, max-age=86400",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    // 2.4 Redirecionamento 301 de URLs legadas com parâmetros do WordPress (/?p=... ou /?page_id=...)
    if (url.searchParams.has("p") || url.searchParams.has("page_id") || url.searchParams.has("feed")) {
      return Response.redirect("https://nucleovip.com.br/", 301);
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
