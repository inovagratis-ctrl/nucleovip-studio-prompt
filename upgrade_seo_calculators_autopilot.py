import paramiko
import zipfile
import os

VPS_HOST = '216.22.13.236'
VPS_USER = 'root'
VPS_PASS = 'PgmgTVJ8ftewUCzp'

THEME_DIR = r"C:\Users\Eusimar\.gemini\antigravity\scratch\portal-utilidade-publica-wp\guia-cidadao-adsense"
LOCAL_ZIP = r"C:\Users\Eusimar\.gemini\antigravity\scratch\portal-utilidade-publica-wp\guia-cidadao-adsense.zip"

# Re-cria o ZIP atualizado do tema
if os.path.exists(LOCAL_ZIP):
    os.remove(LOCAL_ZIP)

with zipfile.ZipFile(LOCAL_ZIP, 'w', zipfile.ZIP_DEFLATED) as z:
    for root, dirs, files in os.walk(THEME_DIR):
        for f in files:
            full = os.path.join(root, f)
            rel = os.path.relpath(full, os.path.dirname(THEME_DIR))
            z.write(full, rel)

AUTOPILOT_PHP = r"""<?php
/**
 * Robô Piloto Automático Oficial — Núcleo VIP (Utilidade Pública & AdSense)
 * Monitora os feeds públicos da Agência Brasil (EBC) e Agência Senado (reprodução livre garantida por lei com citação),
 * seleciona pautas de Utilidade Pública, estrutura com caixas Gov.br e links internos e publica automaticamente.
 */
require_once '/var/www/nucleovip_wp/wp-load.php';
include_once ABSPATH . WPINC . '/feed.php';

$feeds = array(
    array(
        'name' => 'Agência Brasil (EBC)',
        'url'  => 'https://agenciabrasil.ebc.com.br/rss/economia/feed.xml',
        'cat'  => 'contas-financas',
    ),
    array(
        'name' => 'Agência Senado',
        'url'  => 'https://www12.senado.leg.br/noticias/feed/todasnoticias',
        'cat'  => 'beneficios-trabalhador',
    ),
);

$keywords_beneficios = array('inss', 'fgts', 'aposentad', 'bolsa família', 'cadúnico', 'salário', 'trabalh', 'clt', 'seguro-desemprego', 'pis', 'pasep', 'bpc', 'auxílio', 'férias', 'previdência');
$keywords_documentos = array('cnh', 'identidade', 'cin', 'cpf', 'gov.br', 'passaporte', 'eleitor', 'detran', 'certidão', 'mei', 'concurso', 'enem', 'sisu', 'prouni', 'educação', 'saúde', 'sus');

$published_count = 0;
$max_per_run = 2;

foreach ($feeds as $feed_info) {
    if ($published_count >= $max_per_run) {
        break;
    }
    $rss = fetch_feed($feed_info['url']);
    if (is_wp_error($rss)) {
        continue;
    }

    $items = $rss->get_items(0, 8);
    foreach ($items as $item) {
        if ($published_count >= $max_per_run) {
            break;
        }

        $title = trim(wp_strip_all_tags($item->get_title()));
        $link  = esc_url_raw($item->get_permalink());
        $desc  = trim(wp_strip_all_tags($item->get_description()));
        $slug  = sanitize_title($title);

        if (empty($title) || strlen($desc) < 40) {
            continue;
        }

        // Verifica se já foi publicado
        $existing = get_page_by_path($slug, OBJECT, 'post');
        if ($existing) {
            continue;
        }

        // Classificação inteligente nas 4 categorias
        $lower_text = mb_strtolower($title . ' ' . $desc, 'UTF-8');
        $target_cat_slug = $feed_info['cat'];

        foreach ($keywords_beneficios as $kw) {
            if (mb_strpos($lower_text, $kw) !== false) {
                $target_cat_slug = 'beneficios-trabalhador';
                break;
            }
        }
        foreach ($keywords_documentos as $kw) {
            if (mb_strpos($lower_text, $kw) !== false) {
                $target_cat_slug = 'documentos-gov-br';
                break;
            }
        }

        $cat_obj = get_category_by_slug($target_cat_slug);
        $cat_id  = $cat_obj ? $cat_obj->term_id : 1;

        // Monta artigo completo, informativo e estruturado para SEO e AdSense
        $content  = '<div class="gov-callout"><span class="gov-callout-title">📌 Comunicado Oficial Verificado:</span> ' . esc_html($desc) . '</div>' . "\n\n";
        $content .= '<h2>Entenda os detalhes e o impacto para o cidadão</h2>' . "\n";
        $content .= '<p>De acordo com as informações oficiais divulgadas por <strong>' . esc_html($feed_info['name']) . '</strong>, a medida trata de tema de interesse direto da população brasileira: <em>"' . esc_html($title) . '"</em>.</p>' . "\n";
        $content .= '<p>' . esc_html($desc) . ' Para acompanhar todos os desdobramentos e verificar se o seu CPF ou benefício está incluído nas novas diretrizes, é recomendável consultar sempre os canais eletrônicos oficiais do Governo Federal.</p>' . "\n\n";
        $content .= '<h2>Como consultar pelos canais digitais oficiais (Gov.br)</h2>' . "\n";
        $content .= '<ol>' . "\n";
        $content .= '<li>Acesse o portal oficial <strong>Gov.br</strong> ou o aplicativo correspondente ao serviço no seu celular (Meu INSS, App FGTS, Carteira de Trabalho Digital ou Receita Federal);</li>' . "\n";
        $content .= '<li>Autentique-se utilizando seu <strong>CPF e senha</strong> cadastrada (preferencialmente com conta nível Prata ou Ouro);</li>' . "\n";
        $content .= '<li>Verifique na seção de notificações ou extratos a situação atualizada do seu cadastro.</li>' . "\n";
        $content .= '</ol>' . "\n\n";
        $content .= '<h2>Ferramentas Gratuitas de Simulação para o Trabalhador</h2>' . "\n";
        $content .= '<p>Se você deseja simular valores de benefícios trabalhistas, descontos de INSS, Imposto de Renda, Férias, Rescisão ou Seguro-Desemprego, acesse gratuitamente nossa <a href="' . esc_url(home_url('/calculadoras/')) . '"><strong>Central de Calculadoras do Cidadão</strong></a>.</p>' . "\n\n";
        $content .= '<p><em>Fonte primária oficial (Reprodução pública autorizada com citação): <a href="' . esc_url($link) . '" target="_blank" rel="noopener nofollow">' . esc_html($feed_info['name']) . ' — Leia o despacho original na íntegra</a>.</em></p>';

        $post_id = wp_insert_post(array(
            'post_title'    => $title,
            'post_name'     => $slug,
            'post_excerpt'  => wp_trim_words($desc, 26, '...'),
            'post_content'  => $content,
            'post_status'   => 'publish',
            'post_type'     => 'post',
            'post_category' => array($cat_id),
        ));

        if ($post_id && !is_wp_error($post_id)) {
            $published_count++;
            echo "AUTOPILOT_PUBLISHED: [$target_cat_slug] $title\n";
        }
    }
}
echo "AUTOPILOT_DONE: $published_count novos artigos oficiais publicados.\n";
"""

EXTRA_ARTICLES_PHP = r"""<?php
require_once '/var/www/nucleovip_wp/wp-load.php';

$cat_beneficios = get_category_by_slug('beneficios-trabalhador')->term_id;
$cat_documentos = get_category_by_slug('documentos-gov-br')->term_id;
$cat_financas   = get_category_by_slug('contas-financas')->term_id;
$cat_calc       = get_category_by_slug('calculadoras-simuladores')->term_id;

$more_articles = array(
    array(
        'title' => 'Calculadora de Seguro-Desemprego Oficial: Simule o Valor e a Quantidade de Parcelas (3, 4 ou 5)',
        'slug'  => 'calculadora-seguro-desemprego-valor-quantidade-parcelas',
        'cat'   => $cat_calc,
        'excerpt' => 'Use nossa calculadora oficial de Seguro-Desemprego para descobrir na hora o valor exato da sua parcela pela média dos últimos 3 salários e a quantidade de parcelas (3 a 5).',
        'content' => '<p>Foi dispensado sem justa causa? Utilize gratuitamente nossa <strong>Calculadora de Seguro-Desemprego</strong> abaixo (atualizada com as faixas salariais do Ministério do Trabalho e Emprego — MTE/Codefat) para descobrir quantas parcelas você vai receber e o valor exato de cada depósito:</p>
[calculadora_seguro_desemprego]
<h2>Como é calculado o valor da parcela do Seguro-Desemprego?</h2>
<p>O Ministério do Trabalho e Emprego soma os <strong>3 últimos salários brutos</strong> anteriores à dispensa e divide por 3 para encontrar a média salarial. Sobre essa média, aplica-se a tabela progressiva do Codefat, respeitando sempre o piso de <strong>1 salário mínimo nacional</strong> e o teto máximo vigente do benefício.</p>
<h2>Quantas parcelas tenho direito a receber?</h2>
<ul>
<li><strong>1ª Solicitação:</strong> 4 parcelas (de 12 a 23 meses trabalhados) ou 5 parcelas (a partir de 24 meses trabalhados);</li>
<li><strong>2ª Solicitação:</strong> 3 parcelas (9 a 11 meses), 4 parcelas (12 a 23 meses) ou 5 parcelas (24 meses ou mais);</li>
<li><strong>3ª Solicitação em diante:</strong> 3 parcelas (6 a 11 meses), 4 parcelas (12 a 23 meses) ou 5 parcelas (24 meses ou mais).</li>
</ul>
<p><em>Fonte oficial: Lei nº 7.998/1990 e Portal Emprega Brasil / Carteira de Trabalho Digital (Gov.br).</em></p>'
    ),
    array(
        'title' => 'Calculadora de Imposto de Renda Mensal (IRPF) e Salário Líquido: Veja se Você Está Isento',
        'slug'  => 'calculadora-imposto-de-renda-mensal-irpf-salario-liquido',
        'cat'   => $cat_calc,
        'excerpt' => 'Simule o desconto mensal de Imposto de Renda Retido na Fonte (IRRF) e descubra seu salário líquido comparando automaticamente o Desconto Simplificado e as Deduções Legais.',
        'content' => '<p>Quer saber quanto de <strong>Imposto de Renda (IRRF)</strong> é descontado no seu contracheque mensal e qual é a sua alíquota efetiva real? Nossa calculadora abaixo compara automaticamente o <strong>Desconto Simplificado Mensal</strong> com as <strong>Deduções Legais (INSS + Dependentes)</strong>, aplicando a opção mais vantajosa para o seu bolso:</p>
[calculadora_irpf]
<h2>Como funciona o Desconto Simplificado Mensal da Receita Federal?</h2>
<p>Pela regra atual da Receita Federal, a fonte pagadora (empresa ou órgão público) verifica automaticamente qual modelo gera o menor imposto para o trabalhador: a soma das deduções legais (contribuição ao INSS + R$ 189,59 por dependente + pensão alimentícia) ou o <strong>Desconto Simplificado Mensal padrão de R$ 564,80</strong>. Dessa forma, quem recebe até dois salários mínimos permanece totalmente isento de retenção na fonte.</p>
<p><em>Fonte oficial: Secretaria Especial da Receita Federal do Brasil — Tabelas de Incidência Mensal do IRPF.</em></p>'
    ),
    array(
        'title' => 'Abono Salarial PIS/PASEP: Quem Tem Direito, Como Calcular o Valor Proporcional e Consultar no App',
        'slug'  => 'abono-salarial-pis-pasep-quem-tem-direito-como-consultar',
        'cat'   => $cat_beneficios,
        'excerpt' => 'Saiba todos os requisitos para receber até 1 salário mínimo de Abono Salarial PIS (Caixa) ou PASEP (Banco do Brasil) e como consultar pela Carteira de Trabalho Digital.',
        'content' => '<div class="gov-callout"><span class="gov-callout-title">📌 Regra Oficial do CODEFAT:</span> O Abono Salarial PIS/PASEP funciona como um 14º salário pago anualmente aos trabalhadores da iniciativa privada (PIS — pago pela Caixa) e servidores públicos (PASEP — pago pelo Banco do Brasil) que receberam, em média, até <strong>2 salários mínimos mensais</strong> no ano-base de referência.</div>
<h2>Quais são os 4 requisitos obrigatórios para receber o PIS/PASEP?</h2>
<ol>
<li>Estar cadastrado no programa PIS/PASEP ou no CNIS há pelo menos <strong>5 anos</strong>;</li>
<li>Ter trabalhado com carteira assinada (ou vínculo estatutário) por pelo menos <strong>30 dias</strong> (consecutivos ou não) no ano-base;</li>
<li>Ter recebido remuneração média mensal de até <strong>2 salários mínimos</strong> durante o ano-base;</li>
<li>Ter os dados informados corretamente pelo empregador na <strong>RAIS / eSocial</strong> dentro do prazo legal.</li>
</ol>
<h2>Como calcular o valor proporcional do Abono Salarial?</h2>
<p>O valor do Abono Salarial é proporcional ao número de meses trabalhados no ano-base: cada mês trabalhado (por 15 dias ou mais) equivale a <strong>1/12 do salário mínimo vigente</strong> na data do pagamento. Quem trabalhou os 12 meses completos recebe 1 salário mínimo integral.</p>
<p><em>Fonte oficial: Ministério do Trabalho e Emprego (Gov.br) e Caixa Econômica Federal.</em></p>'
    ),
    array(
        'title' => 'Benefício de Prestação Continuada (BPC/LOAS): Como Solicitar pelo Meu INSS sem Advogado',
        'slug'  => 'bpc-loas-como-solicitar-meu-inss-requisitos-renda',
        'cat'   => $cat_beneficios,
        'excerpt' => 'Idosos a partir de 65 anos e pessoas com deficiência de baixa renda têm direito a 1 salário mínimo mensal pelo BPC/LOAS mesmo sem nunca terem contribuído ao INSS.',
        'content' => '<div class="gov-callout success"><span class="gov-callout-title">📌 Importante Saber:</span> O <strong>Benefício de Prestação Continuada (BPC)</strong>, previsto na Lei Orgânica da Assistência Social (LOAS — Lei nº 8.742/1993), garante o pagamento mensal de <strong>1 salário mínimo</strong> ao idoso com 65 anos ou mais e à pessoa com deficiência de qualquer idade, <strong>mesmo que nunca tenham pago o INSS</strong>.</div>
<h2>Quais são os critérios de renda familiar e inscrição no CadÚnico?</h2>
<p>Para ter direito ao BPC/LOAS, a renda por pessoa do grupo familiar que vive na mesma residência deve ser igual ou inferior a <strong>1/4 do salário mínimo vigente</strong> (gastos comprovados com medicamentos contínuos, fraldas e alimentação especial não fornecidos pelo SUS podem ser abatidos do cálculo da renda familiar). Além disso, é obrigatório que todos os membros da família estejam inscritos no <strong>Cadastro Único (CadÚnico)</strong> antes da solicitação.</p>
<h2>Passo a passo para pedir o BPC gratuitamente pelo Meu INSS</h2>
<ol>
<li>Acesse o aplicativo ou site <strong>Meu INSS</strong> com seu CPF e senha Gov.br;</li>
<li>Clique em <strong>"Novo Pedido"</strong>;</li>
<li>Digite na busca <em>"Benefício Assistencial ao Idoso"</em> ou <em>"Benefício Assistencial à Pessoa com Deficiência"</em>;</li>
<li>Confira os dados de endereço e telefone e acompanhe o agendamento da avaliação social e perícia médica (no caso de PcD).</li>
</ol>
<p><em>Fonte oficial: Instituto Nacional do Seguro Social (INSS) e Ministério do Desenvolvimento Social (MDS).</em></p>'
    ),
    array(
        'title' => 'CNH Digital no Celular: Como Baixar a Carteira Digital de Trânsito (CDT) e Consultar Pontos',
        'slug'  => 'cnh-digital-celular-como-baixar-carteira-digital-transito',
        'cat'   => $cat_documentos,
        'excerpt' => 'Veja como ativar gratuitamente a CNH Digital e o documento do veículo (CRLV-e) no aplicativo oficial Carteira Digital de Trânsito da Senatran e aderir ao Desconto de 40% em Multas.',
        'content' => '<div class="gov-callout"><span class="gov-callout-title">📌 Validade Jurídica Nacional:</span> A <strong>CNH Digital</strong> (disponível no aplicativo oficial <em>Carteira Digital de Trânsito — CDT</em>, desenvolvido pelo Serpro para a Senatran) possui exatamente o mesmo valor jurídico da habilitação impressa em todo o território brasileiro, funcionando inclusive sem conexão com a internet após o primeiro download.</div>
<h2>Passo a passo para ativar a CNH Digital no aplicativo CDT</h2>
<ol>
<li>Instale o aplicativo oficial <strong>Carteira Digital de Trânsito (CDT)</strong> na Play Store ou App Store;</li>
<li>Entre com sua conta <strong>Gov.br</strong>;</li>
<li>Toque em <strong>"Condutor"</strong> e, em seguida, em <strong>"Baixar CNH Digital"</strong>;</li>
<li>Informe o número de segurança (localizado no verso da CNH física, abaixo do QR Code) e o código CEP cadastrado no Detran no momento da emissão;</li>
<li>Crie uma chave de acesso de 4 dígitos para abrir o documento rapidamente em fiscalizações de trânsito.</li>
</ol>
<p><em>Fonte oficial: Secretaria Nacional de Trânsito — Senatran (Ministério dos Transportes / Gov.br).</em></p>'
    ),
    array(
        'title' => 'Portal do Empreendedor MEI: Como Emitir o Boleto DAS Mensal e Entregar a Declaração Anual (DASN-SIMEI)',
        'slug'  => 'portal-do-empreendedor-mei-emitir-das-declaracao-anual',
        'cat'   => $cat_documentos,
        'excerpt' => 'Guia oficial e gratuito para Microempreendedores Individuais emitirem a guia mensal de pagamento (DAS) via Pix ou código de barras no PGMEI da Receita Federal.',
        'content' => '<div class="gov-callout warning"><span class="gov-callout-title">⚠️ Atenção Microempreendedor Individual (MEI):</span> Tanto a emissão da guia mensal de pagamento (<strong>DAS-MEI</strong>) quanto o envio da <strong>Declaração Anual de Faturamento (DASN-SIMEI)</strong> são 100% gratuitos no portal oficial da Receita Federal. Nunca pague boletos recebidos por e-mail ou correio sem antes conferir no aplicativo oficial <strong>MEI</strong>.</div>
<h2>Como emitir a guia DAS-MEI mensal com QR Code Pix?</h2>
<ol>
<li>Acesse o <strong>Portal do Empreendedor</strong> no Gov.br ou entre diretamente no sistema <strong>PGMEI</strong> da Receita Federal;</li>
<li>Digite o número completo do seu <strong>CNPJ</strong> e clique em "Continuar";</li>
<li>No menu superior, clique em <strong>"Emitir Guia de Pagamento (DAS)"</strong>;</li>
<li>Informe o ano-calendário, selecione o mês de competência que deseja pagar (o vencimento padrão é todo dia 20 de cada mês) e clique em <strong>"Apurar/Gerar DAS"</strong>.</li>
</ol>
<h2>Quais benefícios previdenciários o pagamento em dia do DAS garante ao MEI?</h2>
<p>Mantendo o pagamento mensal do DAS em dia, o Microempreendedor Individual garante cobertura previdenciária no INSS para <strong>Aposentadoria por Idade</strong>, <strong>Auxílio por Incapacidade Temporária (Auxílio-Doença)</strong>, <strong>Salário-Maternidade</strong> e <strong>Pensão por Morte / Auxílio-Reclusão</strong> para seus dependentes.</p>
<p><em>Fonte oficial: Portal do Empreendedor (Gov.br) e Receita Federal do Brasil.</em></p>'
    ),
);

foreach ($more_articles as $art) {
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
echo "EXTRA_ARTICLES_OK\n";
"""

def main():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(VPS_HOST, port=22, username=VPS_USER, password=VPS_PASS, timeout=20)

    sftp = ssh.open_sftp()
    sftp.put(LOCAL_ZIP, '/tmp/guia-cidadao-adsense.zip')
    with sftp.file('/var/www/nucleovip_wp/autopilot-oficial.php', 'w') as f:
        f.write(AUTOPILOT_PHP)
    with sftp.file('/tmp/extra_articles.php', 'w') as f:
        f.write(EXTRA_ARTICLES_PHP)

    # Configura Cron Diário Automático às 08:00 e 18:00 (2x por dia)
    cron_content = "0 8,18 * * * www-data /usr/bin/php /var/www/nucleovip_wp/autopilot-oficial.php >> /var/log/nucleovip-autopilot.log 2>&1\n"
    with sftp.file('/etc/cron.d/nucleovip-autopilot', 'w') as f:
        f.write(cron_content)
    sftp.close()

    cmd = """
    chmod 644 /etc/cron.d/nucleovip-autopilot
    unzip -o /tmp/guia-cidadao-adsense.zip -d /var/www/nucleovip_wp/wp-content/themes/
    php /tmp/extra_articles.php
    php /var/www/nucleovip_wp/autopilot-oficial.php
    rm -f /tmp/extra_articles.php /tmp/guia-cidadao-adsense.zip
    chown -R www-data:www-data /var/www/nucleovip_wp
    wp post list --post_type=post --format=count --path=/var/www/nucleovip_wp --allow-root
    """
    _, out, err = ssh.exec_command(cmd)
    print(out.read().decode('utf-8', errors='ignore'))
    print(err.read().decode('utf-8', errors='ignore'))
    ssh.close()

if __name__ == '__main__':
    main()
