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
KIT_ZIP_PATH = r"C:\Users\Eusimar\Downloads\nucleo-vip-kit-pronto-para-web.zip"

def create_zip():
    with zipfile.ZipFile(ZIP_PATH, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(THEME_DIR):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, LOCAL_DIR).replace("\\", "/")
                zf.write(full_path, rel_path)
    print(f"Created {ZIP_PATH}")

PHP_INSTALL_KIT = r"""<?php
require_once '/var/www/nucleovip_wp/wp-load.php';
require_once ABSPATH . 'wp-admin/includes/image.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';

$kit_base = '/tmp/kit_nucleo_vip/pronto-para-web';

function nv_import_media_file( $file_path, $title, $alt_text = '', $parent_post_id = 0 ) {
    if ( ! file_exists( $file_path ) ) {
        echo "ERROR: File not found: {$file_path}\n";
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

// 1. Logo Horizontal e Símbolo Quadrado (Favicon / Site Icon)
$logo_horiz_id = nv_import_media_file(
    $kit_base . '/logo/logo-horizontal.png',
    'Núcleo VIP — Guia do Cidadão (Logo Horizontal)',
    'Núcleo VIP — Guia do Cidadão · Portal Independente de Informação'
);
if ( $logo_horiz_id ) {
    set_theme_mod( 'custom_logo', $logo_horiz_id );
    echo "Logo Horizontal ID: {$logo_horiz_id} -> " . wp_get_attachment_url( $logo_horiz_id ) . "\n";
}

$marca_id = nv_import_media_file(
    $kit_base . '/logo/nucleo-vip-marca.png',
    'Núcleo VIP — Símbolo da Marca',
    'Símbolo Núcleo VIP — Guia do Cidadão'
);
if ( $marca_id ) {
    update_option( 'site_icon', $marca_id );
    echo "Site Icon (Favicon) ID: {$marca_id} -> " . wp_get_attachment_url( $marca_id ) . "\n";
}

// 2. Banner Principal (Hero da Página Inicial 1920x1080 WebP)
$hero_id = nv_import_media_file(
    $kit_base . '/banner/hero-cidadao.webp',
    'Banner Principal Hero Cidadão — Núcleo VIP',
    'Cidadã consultando orientações e calculadora trabalhista pelo celular'
);
if ( $hero_id ) {
    set_theme_mod( 'guia_cidadao_hero_bg_id', $hero_id );
    echo "Hero Banner ID: {$hero_id} -> " . wp_get_attachment_url( $hero_id ) . "\n";
}

// 3. Miniaturas 1200x675 WebP associadas estritamente pelo slug/ID de cada artigo
$thumbs_map = array(
    'dolar-cai-a-r-498-e-acumula-perda-de-444-na-semana' => array(
        'file'  => $kit_base . '/miniaturas/dolar-mercado.webp',
        'title' => 'Mercado de câmbio e real brasileiro',
        'alt'   => 'Ilustração editorial sobre mercado de câmbio e real brasileiro',
    ),
    'bets-mais-de-r-1-bilhao-foram-devolvidos-a-apostadores' => array(
        'file'  => $kit_base . '/miniaturas/apostas-responsaveis.webp',
        'title' => 'Devolução de valores a apostadores e orientação financeira',
        'alt'   => 'Pessoa revisando o celular e deixando de lado um comprovante de aposta',
    ),
    'portal-do-empreendedor-mei-emitir-das-declaracao-anual' => array(
        'file'  => $kit_base . '/miniaturas/mei-pequeno-negocio.webp',
        'title' => 'Guia do Microempreendedor Individual (MEI)',
        'alt'   => 'Pequena empreendedora trabalhando no balcão com computador e documentos',
    ),
    'cnh-digital-celular-como-baixar-carteira-digital-transito' => array(
        'file'  => $kit_base . '/miniaturas/cnh-digital.webp',
        'title' => 'Guia da Carteira Digital de Trânsito (CNH Digital)',
        'alt'   => 'Celular com uma carteira digital genérica ao lado de chaves de carro',
    ),
);

foreach ( $thumbs_map as $slug => $data ) {
    $post_obj = get_page_by_path( $slug, OBJECT, 'post' );
    if ( $post_obj ) {
        $att_id = nv_import_media_file( $data['file'], $data['title'], $data['alt'], $post_obj->ID );
        if ( $att_id ) {
            set_post_thumbnail( $post_obj->ID, $att_id );
            echo "Assigned thumbnail {$data['file']} to Post ID {$post_obj->ID} ({$slug}) with ALT: {$data['alt']}\n";
        }
    } else {
        echo "WARNING: Post not found for slug: {$slug}\n";
    }
}

// 4. Ícones das 4 Categorias (PNG transparentes na Biblioteca de Mídia)
$icons_map = array(
    'guia_cidadao_icon_beneficios'   => array( $kit_base . '/icones/beneficios-trabalho.png', 'Ícone Benefícios & Trabalhador' ),
    'guia_cidadao_icon_documentos'   => array( $kit_base . '/icones/documentos-govbr.png', 'Ícone Documentos & Gov.br' ),
    'guia_cidadao_icon_financas'     => array( $kit_base . '/icones/contas-financas.png', 'Ícone Contas & Finanças' ),
    'guia_cidadao_icon_calculadoras' => array( $kit_base . '/icones/calculadoras.png', 'Ícone Calculadoras & Simuladores' ),
);

foreach ( $icons_map as $mod_key => $info ) {
    $icon_id = nv_import_media_file( $info[0], $info[1], '' );
    if ( $icon_id ) {
        set_theme_mod( $mod_key, $icon_id );
        echo "Category Icon {$mod_key} ID: {$icon_id} -> " . wp_get_attachment_url( $icon_id ) . "\n";
    }
}

// 5. Infográfico "Consulte com segurança": importar PNG para a Biblioteca de Mídia e incorporar o infográfico HTML acessível no guia Meu INSS
$infog_id = nv_import_media_file(
    $kit_base . '/infografico/consulta-segura.png',
    'Infográfico Consulte com Segurança — Núcleo VIP',
    'Infográfico com três recomendações para consultar serviços públicos digitais com segurança'
);
echo "Infografico PNG imported to Media Library ID: {$infog_id}\n";

$post_inss = get_post( 10 );
if ( $post_inss ) {
    $c = $post_inss->post_content;
    if ( false === strpos( $c, '[infografico_consulta_segura]' ) ) {
        $c .= "\n\n[infografico_consulta_segura]\n";
        wp_update_post( array(
            'ID'           => $post_inss->ID,
            'post_content' => $c,
        ) );
    }
    echo "Embedded [infografico_consulta_segura] in Post 10: " . get_permalink( 10 ) . "\n";
}

$post_govbr = get_post( 13 );
if ( $post_govbr ) {
    $c2 = $post_govbr->post_content;
    if ( false === strpos( $c2, '[infografico_consulta_segura]' ) ) {
        $c2 .= "\n\n[infografico_consulta_segura]\n";
        wp_update_post( array(
            'ID'           => $post_govbr->ID,
            'post_content' => $c2,
        ) );
    }
    echo "Embedded [infografico_consulta_segura] in Post 13: " . get_permalink( 13 ) . "\n";
}

wp_cache_flush();
echo "VISUAL KIT APPLIED SUCCESSFULLY!\n";
"""

def deploy():
    create_zip()
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(VPS_IP, username=VPS_USER, password=VPS_PASS, timeout=20)

    sftp = ssh.open_sftp()
    sftp.put(ZIP_PATH, "/tmp/guia-cidadao-adsense.zip")
    sftp.put(KIT_ZIP_PATH, "/tmp/nucleo-vip-kit-pronto-para-web.zip")
    with sftp.file("/tmp/install_visual_kit.php", "wb") as f:
        f.write(PHP_INSTALL_KIT.encode("utf-8"))
    sftp.close()

    cmds = [
        f"unzip -o /tmp/guia-cidadao-adsense.zip -d {WP_PATH}/wp-content/themes/",
        "rm -rf /tmp/kit_nucleo_vip && mkdir -p /tmp/kit_nucleo_vip",
        "unzip -o /tmp/nucleo-vip-kit-pronto-para-web.zip -d /tmp/kit_nucleo_vip/",
        "php /tmp/install_visual_kit.php",
        f"chown -R www-data:www-data {WP_PATH}/wp-content/themes/guia-cidadao-adsense {WP_PATH}/wp-content/uploads",
        "rm -rf /tmp/guia-cidadao-adsense.zip /tmp/nucleo-vip-kit-pronto-para-web.zip /tmp/kit_nucleo_vip /tmp/install_visual_kit.php",
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
