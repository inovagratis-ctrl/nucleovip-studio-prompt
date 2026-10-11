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

PHP_UPDATE_SCRIPT = r"""<?php
require_once '/var/www/nucleovip_wp/wp-load.php';
require_once ABSPATH . 'wp-admin/includes/image.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';

// 1. Atualizar o artigo do Simulador de 13º Salário com a Lei nº 15.270/2025 (IRRF R$ 0,00 para R$ 3.000,00)
$post_13 = get_page_by_path( 'simulador-decimo-terceiro-salario-1-e-2-parcela', OBJECT, 'post' );
if ( $post_13 ) {
    $content_13 = '
<p>O <strong>13º salário (Gratificação de Natal)</strong>, instituído pela <strong>Lei nº 4.749/1965</strong> e regulamentado pelo Decreto nº 10.854/2021, garante ao trabalhador com carteira assinada (CLT), aposentados e pensionistas do INSS o recebimento de um salário extra proporcional aos meses trabalhados no ano.</p>

<p>Utilize abaixo nossa <strong>Calculadora de Estimativa do 13º Salário 2026</strong>, atualizada com a <strong>Tabela Progressiva Oficial do INSS 2026 (Portaria Interministerial MPS/MF nº 13, de 09/01/2026)</strong> e com a nova regra de isenção do <strong>Imposto de Renda Retido na Fonte (IRRF) até R$ 5.000,00 prevista na <a href="https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15270.htm" target="_blank" rel="noopener noreferrer">Lei nº 15.270/2025</a></strong>:</p>

[calculadora_decimo_terceiro]

<h2>Prazos Oficiais de Pagamento do 13º Salário em 2026</h2>
<ul>
    <li><strong>1ª Parcela (Adiantamento de 50%):</strong> Deve ser paga entre 1º de fevereiro e <strong>30 de novembro de 2026 (segunda-feira)</strong>. Nesta primeira metade não há nenhum desconto de INSS nem de IRRF.</li>
    <li><strong>2ª Parcela (Saldo com descontos legais):</strong> Deve ser paga legalmente até o dia 20 de dezembro. Como 20/12/2026 cai em um domingo, o pagamento deve ser antecipado para até <strong>18 de dezembro de 2026 (sexta-feira)</strong>.</li>
</ul>

<h2>Como Funciona o Cálculo em 2026 (Exemplo Prático Conferido)</h2>
<p>Em 2026, o cálculo da 2ª parcela considera duas atualizações oficiais fundamentais:</p>
<ol>
    <li><strong>Tabela Progressiva do INSS 2026 (Portaria MPS/MF nº 13/2026):</strong> Faixas progressivas de <strong>7,5%</strong> (até R$ 1.621,00), <strong>9%</strong> (de R$ 1.621,01 até R$ 2.902,84), <strong>12%</strong> (de R$ 2.902,85 até R$ 4.354,27) e <strong>14%</strong> (de R$ 4.354,28 até o teto de R$ 8.475,55).</li>
    <li><strong>Redução do IRRF no 13º Salário (<a href="https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15270.htm" target="_blank" rel="noopener noreferrer">Lei nº 15.270/2025</a>):</strong> A tributação exclusiva na fonte do 13º salário conta com redução de até R$ 312,89 no imposto apurado, garantindo <strong>isenção total (IRRF = R$ 0,00) para 13º salário bruto de até R$ 5.000,00</strong> e redução gradual para valores entre R$ 5.000,01 e R$ 7.350,00.</li>
</ol>

<h3>Exemplo para Salário Bruto de R$ 3.000,00 (12 meses trabalhados, sem dependentes):</h3>
<ul>
    <li><strong>Valor Bruto Proporcional (12/12):</strong> R$ 3.000,00</li>
    <li><strong>1ª Parcela (paga até 30/11/2026):</strong> <strong>R$ 1.500,00</strong> (50% sem descontos)</li>
    <li><strong>Desconto de INSS Progressivo 2026:</strong> R$ 121,58 (1ª faixa) + R$ 115,37 (2ª faixa) + R$ 11,66 (3ª faixa) = <strong>R$ 248,60</strong></li>
    <li><strong>Desconto de IRRF 2026 (Lei nº 15.270/2025):</strong> <strong>R$ 0,00 (Isento — redução integral até R$ 5.000,00)</strong></li>
    <li><strong>2ª Parcela Líquida (paga até 18/12/2026):</strong> R$ 1.500,00 − R$ 248,60 = <strong>R$ 1.251,40</strong></li>
    <li><strong>Total Líquido Estimado (1ª + 2ª parcelas):</strong> <strong>R$ 2.751,40</strong></li>
</ul>

<h2>Hipóteses do Cálculo e Observações Importantes</h2>
<p>Os resultados apresentados pelo simulador são uma <strong>estimativa</strong> baseada no salário bruto fixo informado. Caso o trabalhador receba horas extras habituais, comissões, adicional noturno, insalubridade ou periculosidade, a média dessas verbas variáveis integra a base de cálculo do 13º salário, podendo haver ajuste complementar até o dia 10 de janeiro do ano seguinte (Art. 2º do Decreto nº 57.155/1965). Pensão alimentícia judicial ou faltas não justificadas superiores a 15 dias no mesmo mês também podem alterar o valor líquido.</p>
';
    wp_update_post( array(
        'ID'           => $post_13->ID,
        'post_content' => trim( $content_13 ),
        'post_excerpt' => 'Simule a 1ª parcela (até 30/11/2026) e a 2ª parcela (até 18/12/2026) do 13º salário com a tabela INSS 2026 e isenção de IRRF até R$ 5.000 (Lei nº 15.270/2025).',
    ) );
    echo "Updated 13o salario post ID: " . $post_13->ID . "\n";
}

// 2. Atualizar o artigo da Calculadora de IRPF Mensal com a Lei nº 15.270/2025
$post_irpf = get_page_by_path( 'calculadora-imposto-de-renda-mensal-irpf-salario-liquido', OBJECT, 'post' );
if ( $post_irpf ) {
    $content_irpf = '
<p>Com a entrada em vigor da <strong><a href="https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15270.htm" target="_blank" rel="noopener noreferrer">Lei nº 15.270/2025</a></strong> e da <strong>Portaria Interministerial MPS/MF nº 13/2026</strong>, o cálculo do <strong>Imposto de Renda Retido na Fonte (IRRF)</strong> e do desconto previdenciário (INSS) passou a garantir isenção total de Imposto de Renda para rendimentos brutos mensais de até <strong>R$ 5.000,00</strong> e redução gradual para salários entre <strong>R$ 5.000,01 e R$ 7.350,00</strong>.</p>

<p>Utilize nossa <strong>Calculadora de IRRF e Salário Líquido 2026</strong> para estimar o desconto oficial de INSS, o redutor da Lei nº 15.270/2025 e a comparação entre o Desconto Simplificado e as Deduções Legais:</p>

[calculadora_irpf]

<h2>Como Funciona a Isenção até R$ 5.000,00 (Lei nº 15.270/2025)</h2>
<ul>
    <li><strong>Rendimentos Brutos até R$ 5.000,00:</strong> Concede-se redução de até R$ 312,89 sobre o imposto apurado na tabela progressiva, zerando integralmente o IRRF mensal e sobre o 13º salário.</li>
    <li><strong>Rendimentos Brutos de R$ 5.000,01 até R$ 7.350,00:</strong> Aplica-se o redutor linear decrescente calculado pela fórmula oficial <code>R$ 978,62 − (0,133145 × Rendimento Bruto)</code>.</li>
    <li><strong>Acima de R$ 7.350,00:</strong> Aplica-se a tabela progressiva tradicional (alíquotas de 7,5% a 27,5%), escolhendo-se automaticamente entre as deduções legais (INSS + R$ 189,59 por dependente) ou o desconto simplificado mensal de R$ 607,20.</li>
</ul>
';
    wp_update_post( array(
        'ID'           => $post_irpf->ID,
        'post_content' => trim( $content_irpf ),
        'post_excerpt' => 'Calcule a estimativa do seu salário líquido em 2026 com a tabela INSS (Portaria nº 13/2026) e a isenção de IRRF até R$ 5.000 da Lei nº 15.270/2025.',
    ) );
    echo "Updated IRPF post ID: " . $post_irpf->ID . "\n";
}

// 3. Reclassificar os artigos de Dólar e Apostas (Bets) para a categoria Contas & Finanças
$cat_financas = get_category_by_slug( 'contas-financas' );
$all_posts = get_posts( array( 'post_type' => 'post', 'posts_per_page' => -1, 'post_status' => 'publish' ) );

foreach ( $all_posts as $p ) {
    $lower_title = mb_strtolower( $p->post_title, 'UTF-8' );
    if ( $cat_financas && ( false !== mb_strpos( $lower_title, 'dólar' ) || false !== mb_strpos( $lower_title, 'bets' ) || false !== mb_strpos( $lower_title, 'apostas' ) ) ) {
        wp_set_post_categories( $p->ID, array( $cat_financas->term_id ) );
        echo "Moved post ID {$p->ID} ({$p->post_title}) to category Contas & Financas\n";
    }
}

// 4. Remover miniaturas antigas e regerar fotografias editoriais 1200x675 WebP com alt específico para todos os 20 artigos
foreach ( $all_posts as $p ) {
    $old_thumb_id = get_post_thumbnail_id( $p->ID );
    if ( $old_thumb_id ) {
        delete_post_thumbnail( $p->ID );
        wp_delete_attachment( $old_thumb_id, true );
    }
    guia_cidadao_generate_post_thumbnail( $p->ID );
    $new_thumb_id = get_post_thumbnail_id( $p->ID );
    $alt = get_post_meta( $new_thumb_id, '_wp_attachment_image_alt', true );
    $url = wp_get_attachment_url( $new_thumb_id );
    echo "Post {$p->ID}: {$p->post_title}\n   -> IMG: {$url}\n   -> ALT: {$alt}\n";
}

wp_cache_flush();
echo "ALL DONE!\n";
"""

def deploy():
    create_zip()
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(VPS_IP, username=VPS_USER, password=VPS_PASS, timeout=20)

    sftp = ssh.open_sftp()
    sftp.put(ZIP_PATH, "/tmp/guia-cidadao-adsense.zip")
    with sftp.file("/tmp/update_posts_and_photos.php", "w") as f:
        f.write(PHP_UPDATE_SCRIPT)
    sftp.close()

    cmds = [
        f"unzip -o /tmp/guia-cidadao-adsense.zip -d {WP_PATH}/wp-content/themes/",
        f"chown -R www-data:www-data {WP_PATH}/wp-content/themes/guia-cidadao-adsense",
        "php /tmp/update_posts_and_photos.php",
        f"chown -R www-data:www-data {WP_PATH}/wp-content/uploads",
        "rm -f /tmp/guia-cidadao-adsense.zip /tmp/update_posts_and_photos.php",
        "systemctl reload nginx"
    ]
    for cmd in cmds:
        print(f"Running: {cmd}")
        stdin, stdout, stderr = ssh.exec_command(cmd, timeout=180)
        out = stdout.read().decode("utf-8", errors="replace")
        err = stderr.read().decode("utf-8", errors="replace")
        if out:
            print(out)
        if err:
            print("ERR:", err)

    ssh.close()

if __name__ == "__main__":
    deploy()
