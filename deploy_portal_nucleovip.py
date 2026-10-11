import paramiko
import os

VPS_HOST = '216.22.13.236'
VPS_USER = 'root'
VPS_PASS = 'PgmgTVJ8ftewUCzp'

LOCAL_ZIP = r"C:\Users\Eusimar\.gemini\antigravity\scratch\portal-utilidade-publica-wp\guia-cidadao-adsense.zip"

NGINX_CONF = """server {
    server_name nucleovip.com.br www.nucleovip.com.br 216.22.13.236 _;

    root /var/www/nucleovip_wp;
    index index.php index.html;

    client_max_body_size 64M;

    # Gzip compression for PageSpeed 99+
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \\.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.5-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2)$ {
        expires 365d;
        add_header Cache-Control "public, no-transform";
        log_not_found off;
    }

    location ~ /\\.ht {
        deny all;
    }

    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/nucleovip.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/nucleovip.com.br/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name nucleovip.com.br www.nucleovip.com.br 216.22.13.236 _;
    return 301 https://nucleovip.com.br$request_uri;
}
"""

SEED_PHP = r"""<?php
// Script de inicialização limpa e população de artigos reais de Utilidade Pública
require_once '/var/www/nucleovip_wp/wp-load.php';

// 1. Configura opções gerais do Portal
update_option('blogname', 'Núcleo VIP — Guia do Cidadão');
update_option('blogdescription', 'Portal Independente de Utilidade Pública, Benefícios Sociais, Documentos Gov.br e Calculadoras CLT');
update_option('timezone_string', 'America/Sao_Paulo');
update_option('date_format', 'd/m/Y');
update_option('time_format', 'H:i');
update_option('posts_per_page', 12);
update_option('permalink_structure', '/%postname%/');

// Remove post e página padrão ("Hello world!" / "Sample Page")
wp_delete_post(1, true);
wp_delete_post(2, true);
wp_delete_post(3, true);

// 2. Executa o instalador de estrutura do nosso tema (4 Categorias + 5 Páginas Obrigatórias AdSense & Calculadoras)
if (function_exists('guia_cidadao_install_structure')) {
    guia_cidadao_install_structure();
}

$cat_beneficios = get_category_by_slug('beneficios-trabalhador')->term_id;
$cat_documentos = get_category_by_slug('documentos-gov-br')->term_id;
$cat_financas   = get_category_by_slug('contas-financas')->term_id;
$cat_calc       = get_category_by_slug('calculadoras-simuladores')->term_id;

// 3. Artigos 100% verdadeiros, atuais e baseados em fontes públicas oficiais (Gov.br, Caixa, INSS, Receita Federal, CLT)
$articles = array(
    // CATEGORIA 1: BENEFÍCIOS & TRABALHADOR
    array(
        'title' => 'Como Consultar o FGTS pelo CPF no Aplicativo Oficial e Entender o Saque-Aniversário',
        'slug'  => 'como-consultar-fgts-pelo-cpf-saque-aniversario',
        'cat'   => $cat_beneficios,
        'excerpt' => 'Veja o passo a passo oficial para consultar o saldo do Fundo de Garantia pelo celular, emitir o extrato analítico e conferir as regras vigentes do Saque-Aniversário e Saque-Rescisão.',
        'content' => '<div class="gov-callout"><span class="gov-callout-title">📌 Resumo Oficial ao Trabalhador:</span> A consulta ao saldo e extrato do Fundo de Garantia do Tempo de Serviço (FGTS) é totalmente gratuita e deve ser realizada exclusivamente pelo aplicativo oficial <strong>FGTS da Caixa Econômica Federal</strong> (disponível para Android e iOS) utilizando o login da conta Gov.br.</div>
<h2>Quem tem direito ao saldo do FGTS?</h2>
<p>Todo trabalhador brasileiro com contrato formal regido pela Consolidação das Leis do Trabalho (CLT), além de trabalhadores domésticos, rurais, temporários, avulsos e safreiros, tem direito ao depósito mensal equivalente a <strong>8% do salário bruto</strong> (ou 2% no caso de contratos de Jovem Aprendiz) em uma conta vinculada na Caixa Econômica Federal.</p>
<p>O valor é depositado mensalmente pelo empregador até o dia 20 de cada mês e não pode ser descontado do salário do empregado.</p>
<h2>Passo a passo para consultar o FGTS pelo CPF no celular</h2>
<ol>
<li>Baixe o aplicativo oficial <strong>FGTS</strong> na Google Play Store ou Apple App Store (verifique se o desenvolvedor é a <em>Caixa Econômica Federal</em>);</li>
<li>Abra o aplicativo e toque em <strong>"Entrar no aplicativo"</strong>;</li>
<li>Informe seu <strong>CPF</strong> e a senha cadastrada (a mesma utilizada no portal Gov.br);</li>
<li>Na tela inicial, selecione <strong>"Meu FGTS"</strong> para visualizar o saldo de todos os contratos de trabalho (atuais e inativos);</li>
<li>Para baixar o comprovante completo para imposto de renda ou conferência de depósitos, toque em <strong>"Ver Extrato"</strong> e depois em <strong>"Gerar Extrato PDF"</strong>.</li>
</ol>
<h2>Diferença entre Saque-Rescisão e Saque-Aniversário</h2>
<p>Pela legislação vigente, todo trabalhador ingressa automaticamente na modalidade <strong>Saque-Rescisão</strong>: caso seja demitido sem justa causa, saca 100% do saldo acumulado mais a multa rescisória de 40%.</p>
<p>Já na modalidade opcional <strong>Saque-Aniversário</strong>, o trabalhador pode retirar anualmente uma parcela do saldo no mês do seu nascimento, acrescida de uma parcela adicional conforme a tabela progressiva da Caixa (alíquotas de 5% a 50% dependendo do saldo). Contudo, caso seja demitido sem justa causa enquanto estiver no Saque-Aniversário, saca apenas a multa de 40%, mantendo o saldo restante para os saques anuais.</p>
<p><em>Fonte oficial de referência: <a href="https://www.caixa.gov.br/beneficios-trabalhador/fgts/" target="_blank" rel="noopener nofollow">Caixa Econômica Federal — FGTS</a> e Agência Brasil (EBC).</em></p>'
    ),
    array(
        'title' => 'Meu INSS: Como Consultar Benefícios, Extrato CNIS e Agendar Perícia pela Internet',
        'slug'  => 'meu-inss-como-consultar-beneficios-cnis-pericia',
        'cat'   => $cat_beneficios,
        'excerpt' => 'Guia completo para acessar o portal Meu INSS com sua conta Gov.br, emitir o extrato previdenciário CNIS, consultar calendário de pagamentos e acompanhar requerimentos.',
        'content' => '<div class="gov-callout"><span class="gov-callout-title">📌 Serviço Público Gratuito:</span> Mais de 90 serviços da Previdência Social — incluindo simulação de aposentadoria, extrato de contribuição (CNIS) e requerimento de auxílio por incapacidade temporária — podem ser feitos sem sair de casa pelo portal ou aplicativo <strong>Meu INSS</strong> ou pela Central Telefônica <strong>135</strong>.</div>
<h2>O que é possível fazer pelo portal Meu INSS?</h2>
<p>O <strong>Meu INSS</strong> é a plataforma digital oficial do Instituto Nacional do Seguro Social. Por meio dela, segurados urbanos e rurais, aposentados e pensionistas conseguem acessar o histórico completo de vínculos trabalhistas e realizar solicitações sem precisar comparecer presencialmente a uma agência da Previdência Social.</p>
<h2>Passo a passo para emitir o Extrato de Contribuição (CNIS)</h2>
<p>O Cadastro Nacional de Informações Sociais (CNIS) é o documento que comprova todos os meses trabalhados e recolhimentos previdenciários para fins de aposentadoria:</p>
<ol>
<li>Acesse o site oficial <code>meu.inss.gov.br</code> ou abra o aplicativo <strong>Meu INSS</strong>;</li>
<li>Clique em <strong>"Entrar com gov.br"</strong> e digite seu CPF e senha;</li>
<li>No menu principal, clique em <strong>"Extrato de Contribuição (CNIS)"</strong>;</li>
<li>Role até o final da página e selecione <strong>"Baixar PDF"</strong>, escolhendo a opção "Relações Previdenciárias e Remunerações".</li>
</ol>
<h2>Como consultar o calendário de pagamentos do INSS</h2>
<p>Os depósitos mensais do INSS seguem o <strong>número final do cartão de benefício (NB)</strong>, desconsiderando o dígito verificador após o traço. Por exemplo, se o número do seu benefício é <code>123.456.789-0</code>, o número final considerado para o calendário é o <strong>9</strong>. Os calendários são divididos entre segurados que recebem até 1 salário mínimo e segurados que recebem acima do piso nacional.</p>
<p><em>Fonte oficial de referência: <a href="https://www.gov.br/inss/pt-br" target="_blank" rel="noopener nofollow">Ministério da Previdência Social / Meu INSS (Gov.br)</a>.</em></p>'
    ),
    array(
        'title' => 'Bolsa Família e Cadastro Único (CadÚnico): Quem Tem Direito e Como Manter os Dados Atualizados',
        'slug'  => 'bolsa-familia-cadunico-quem-tem-direito-atualizacao',
        'cat'   => $cat_beneficios,
        'excerpt' => 'Entenda os critérios oficiais de renda per capita do Bolsa Família, os adicionais para crianças, gestantes e adolescentes, e como atualizar o Cadastro Único no CRAS.',
        'content' => '<div class="gov-callout success"><span class="gov-callout-title">📌 Regra Oficial de Elegibilidade:</span> O principal critério para ingresso no Programa Bolsa Família é que a renda mensal por pessoa da família (renda <em>per capita</em>) seja de até <strong>R$ 218,00</strong>, além de estar com o <strong>Cadastro Único (CadÚnico)</strong> atualizado nos últimos 24 meses.</div>
<h2>Como calcular a renda familiar por pessoa?</h2>
<p>Para saber se sua família se enquadra nas regras do Ministério do Desenvolvimento e Assistência Social, Família e Combate à Fome (MDS), some todos os rendimentos mensais brutos das pessoas que moram na mesma casa (excluindo benefícios temporários e indenizatórios) e divida pelo total de moradores.</p>
<p>Por exemplo: uma família de 5 pessoas em que apenas um integrante recebe R$ 1.000,00 por mês possui renda <em>per capita</em> de R$ 200,00 — estando dentro do limite de R$ 218,00 por integrante.</p>
<h2>Adicionais da Cesta de Benefícios</h2>
<ul>
<li><strong>Benefício de Renda de Cidadania (BRC):</strong> R$ 142 por integrante da família, garantindo o piso mínimo de R$ 600 por domicílio;</li>
<li><strong>Benefício Primeira Infância (BPI):</strong> Adicional de R$ 150 por criança de zero a 6 anos incompletos;</li>
<li><strong>Benefício Variável Familiar (BVF):</strong> Adicional de R$ 50 para gestantes, nutrizes e crianças/adolescentes entre 7 e 18 anos incompletos.</li>
</ul>
<h2>O que é a Regra de Proteção para quem consegue emprego com carteira assinada?</h2>
<p>Pela Regra de Proteção do Governo Federal, caso um integrante da família consiga emprego formal (CLT) e a renda mensal por pessoa suba para até meio salário mínimo, a família <strong>não perde o benefício imediatamente</strong>: ela permanece no programa recebendo 50% do valor do benefício por até 24 meses.</p>
<p><em>Fonte oficial de referência: <a href="https://www.gov.br/mds/pt-br/acoes-e-programas/bolsa-familia" target="_blank" rel="noopener nofollow">Ministério do Desenvolvimento e Assistência Social (Gov.br)</a> e Agência Brasil.</em></p>'
    ),

    // CATEGORIA 2: DOCUMENTOS & GOV.BR
    array(
        'title' => 'Nova Carteira de Identidade Nacional (CIN): Documentos Necessários e Como Agendar a 1ª Via Gratuita',
        'slug'  => 'nova-carteira-de-identidade-nacional-cin-como-tirar',
        'cat'   => $cat_documentos,
        'excerpt' => 'A Nova Carteira de Identidade Nacional (CIN) unifica o número de identificação pelo CPF em todo o Brasil e tem 1ª via gratuita. Veja como agendar no seu estado.',
        'content' => '<div class="gov-callout"><span class="gov-callout-title">📌 Mudança Oficial em Todo o Brasil:</span> A nova <strong>Carteira de Identidade Nacional (CIN)</strong> adota o <strong>CPF como número único de identificação</strong> em todas as 27 unidades da federação, extinguindo a possibilidade de um cidadão possuir números de RG diferentes em cada estado. A emissão da primeira via em papel de segurança e a versão digital no aplicativo Gov.br são <strong>100% gratuitas</strong> por lei federal.</div>
<h2>Quais documentos são exigidos para emitir a Nova Identidade (CIN)?</h2>
<p>Para solicitar a emissão da sua CIN no instituto de identificação do seu estado (como Poupatempo em SP, Detran no RJ, SAC na Bahia, UAI em MG ou Vapt Vupt em GO/CE), você precisa apresentar:</p>
<ul>
<li><strong>Certidão de Nascimento</strong> (para solteiros) ou <strong>Certidão de Casamento</strong> (para casados, divorciados ou viúvos, com a respectiva averbação) em via original ou cópia autenticada legível;</li>
<li><strong>CPF regularizado</strong> junto à Receita Federal (caso o candidato ainda não tenha CPF, o próprio órgão emissor realiza a inscrição no momento do atendimento).</li>
</ul>
<h2>Como acessar a versão digital da CIN no celular?</h2>
<ol>
<li>Após receber a carteira física, abra o aplicativo oficial <strong>Gov.br</strong> no seu smartphone;</li>
<li>Faça login com sua conta nível <strong>Prata ou Ouro</strong>;</li>
<li>Toque na aba <strong>"Carteira de Documentos"</strong> e selecione <strong>"Adicionar Documento"</strong> &rarr; <strong>"Carteira de Identidade"</strong>;</li>
<li>Aponte a câmera para o QR Code impresso no verso da sua CIN para validar o documento oficial com valor jurídico em todo o território nacional.</li>
</ol>
<p><em>Fonte oficial de referência: <a href="https://www.gov.br/governodigital/pt-br/identidade/identificacao-do-cidadao-e-carteira-de-identidade-nacional" target="_blank" rel="noopener nofollow">Ministério da Gestão e da Inovação em Serviços Públicos — CIN (Gov.br)</a>.</em></p>'
    ),
    array(
        'title' => 'Como Subir a Conta Gov.br para Nível Prata ou Ouro pelo Celular em 5 Minutos',
        'slug'  => 'como-subir-conta-gov-br-nivel-prata-ou-ouro',
        'cat'   => $cat_documentos,
        'excerpt' => 'Muitos serviços do INSS, Receita Federal (Valores a Receber) e Carteira Digital exigem conta Gov.br Prata ou Ouro. Veja todas as formas oficiais de aumentar seu nível.',
        'content' => '<div class="gov-callout"><span class="gov-callout-title">📌 Por que o nível da conta Gov.br é importante?</span> Contas de nível <strong>Bronze</strong> possuem acesso básico. Já os níveis <strong>Prata</strong> e <strong>Ouro</strong> liberam assinatura eletrônica com validade jurídica, consulta ao Sistema Valores a Receber do Banco Central, declaração pré-preenchida do Imposto de Renda e serviços avançados do Meu INSS.</div>
<h2>Como alcançar o Nível Prata no Gov.br?</h2>
<p>Você pode elevar sua conta para o nível <strong>Prata</strong> gratuitamente de duas maneiras principais:</p>
<ol>
<li><strong>Reconhecimento facial pelo aplicativo Gov.br:</strong> O sistema cruza a foto do seu rosto (biometria facial) com a base da sua Carteira Nacional de Habilitação (CNH);</li>
<li><strong>Validação via Internet Banking de bancos credenciados:</strong> Basta fazer login na sua conta Gov.br usando o credenciamento de um dos bancos parceiros (Banco do Brasil, Caixa, Bradesco, Itaú, Santander, Nubank, Sicredi, Sicoob, Banrisul, Agibank, Mercantil, entre outros).</li>
</ol>
<h2>Como alcançar o Nível Ouro (Segurança Máxima)?</h2>
<p>O selo <strong>Ouro</strong> é concedido automaticamente quando o cidadão realiza a validação facial pelo aplicativo Gov.br cruzando os dados com a biometria da <strong>Justiça Eleitoral (TSE)</strong>, lê o QR Code da nova Carteira de Identidade Nacional (CIN) ou utiliza um Certificado Digital compatível com a ICP-Brasil.</p>
<p><em>Fonte oficial de referência: <a href="https://www.gov.br/governodigital/pt-br/conta-gov-br/" target="_blank" rel="noopener nofollow">Portal Gov.br — Níveis da Conta</a>.</em></p>'
    ),
    array(
        'title' => 'Certidão Negativa de Débitos e Situação Cadastral do CPF: Como Emitir Grátis na Receita Federal',
        'slug'  => 'certidao-negativa-debitos-situacao-cadastral-cpf-receita',
        'cat'   => $cat_documentos,
        'excerpt' => 'Precisa comprovar que seu CPF está regular ou emitir a Certidão Negativa de Débitos Federais (CND) para financiamento, posse em concurso ou inventário? Veja o passo a passo.',
        'content' => '<div class="gov-callout"><span class="gov-callout-title">📌 Emissão 100% Gratuita:</span> A Receita Federal do Brasil e a Procuradoria-Geral da Fazenda Nacional (PGFN) emitem gratuitamente pela internet tanto o <strong>Comprovante de Situação Cadastral no CPF</strong> quanto a <strong>Certidão de Débitos Relativos a Créditos Tributários Federais (CND)</strong>. Nunca pague intermediários para emitir essas certidões.</div>
<h2>1. Como emitir o Comprovante de Situação Cadastral do CPF</h2>
<p>Importante lembrar: estar com o CPF "Regular" na Receita Federal significa que não há pendências cadastrais ou declarações de Imposto de Renda em atraso (não tem relação com restrições comerciais em órgãos como Serasa ou SPC).</p>
<ol>
<li>Acesse o portal oficial de Serviços da Receita Federal (<code>servicos.receita.fazenda.gov.br</code>);</li>
<li>Selecione <strong>"Consultar CPF"</strong>;</li>
<li>Digite o número do seu CPF e a sua data de nascimento;</li>
<li>Marque a caixa de verificação ("Sou humano") e clique em <strong>"Consultar"</strong> para gerar o comprovante com código de autenticidade.</li>
</ol>
<h2>2. Como emitir a Certidão Negativa de Débitos Federais (CND)</h2>
<p>Na mesma página de serviços da Receita Federal, acesse a opção <strong>"Certidão de Regularidade Fiscal — Pessoa Física"</strong>, informe o CPF e clique em "Emitir Certidão". Caso não existam pendências tributárias ou inscrições em Dívida Ativa da União, o PDF é gerado na hora com validade de 180 dias.</p>
<p><em>Fonte oficial de referência: <a href="https://www.gov.br/receitafederal/pt-br" target="_blank" rel="noopener nofollow">Secretaria Especial da Receita Federal do Brasil</a>.</em></p>'
    ),

    // CATEGORIA 3: CONTAS & FINANÇAS
    array(
        'title' => 'Sistema Valores a Receber (SVR) do Banco Central: Como Consultar Dinheiro Esquecido pelo CPF',
        'slug'  => 'sistema-valores-a-receber-banco-central-consultar-cpf',
        'cat'   => $cat_financas,
        'excerpt' => 'Saiba como consultar gratuitamente no site oficial do Banco Central se você ou familiares falecidos possuem saldo esquecido em bancos, consórcios ou cooperativas.',
        'content' => '<div class="gov-callout warning"><span class="gov-callout-title">⚠️ Alerta Oficial Contra Golpes:</span> O <strong>Banco Central do Brasil</strong> informa que o único site oficial para consulta e resgate de valores esquecidos é <code>valoresareceber.bcb.gov.br</code>. O serviço é <strong>totalmente gratuito</strong> e o Banco Central nunca envia links por WhatsApp ou SMS nem cobra taxas para liberar transferências via Pix.</div>
<h2>Que tipo de dinheiro pode estar disponível no SVR?</h2>
<p>O Sistema Valores a Receber reúne recursos deixados por pessoas físicas (incluindo falecidas) e empresas (CNPJ) em instituições financeiras autorizadas pelo Banco Central, tais como:</p>
<ul>
<li>Contas correntes ou contas poupança encerradas com saldo disponível;</li>
<li>Cotas de capital e rateio de sobras de cooperativas de crédito;</li>
<li>Recursos não procurados de grupos de consórcio encerrados;</li>
<li>Tarifas ou parcelas de operações de crédito cobradas indevidamente e devolvidas pelo banco;</li>
<li>Contas de pagamento pré-pagas ou pós-pagas encerradas.</li>
</ul>
<h2>Passo a passo para consultar e pedir a devolução via Pix</h2>
<ol>
<li>Acesse exclusivamente <code>valoresareceber.bcb.gov.br</code>;</li>
<li>Clique em <strong>"Consulte se tem valores a receber"</strong> e informe seu CPF e data de nascimento (ou CNPJ e data de abertura da empresa);</li>
<li>Caso o sistema indique que há valores disponíveis, clique em <strong>"Acessar o SVR"</strong> utilizando sua conta <strong>Gov.br nível Prata ou Ouro</strong> com verificação em duas etapas habilitada;</li>
<li>Escolha uma de suas chaves Pix (CPF, e-mail, telefone ou aleatória) para receber a transferência diretamente na sua conta em até 12 dias úteis.</li>
</ol>
<p><em>Fonte oficial de referência: <a href="https://www.bcb.gov.br/meubc/valores-a-receber" target="_blank" rel="noopener nofollow">Banco Central do Brasil — SVR</a>.</em></p>'
    ),
    array(
        'title' => 'Tarifa Social de Energia Elétrica: Quem Tem Direito ao Desconto de até 65% na Conta de Luz',
        'slug'  => 'tarifa-social-energia-eletrica-desconto-conta-de-luz',
        'cat'   => $cat_financas,
        'excerpt' => 'Famílias inscritas no Cadastro Único ou beneficiárias do BPC/LOAS têm direito a descontos automáticos de até 65% na fatura de energia elétrica. Veja as regras da ANEEL.',
        'content' => '<div class="gov-callout success"><span class="gov-callout-title">📌 Direito Garantido por Lei Federal:</span> Pela Lei nº 14.203/2021 e regulamentação da <strong>ANEEL (Agência Nacional de Energia Elétrica)</strong>, a inclusão na <strong>Tarifa Social de Energia Elétrica (TSEE)</strong> passou a ser automática para famílias com Cadastro Único atualizado cujo titular da conta de luz pertença ao núcleo familiar.</div>
<h2>Qual é o percentual de desconto na conta de luz?</h2>
<p>O desconto na fatura mensal de energia elétrica é cumulativo conforme a faixa de consumo mensal em quilowatts-hora (kWh):</p>
<ul>
<li>Consumo de <strong>0 a 30 kWh/mês</strong>: <strong>65% de desconto</strong>;</li>
<li>Consumo de <strong>31 a 100 kWh/mês</strong>: <strong>40% de desconto</strong>;</li>
<li>Consumo de <strong>101 a 220 kWh/mês</strong>: <strong>10% de desconto</strong>;</li>
<li>Para famílias indígenas e quilombolas inscritas no CadÚnico, o desconto é de <strong>100% (isenção total)</strong> até o limite de 50 kWh/mês.</li>
</ul>
<h2>Quem tem direito à Tarifa Social?</h2>
<ol>
<li>Famílias inscritas no <strong>Cadastro Único (CadÚnico)</strong> com renda familiar mensal por pessoa menor ou igual a meio salário mínimo nacional;</li>
<li>Idosos com 65 anos ou mais e pessoas com deficiência que recebam o <strong>Benefício de Prestação Continuada (BPC/LOAS)</strong>;</li>
<li>Famílias inscritas no CadÚnico com renda mensal de até 3 salários mínimos que tenham entre seus moradores portador de doença ou deficiência cujo tratamento médico exija o uso continuado de aparelhos elétricos.</li>
</ol>
<p><em>Fonte oficial de referência: <a href="https://www.gov.br/aneel/pt-br/assuntos/tarifas/tarifa-social" target="_blank" rel="noopener nofollow">Agência Nacional de Energia Elétrica — ANEEL (Gov.br)</a>.</em></p>'
    ),
    array(
        'title' => 'Restituição e Isenção do Imposto de Renda Pessoa Física: Como Consultar Lotes na Receita Federal',
        'slug'  => 'restituicao-isencao-imposto-de-renda-consultar-lotes',
        'cat'   => $cat_financas,
        'excerpt' => 'Confira a ordem oficial de prioridades no pagamento dos lotes da Restituição do IRPF, o bônus para quem usa a Declaração Pré-Preenchida ou chave Pix CPF e como consultar.',
        'content' => '<div class="gov-callout"><span class="gov-callout-title">📌 Consulta Rápida de Lotes:</span> A consulta ao pagamento da restituição do Imposto de Renda da Pessoa Física (IRPF) é liberada pela Receita Federal sempre uma semana antes da data do depósito bancário no portal <strong>Meu Imposto de Renda (e-CAC)</strong>.</div>
<h2>Qual é a ordem legal de prioridade na restituição do IRPF?</h2>
<p>A Receita Federal efetua os pagamentos em 5 lotes mensais regulares (de maio a setembro), respeitando a seguinte fila de prioridades definida em lei:</p>
<ol>
<li>Contribuintes idosos com idade igual ou superior a <strong>80 anos</strong>;</li>
<li>Contribuintes idosos com idade igual ou superior a <strong>60 anos</strong>, pessoas com deficiência e portadores de moléstia grave;</li>
<li>Contribuintes cuja maior fonte de renda seja o <strong>magistério (professores)</strong>;</li>
<li>Contribuintes que utilizaram a <strong>Declaração Pré-Preenchida</strong> e/ou optaram por receber a restituição via <strong>Pix (chave CPF)</strong>;</li>
<li>Demais contribuintes, por ordem de data e hora de entrega da declaração sem pendências.</li>
</ol>
<h2>O que fazer se o valor da restituição não cair na conta?</h2>
<p>Caso a conta bancária informada na declaração esteja desativada ou haja erro nos dados bancários, o valor fica disponível para resgate por até 1 ano no <strong>Banco do Brasil</strong>. O contribuinte pode reagendar o crédito para qualquer banco em seu nome diretamente pelo Portal e-CAC ou pela Central BB.</p>
<p><em>Fonte oficial de referência: <a href="https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda" target="_blank" rel="noopener nofollow">Receita Federal — Meu Imposto de Renda (Gov.br)</a>.</em></p>'
    ),

    // CATEGORIA 4: CALCULADORAS & SIMULADORES
    array(
        'title' => 'Calculadora de Rescisão Trabalhista CLT + Multa de 40% do FGTS (Simulador Atualizado)',
        'slug'  => 'calculadora-rescisao-trabalhista-clt-multa-fgts',
        'cat'   => $cat_calc,
        'excerpt' => 'Simule agora gratuitamente o valor do seu acerto trabalhista CLT: saldo de salário, férias proporcionais + 1/3, 13º proporcional e multa de 40% ou 20% do FGTS.',
        'content' => '<p>Use nossa <strong>Calculadora de Rescisão Trabalhista CLT</strong> abaixo para descobrir na hora quanto você tem direito a receber no seu acerto em caso de demissão sem justa causa, pedido de demissão ou demissão por acordo comum (Art. 484-A da CLT).</p>
[calculadora_rescisao]
<h2>Quais verbas rescisórias são pagas na demissão sem justa causa?</h2>
<p>Quando o empregador encerra o contrato de trabalho por iniciativa própria e sem justa causa, o trabalhador tem direito a receber até o <strong>10º dia corrido</strong> após o término do contrato (Art. 477, § 6º da CLT):</p>
<ul>
<li><strong>Saldo de salário:</strong> referente aos dias efetivamente trabalhados no mês da saída;</li>
<li><strong>Aviso prévio (trabalhado ou indenizado):</strong> mínimo de 30 dias, acrescido de 3 dias por ano completo trabalhado na mesma empresa (até o limite de 90 dias);</li>
<li><strong>13º salário proporcional:</strong> calculado na razão de 1/12 por mês trabalhado no ano (fração igual ou superior a 15 dias conta como mês integral);</li>
<li><strong>Férias vencidas e proporcionais + 1/3 constitucional:</strong> isentas de desconto de INSS quando indenizadas na rescisão;</li>
<li><strong>Saque do FGTS + Multa de 40%:</strong> além da guia para requerer o Seguro-Desemprego (se cumprir os requisitos de tempo de serviço).</li>
</ul>
<p><em>Base legal: Decreto-Lei nº 5.452/1943 (Consolidação das Leis do Trabalho — CLT) e Lei nº 13.467/2017.</em></p>'
    ),
    array(
        'title' => 'Calculadora de Férias Remuneradas CLT + 1/3 Constitucional e Abono Pecuniário (Vender 10 Dias)',
        'slug'  => 'calculadora-de-ferias-clt-terco-constitucional-abono',
        'cat'   => $cat_calc,
        'excerpt' => 'Calcule rapidamente quanto vai cair na sua conta antes de sair de férias, incluindo o adicional de 1/3 constitucional, desconto do INSS e venda de 10 dias.',
        'content' => '<p>Vai sair de férias? Utilize nosso simulador gratuito abaixo para calcular o valor líquido que deve ser depositado pelo empregador em até <strong>2 dias antes do início do descanso</strong>, conforme determina o Art. 145 da CLT:</p>
[calculadora_ferias]
<h2>Como funciona a venda de 10 dias de férias (Abono Pecuniário)?</h2>
<p>Pelo Art. 143 da CLT, é um direito do trabalhador converter <strong>1/3 do período de férias (10 dias)</strong> em dinheiro (chamado de <em>Abono Pecuniário</em>), desde que faça a solicitação até 15 dias antes do término do período aquisitivo (quando completa 12 meses de trabalho).</p>
<p>Uma grande vantagem financeira do Abono Pecuniário é que sobre esses 10 dias vendidos <strong>não há incidência de desconto de INSS nem de Imposto de Renda</strong>, pois trata-se de verba de natureza indenizatória.</p>
<p><em>Base legal: Artigos 129 a 145 da Consolidação das Leis do Trabalho (CLT) e Art. 7º, inciso XVII da Constituição Federal.</em></p>'
    ),
    array(
        'title' => 'Simulador de 13º Salário CLT: Calcule o Valor da 1ª e da 2ª Parcela com Descontos',
        'slug'  => 'simulador-decimo-terceiro-salario-1-e-2-parcela',
        'cat'   => $cat_calc,
        'excerpt' => 'Descubra exatamente quanto você vai receber na primeira parcela (sem descontos) e na segunda parcela (com desconto de INSS) do Décimo Terceiro Salário.',
        'content' => '<p>Informe abaixo seu salário bruto e a quantidade de meses trabalhados no ano para simular o valor exato da <strong>1ª parcela</strong> e da <strong>2ª parcela</strong> do seu 13º Salário (Gratificação de Natal):</p>
[calculadora_decimo_terceiro]
<h2>Quais são os prazos oficiais de pagamento do 13º Salário?</h2>
<p>De acordo com a Lei nº 4.749/1965, o pagamento da Gratificação de Natal é dividido em duas etapas obrigatórias:</p>
<ul>
<li><strong>1ª Parcela (Adiantamento):</strong> Deve ser paga entre 1º de fevereiro e <strong>30 de novembro</strong> (ou no último dia útil anterior, caso caia em fim de semana). Corresponde a exatamente <strong>50% do valor bruto proporcional</strong>, sem nenhum desconto de INSS ou IRRF;</li>
<li><strong>2ª Parcela:</strong> Deve ser paga impreterivelmente até o dia <strong>20 de dezembro</strong>. Nesta parcela são deduzidos o valor já adiantado na 1ª parcela, a contribuição previdenciária (INSS) sobre o valor total do 13º e, quando aplicável, o Imposto de Renda Retido na Fonte (IRRF).</li>
</ul>
<p><em>Base legal: Lei Federal nº 4.090/1962 e Lei Federal nº 4.749/1965.</em></p>'
    ),
);

foreach ($articles as $art) {
    $existing = get_page_by_path($art['slug'], OBJECT, 'post');
    if (!$existing) {
        wp_insert_post(array(
            'post_title'    => $art['title'],
            'post_name'     => $art['slug'],
            'post_excerpt'  => $art['excerpt'],
            'post_content'  => $art['content'],
            'post_status'   => 'publish',
            'post_type'     => 'post',
            'post_category' => array($art['cat']),
        ));
    }
}

flush_rewrite_rules();
echo "SEED_SUCCESS\n";
"""

def main():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print(f"Conectando na VPS {VPS_HOST}...")
    ssh.connect(VPS_HOST, port=22, username=VPS_USER, password=VPS_PASS, timeout=20)

    # 1. Apagar todos os resquícios antigos de nucleovip na VPS
    cleanup_cmd = """
    systemctl stop nucleovip-store.service 2>/dev/null || true
    systemctl disable nucleovip-store.service 2>/dev/null || true
    rm -f /etc/systemd/system/nucleovip-store.service
    systemctl daemon-reload

    rm -f /etc/nginx/sites-enabled/guiadasaciedade.conf
    rm -f /etc/nginx/sites-enabled/mr.nucleovip.conf
    rm -f /etc/nginx/sites-enabled/loja.nucleovip.conf
    rm -f /etc/nginx/sites-available/guiadasaciedade.conf
    rm -f /etc/nginx/sites-available/mr.nucleovip.conf
    rm -f /etc/nginx/sites-available/loja.nucleovip.conf

    rm -rf /var/www/nucleo_vip_app
    rm -rf /var/www/guiadasaciedade
    rm -rf /var/www/mr_nucleovip
    rm -rf /var/www/metabolismo_app
    rm -rf /var/www/loja.nucleovip
    rm -rf /var/www/nucleovip_store
    """
    print("Limpando todos os resquícios antigos do domínio na VPS...")
    _, out, err = ssh.exec_command(cleanup_cmd)
    out.read()

    # 2. Enviar nosso tema WordPress e configurar Nginx + WP
    sftp = ssh.open_sftp()
    print("Enviando tema guia-cidadao-adsense.zip...")
    sftp.put(LOCAL_ZIP, '/tmp/guia-cidadao-adsense.zip')

    with sftp.file('/etc/nginx/sites-available/nucleo_vip', 'w') as f:
        f.write(NGINX_CONF)

    with sftp.file('/tmp/seed_portal.php', 'w') as f:
        f.write(SEED_PHP)
    sftp.close()

    # 3. Resetar banco do WordPress, instalar limpo, ativar tema e popular artigos reais
    wp_setup_cmd = """
    cd /var/www/nucleovip_wp

    # Resetar banco de dados para não sobrar nenhum resquício anterior
    wp db reset --yes --allow-root

    # Instalar WordPress limpo em Português na raiz https://nucleovip.com.br
    wp core install \
        --url="https://nucleovip.com.br" \
        --title="Núcleo VIP — Guia do Cidadão" \
        --admin_user="admin_nucleovip" \
        --admin_password="NucleoVip@2026!AdSense" \
        --admin_email="contato@nucleovip.com.br" \
        --skip-email \
        --allow-root

    # Instalar e ativar nosso tema otimizado para AdSense
    rm -rf /var/www/nucleovip_wp/wp-content/themes/guia-cidadao-adsense
    unzip -o /tmp/guia-cidadao-adsense.zip -d /var/www/nucleovip_wp/wp-content/themes/
    wp theme activate guia-cidadao-adsense --allow-root

    # Popular categorias, páginas obrigatórias AdSense e 12 artigos reais de Utilidade Pública
    php /tmp/seed_portal.php
    rm -f /tmp/seed_portal.php /tmp/guia-cidadao-adsense.zip

    chown -R www-data:www-data /var/www/nucleovip_wp
    ln -sf /etc/nginx/sites-available/nucleo_vip /etc/nginx/sites-enabled/nucleo_vip
    nginx -t && systemctl reload nginx
    """
    print("Instalando WordPress limpo, ativando tema e criando conteúdo oficial...")
    _, out, err = ssh.exec_command(wp_setup_cmd)
    print(out.read().decode('utf-8', errors='ignore'))
    print(err.read().decode('utf-8', errors='ignore'))
    ssh.close()
    print("DEPLOY COMPLETO EM HTTPS://NUCLEOVIP.COM.BR!")

if __name__ == '__main__':
    main()
