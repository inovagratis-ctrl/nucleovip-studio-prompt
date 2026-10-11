import os
import zipfile
import paramiko
from PIL import Image, ImageChops

VPS_IP = "216.22.13.236"
VPS_USER = "root"
VPS_PASS = "PgmgTVJ8ftewUCzp"
WP_PATH = "/var/www/nucleovip_wp"

LOCAL_DIR = r"C:\Users\Eusimar\.gemini\antigravity\scratch\portal-utilidade-publica-wp"
THEME_DIR = os.path.join(LOCAL_DIR, "guia-cidadao-adsense")
ZIP_PATH = os.path.join(LOCAL_DIR, "guia-cidadao-adsense.zip")
COVERS_DIR = os.path.join(LOCAL_DIR, "cohesive_covers")
COVERS_ZIP = os.path.join(LOCAL_DIR, "cohesive_covers.zip")
KIT_DIR = r"C:\Users\Eusimar\Downloads\nucleo-vip-kit-pronto-para-web\pronto-para-web"

def trim_image_padding(src_path, dst_path, pad_ratio=0.05):
    im = Image.open(src_path).convert("RGBA")
    # Create a mask of non-white and non-transparent pixels
    bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
    comp = Image.alpha_composite(bg, im).convert("RGB")
    diff = ImageChops.difference(comp, Image.new("RGB", im.size, (255, 255, 255)))
    bbox = diff.getbbox()
    if bbox:
        w = bbox[2] - bbox[0]
        h = bbox[3] - bbox[1]
        px = int(w * pad_ratio)
        py = int(h * pad_ratio)
        left = max(0, bbox[0] - px)
        top = max(0, bbox[1] - py)
        right = min(im.width, bbox[2] + px)
        bottom = min(im.height, bbox[3] + py)
        im = im.crop((left, top, right, bottom))
    im.save(dst_path, "PNG")
    print(f"Trimmed {os.path.basename(src_path)} -> {im.size}")

def prepare_assets():
    # 1. Trim logo-horizontal.png so it doesn't have 34% empty space on the right
    trim_image_padding(
        os.path.join(KIT_DIR, "logo", "logo-horizontal.png"),
        os.path.join(COVERS_DIR, "logo-horizontal-large.png"),
        pad_ratio=0.04
    )
    # 2. Trim the 4 category icons so they fill the 64x64 container
    for icon_name in ["beneficios-trabalho.png", "documentos-govbr.png", "contas-financas.png", "calculadoras.png"]:
        trim_image_padding(
            os.path.join(KIT_DIR, "icones", icon_name),
            os.path.join(COVERS_DIR, icon_name),
            pad_ratio=0.06
        )

    # 3. Zip theme
    with zipfile.ZipFile(ZIP_PATH, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(THEME_DIR):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, LOCAL_DIR).replace("\\", "/")
                zf.write(full_path, rel_path)

    # 4. Zip covers + trimmed logo + trimmed icons
    with zipfile.ZipFile(COVERS_ZIP, 'w', zipfile.ZIP_DEFLATED) as zf:
        for file in os.listdir(COVERS_DIR):
            full_path = os.path.join(COVERS_DIR, file)
            if os.path.isfile(full_path):
                zf.write(full_path, file)

PHP_APPLY_SCRIPT = r"""<?php
require_once '/var/www/nucleovip_wp/wp-load.php';
require_once ABSPATH . 'wp-admin/includes/image.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';

$assets_dir = '/tmp/nv_cohesive_assets';

function nv_upload_asset( $file_path, $title, $alt_text = '', $parent_post_id = 0 ) {
    if ( ! file_exists( $file_path ) ) {
        echo "MISSING: {$file_path}\n";
        return 0;
    }
    $upload_dir = wp_upload_dir();
    $filename   = wp_unique_filename( $upload_dir['path'], basename( $file_path ) );
    $dest_path  = trailingslashit( $upload_dir['path'] ) . $filename;
    copy( $file_path, $dest_path );

    $filetype = wp_check_filetype( $filename, null );
    $attachment = array(
        'guid'           => trailingslashit( $upload_dir['url'] ) . $filename,
        'post_mime_type' => $filetype['type'],
        'post_title'     => $title,
        'post_content'   => '',
        'post_status'    => 'inherit',
    );

    $attach_id = wp_insert_attachment( $attachment, $dest_path, $parent_post_id );
    if ( ! is_wp_error( $attach_id ) && $attach_id ) {
        $attach_data = wp_generate_attachment_metadata( $attach_id, $dest_path );
        wp_update_attachment_metadata( $attach_id, $attach_data );
        if ( '' !== $alt_text ) {
            update_post_meta( $attach_id, '_wp_attachment_image_alt', $alt_text );
        }
        return $attach_id;
    }
    return 0;
}

// 1. Update Custom Logo with trimmed high-contrast large version
$logo_id = nv_upload_asset(
    $assets_dir . '/logo-horizontal-large.png',
    'Núcleo VIP — Guia do Cidadão (Logo Oficial Ampliada)',
    'Núcleo VIP — Guia do Cidadão · Portal Independente de Informação'
);
if ( $logo_id ) {
    set_theme_mod( 'custom_logo', $logo_id );
    echo "Updated Custom Logo ID: {$logo_id}\n";
}

// 2. Update the 4 Category Icons with trimmed full-presence versions
$icons_map = array(
    'guia_cidadao_icon_beneficios'   => array( $assets_dir . '/beneficios-trabalho.png', 'Ícone Benefícios & Trabalhador' ),
    'guia_cidadao_icon_documentos'   => array( $assets_dir . '/documentos-govbr.png', 'Ícone Documentos & Gov.br' ),
    'guia_cidadao_icon_financas'     => array( $assets_dir . '/contas-financas.png', 'Ícone Contas & Finanças' ),
    'guia_cidadao_icon_calculadoras' => array( $assets_dir . '/calculadoras.png', 'Ícone Calculadoras & Simuladores' ),
);
foreach ( $icons_map as $mod_key => $info ) {
    $ic_id = nv_upload_asset( $info[0], $info[1], '' );
    if ( $ic_id ) {
        set_theme_mod( $mod_key, $ic_id );
        echo "Updated Icon {$mod_key} -> ID {$ic_id}\n";
    }
}

// 3. Assign the 17 standardized Manus-style editorial covers (1200x675 WebP)
$covers_spec = array(
    119 => array(
        'file'  => 'cover-119-cras_checklist.webp',
        'title' => 'Guia Prático do CadÚnico e CRAS',
        'alt'   => 'Ilustração editorial sobre atendimento no CRAS e checklist de documentos do CadÚnico',
    ),
    24 => array(
        'file'  => 'cover-24-bpc_shield.webp',
        'title' => 'Guia do Benefício BPC LOAS',
        'alt'   => 'Idoso em ambiente residencial com ícone de proteção assistencial do benefício BPC LOAS',
    ),
    23 => array(
        'file'  => 'cover-23-pis_workcard.webp',
        'title' => 'Abono Salarial PIS PASEP',
        'alt'   => 'Trabalhadores em ambiente profissional com ilustração da Carteira de Trabalho e abono PIS PASEP',
    ),
    22 => array(
        'file'  => 'cover-22-irpf_tax.webp',
        'title' => 'Calculadora de IRPF Mensal e Salário Líquido',
        'alt'   => 'Planejamento financeiro com calculadora ilustrando simulação de Imposto de Renda',
    ),
    21 => array(
        'file'  => 'cover-21-seguro_parcelas.webp',
        'title' => 'Calculadora de Seguro-Desemprego',
        'alt'   => 'Trabalhador organizando planejamento no notebook com ilustração de parcelas do Seguro-Desemprego',
    ),
    20 => array(
        'file'  => 'cover-20-decimo_calc.webp',
        'title' => 'Simulador de 13º Salário CLT',
        'alt'   => 'Mesa de planejamento trabalhista com ilustração de calculadora e duas parcelas do 13º salário',
    ),
    19 => array(
        'file'  => 'cover-19-ferias_calendar.webp',
        'title' => 'Calculadora de Férias CLT',
        'alt'   => 'Cenário de descanso planejado com ilustração de calendário de férias remuneradas',
    ),
    18 => array(
        'file'  => 'cover-18-rescisao_contract.webp',
        'title' => 'Calculadora de Rescisão Trabalhista CLT',
        'alt'   => 'Conferência de contrato de trabalho com ilustração de cálculo de verbas rescisórias CLT',
    ),
    17 => array(
        'file'  => 'cover-17-restituicao_refund.webp',
        'title' => 'Restituição do Imposto de Renda',
        'alt'   => 'Consulta financeira digital com ilustração de devolução de lote da restituição do Imposto de Renda',
    ),
    16 => array(
        'file'  => 'cover-16-energia_bolt.webp',
        'title' => 'Tarifa Social de Energia Elétrica',
        'alt'   => 'Infraestrutura de energia limpa com ilustração de desconto na fatura da Tarifa Social de Energia',
    ),
    15 => array(
        'file'  => 'cover-15-svr_bank.webp',
        'title' => 'Sistema Valores a Receber do Banco Central',
        'alt'   => 'Operação bancária com ilustração de instituição financeira e resgate de Valores a Receber',
    ),
    14 => array(
        'file'  => 'cover-14-cpf_certificate.webp',
        'title' => 'Situação Cadastral do CPF e Certidão Negativa',
        'alt'   => 'Conferência de cadastro no computador com ilustração de certidão regular de CPF',
    ),
    13 => array(
        'file'  => 'cover-13-govbr_biometrics.webp',
        'title' => 'Conta Gov.br Nível Prata e Ouro',
        'alt'   => 'Acesso digital seguro com ilustração de validação biométrica facial e escudo de proteção',
    ),
    12 => array(
        'file'  => 'cover-12-cin_idcard.webp',
        'title' => 'Nova Carteira de Identidade Nacional (CIN)',
        'alt'   => 'Cidadã sorrindo com ilustração da Nova Carteira de Identidade Nacional com QR Code',
    ),
    11 => array(
        'file'  => 'cover-11-bolsa_familia.webp',
        'title' => 'Guia do Bolsa Família e CadÚnico',
        'alt'   => 'Família reunida com ilustração de proteção social e programa Bolsa Família',
    ),
    10 => array(
        'file'  => 'cover-10-meu_inss.webp',
        'title' => 'Guia do Portal e Aplicativo Meu INSS',
        'alt'   => 'Consulta previdenciária no notebook com ilustração de extrato de benefícios e agendamentos',
    ),
    9 => array(
        'file'  => 'cover-9-fgts_savings.webp',
        'title' => 'Consulta do FGTS e Saque-Aniversário',
        'alt'   => 'Planejamento financeiro do trabalhador com ilustração de saldo acumulado do FGTS',
    ),
);

foreach ( $covers_spec as $post_id => $spec ) {
    $p = get_post( $post_id );
    if ( $p ) {
        $att_id = nv_upload_asset( $assets_dir . '/' . $spec['file'], $spec['title'], $spec['alt'], $post_id );
        if ( $att_id ) {
            set_post_thumbnail( $post_id, $att_id );
            echo "Assigned cohesive cover to Post {$post_id}: {$spec['file']}\n";
        }
    }
}

// 4. Embed task-specific diagrams [diagrama_etapas_servico] in multi-step guides (Posts 10, 13, 25, 119, 11)
$diagram_posts = array(
    10  => '[diagrama_etapas_servico tipo="meu-inss"]',
    13  => '[diagrama_etapas_servico tipo="govbr"]',
    25  => '[diagrama_etapas_servico tipo="cnh-digital"]',
    119 => '[diagrama_etapas_servico tipo="cadunico-cras"]',
    11  => '[diagrama_etapas_servico tipo="cadunico-cras"]',
);

foreach ( $diagram_posts as $pid => $shortcode ) {
    $post_obj = get_post( $pid );
    if ( $post_obj ) {
        $content = $post_obj->post_content;
        // Replace generic [infografico_consulta_segura] on 13 and 119 so we don't stack two large boxes, keep [infografico_consulta_segura] on 10 alongside the Meu INSS flow diagram
        if ( in_array( $pid, array( 13, 119 ), true ) ) {
            $content = str_replace( '[infografico_consulta_segura]', $shortcode, $content );
        }
        if ( false === strpos( $content, $shortcode ) ) {
            $content .= "\n\n" . $shortcode . "\n";
        }
        wp_update_post( array(
            'ID'           => $pid,
            'post_content' => $content,
        ) );
        echo "Updated task diagram in Post {$pid}\n";
    }
}

wp_cache_flush();
echo "ALL MANUS VISUAL REVIEW UPDATES APPLIED!\n";
"""

def deploy():
    prepare_assets()
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(VPS_IP, username=VPS_USER, password=VPS_PASS, timeout=20)

    sftp = ssh.open_sftp()
    sftp.put(ZIP_PATH, "/tmp/guia-cidadao-adsense.zip")
    sftp.put(COVERS_ZIP, "/tmp/cohesive_covers.zip")
    with sftp.file("/tmp/apply_manus_visual.php", "wb") as f:
        f.write(PHP_APPLY_SCRIPT.encode("utf-8"))
    sftp.close()

    cmds = [
        f"unzip -o /tmp/guia-cidadao-adsense.zip -d {WP_PATH}/wp-content/themes/",
        "rm -rf /tmp/nv_cohesive_assets && mkdir -p /tmp/nv_cohesive_assets",
        "unzip -o /tmp/cohesive_covers.zip -d /tmp/nv_cohesive_assets/",
        "php /tmp/apply_manus_visual.php",
        f"chown -R www-data:www-data {WP_PATH}/wp-content/themes/guia-cidadao-adsense {WP_PATH}/wp-content/uploads",
        "rm -rf /tmp/guia-cidadao-adsense.zip /tmp/cohesive_covers.zip /tmp/nv_cohesive_assets /tmp/apply_manus_visual.php",
        "systemctl reload nginx"
    ]
    for cmd in cmds:
        print(f"Running: {cmd}")
        stdin, stdout, stderr = ssh.exec_command(cmd, timeout=120)
        out = stdout.read().decode("utf-8", errors="replace")
        err = stderr.read().decode("utf-8", errors="replace")
        if out:
            print(out)
        if err:
            print("ERR:", err)

    ssh.close()

if __name__ == "__main__":
    deploy()
