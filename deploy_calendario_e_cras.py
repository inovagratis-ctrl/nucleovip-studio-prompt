import os
import zipfile
import paramiko

VPS_IP = "216.22.13.236"
VPS_USER = "root"
VPS_PASS = "PgmgTVJ8ftewUCzp"
WP_PATH = "/var/www/nucleovip_wp"

LOCAL_DIR = r"C:\Users\Eusimar\.gemini\antigravity\scratch\portal-utilidade-publica-wp"
THEME_DIR = os.path.join(LOCAL_DIR, "guia-cidadao-adsense")
ZIP_PATH = os.path.join(LOCAL_DIR, "guia-cidadao-adsense.zip")

def create_zip():
    with zipfile.ZipFile(ZIP_PATH, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(THEME_DIR):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, LOCAL_DIR).replace("\\", "/")
                zf.write(full_path, rel_path)
    print(f"Created {ZIP_PATH}")

PHP_CREATE_SERVICES = r"""<?php
require_once '/var/www/nucleovip_wp/wp-load.php';
require_once ABSPATH . 'wp-admin/includes/image.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';

// 1. Criar ou atualizar a página central /calendario-de-beneficios/
$page_slug = 'calendario-de-beneficios';
$existing_page = get_page_by_path( $page_slug, OBJECT, 'page' );
$page_data = array(
    'post_title'   => 'Calendário de Pagamentos de Benefícios 2026 (INSS/BPC, Bolsa Família e PIS/PASEP)',
    'post_name'    => $page_slug,
    'post_status'  => 'publish',
    'post_type'    => 'page',
    'post_content' => 'Consulte as datas oficiais de pagamento de 2026 do Bolsa Família, INSS, BPC/LOAS e Abono Salarial PIS/PASEP filtrando pelo final do benefício, sem informar CPF ou senha.',
);

if ( $existing_page ) {
    $page_data['ID'] = $existing_page->ID;
    $page_id = wp_update_post( $page_data );
} else {
    $page_id = wp_insert_post( $page_data );
}
update_post_meta( $page_id, '_wp_page_template', 'page-calendario.php' );
echo "Page /calendario-de-beneficios/ ID: {$page_id} -> " . get_permalink( $page_id ) . "\n";

// 2. Criar ou atualizar o artigo "Guia Prático do CadÚnico e do CRAS 2026"
$post_slug = 'guia-pratico-cadunico-cras-documentos-onde-atualizar';
$existing_post = get_page_by_path( $post_slug, OBJECT, 'post' );
$cat_beneficios = get_category_by_slug( 'beneficios-trabalhador' );
$cat_id = $cat_beneficios ? $cat_beneficios->term_id : 1;

$post_content = '
<p>Manter o <strong>Cadastro Único para Programas Sociais do Governo Federal (CadÚnico)</strong> atualizado é a condição essencial para garantir o recebimento contínuo do <strong>Bolsa Família</strong>, do <strong>Benefício de Prestação Continuada (BPC/LOAS)</strong>, da <strong>Tarifa Social de Energia Elétrica</strong>, do <strong>Pé-de-Meia</strong> e da isenção em taxas de concursos públicos.</p>

<p>Neste guia prático e verificado, confira <strong>quando atualizar seu cadastro</strong>, a <strong>lista completa de documentos obrigatórios</strong> para levar ao <strong>CRAS (Centro de Referência de Assistência Social)</strong> e como consultar a situação da sua família pela internet com segurança.</p>

<h2>Quando é Obrigatório Atualizar o CadÚnico?</h2>
<ul>
    <li><strong>A cada 24 meses (2 anos):</strong> Mesmo que nada tenha mudado na família, a revisão cadastral bienal é obrigatória para evitar o bloqueio preventivo ou cancelamento dos benefícios.</li>
    <li><strong>Sempre que houver mudança na família:</strong> Mudança de endereço (rua, bairro ou município), nascimento ou saída de algum morador da residência, troca de escola das crianças/adolescentes ou alteração na renda mensal (novo emprego ou perda de renda).</li>
</ul>

<h2>Lista de Documentos Obrigatórios para Levar ao CRAS</h2>
<p>A entrevista presencial é feita com o <strong>Responsável Familiar (RF)</strong>, que deve ter pelo menos 16 anos (preferencialmente mulher) e apresentar os documentos de <strong>todas as pessoas que moram na mesma casa</strong>:</p>

<h3>1. Do Responsável Familiar (RF):</h3>
<ul>
    <li><strong>CPF</strong> (obrigatório) ou <strong>Título de Eleitor</strong>;</li>
    <li><strong>Documento oficial de identificação com foto</strong> (Carteira de Identidade/CIN, CNH ou Carteira de Trabalho);</li>
    <li><strong>Comprovante de residência atualizado</strong> (conta de luz, água ou declaração de residência assinada, caso não possua fatura no próprio nome).</li>
</ul>

<h3>2. De todos os demais moradores da residência:</h3>
<ul>
    <li><strong>CPF</strong> (recomendado para todas as idades e obrigatório para beneficiários do BPC/LOAS);</li>
    <li><strong>Certidão de Nascimento ou de Casamento</strong>;</li>
    <li><strong>RG (CIN), Carteira de Trabalho ou Título de Eleitor</strong>;</li>
    <li><strong>Declaração de matrícula e frequência escolar atualizada</strong> (para todas as crianças e jovens de 4 a 17 anos) e <strong>Cartão de Vacinação</strong> (para crianças de até 7 anos).</li>
</ul>

<h2>Como Consultar se o Seu CadÚnico Precisa de Atualização</h2>
<ol>
    <li>Acesse o aplicativo oficial <strong>Cadastro Único</strong> (disponível para Android e iOS) ou o portal web oficial do Ministério do Desenvolvimento e Assistência Social (MDS).</li>
    <li>Utilize a opção <strong>Consulta Simples</strong> ou entre com sua conta <strong>Gov.br</strong>.</li>
    <li>Verifique a cor do aviso de atualização cadastral: se estiver <strong>verde</strong>, seu cadastro está em dia; se estiver <strong>amarelo ou vermelho</strong>, procure o CRAS ou posto do CadÚnico da sua prefeitura.</li>
</ol>

[roteiro_onde_resolver]

[infografico_consulta_segura]

<h2>Canais Oficiais para Consulta e Localização do CRAS</h2>
<ul>
    <li><strong>Portal Oficial Meu CadÚnico (MDS):</strong> <a href="https://meucadunico.cidadania.gov.br/" target="_blank" rel="noopener noreferrer">https://meucadunico.cidadania.gov.br/</a></li>
    <li><strong>Mapa de Unidades do CRAS e Postos de Atendimento (MDS):</strong> <a href="https://aplicacoes.mds.gov.br/sagi/mops/" target="_blank" rel="noopener noreferrer">Consultar endereço do CRAS no portal MOPS/MDS</a></li>
    <li><strong>Disque Social do Ministério (Ligação Gratuita):</strong> Telefone <strong>121</strong> (atendimento de segunda a sexta-feira, das 7h às 19h).</li>
</ul>
';

$post_data = array(
    'post_title'    => 'Guia Prático do CadÚnico e do CRAS 2026: Como Atualizar o Cadastro, Quais Documentos Levar e Onde Ser Atendido',
    'post_name'     => $post_slug,
    'post_status'   => 'publish',
    'post_type'     => 'post',
    'post_content'  => trim( $post_content ),
    'post_excerpt'  => 'Veja quais documentos levar ao CRAS para atualizar o CadÚnico em 2026, quando a revisão é obrigatória e como consultar gratuitamente no portal oficial.',
    'post_category' => array( $cat_id ),
);

if ( $existing_post ) {
    $post_data['ID'] = $existing_post->ID;
    $post_id = wp_update_post( $post_data );
} else {
    $post_id = wp_insert_post( $post_data );
}
guia_cidadao_generate_post_thumbnail( $post_id );
echo "Post CadUnico/CRAS ID: {$post_id} -> " . get_permalink( $post_id ) . "\n";

wp_cache_flush();
echo "SERVICES DEPLOYED SUCCESSFULLY!\n";
"""

def deploy():
    create_zip()
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(VPS_IP, username=VPS_USER, password=VPS_PASS, timeout=20)

    sftp = ssh.open_sftp()
    sftp.put(ZIP_PATH, "/tmp/guia-cidadao-adsense.zip")
    with sftp.file("/tmp/create_services.php", "wb") as f:
        f.write(PHP_CREATE_SERVICES.encode("utf-8"))
    sftp.close()

    cmds = [
        f"unzip -o /tmp/guia-cidadao-adsense.zip -d {WP_PATH}/wp-content/themes/",
        "php /tmp/create_services.php",
        f"chown -R www-data:www-data {WP_PATH}/wp-content/themes/guia-cidadao-adsense {WP_PATH}/wp-content/uploads",
        "rm -f /tmp/guia-cidadao-adsense.zip /tmp/create_services.php",
        "systemctl reload nginx"
    ]
    for cmd in cmds:
        print(f"Running: {cmd}")
        stdin, stdout, stderr = ssh.exec_command(cmd, timeout=120)
        out = stdout.read().decode("utf-8", errors="replace")
        err = stderr.read().decode("utf-8", errors="replace")
        if out:
            print(ascii(out))
        if err:
            print("ERR:", ascii(err))

    ssh.close()

if __name__ == "__main__":
    deploy()
