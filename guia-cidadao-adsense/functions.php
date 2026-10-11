<?php
/**
 * Guia do Cidadão Pro - Functions and Definitions
 * Otimizado para Core Web Vitals (PageSpeed 99+), Google AdSense e Fontes Oficiais de Utilidade Pública.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * 1. CONFIGURAÇÃO DO TEMA E OTIMIZAÇÃO EXTREMA DE VELOCIDADE (CORE WEB VITALS)
 */
function guia_cidadao_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );

	register_nav_menus( array(
		'primary' => __( 'Menu Principal de Categorias', 'guia-cidadao' ),
		'footer'  => __( 'Menu Institucional & AdSense (Rodapé)', 'guia-cidadao' ),
	) );
}
add_action( 'after_setup_theme', 'guia_cidadao_setup' );

// Remove scripts desnecessários do WordPress para garantir nota máxima no Google PageSpeed
function guia_cidadao_clean_head() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'wp_head', 'wp_generator' );
	remove_action( 'wp_head', 'wlwmanifest_link' );
	remove_action( 'wp_head', 'rsd_link' );
	remove_action( 'wp_head', 'wp_shortlink_wp_head' );
}
add_action( 'init', 'guia_cidadao_clean_head' );

function guia_cidadao_scripts() {
	wp_enqueue_style( 'guia-cidadao-style', get_stylesheet_uri(), array(), '1.0.0' );
	wp_enqueue_script( 'guia-cidadao-main', get_template_directory_uri() . '/assets/js/main.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'guia_cidadao_scripts' );

/**
 * 2. PERSONALIZADOR DO WORDPRESS: CONFIGURAÇÃO DE GOOGLE ADSENSE E ADS.TXT NATIVO
 */
function guia_cidadao_customize_register( $wp_customize ) {
	$wp_customize->add_section( 'guia_adsense_section', array(
		'title'       => __( '💰 Google AdSense & Monetização', 'guia-cidadao' ),
		'priority'    => 30,
		'description' => 'Configure seu ID de Editor AdSense, blocos de anúncios estratégicos e arquivo ads.txt sem precisar de plugins pesados.',
	) );

	$fields = array(
		'adsense_pub_id'      => array( 'ID do Editor (ex: ca-pub-1234567890123456)', '' ),
		'adsense_header_code' => array( 'Código AdSense Topo (Leaderboard 728x90 / Responsivo)', '' ),
		'adsense_p2_code'     => array( 'Código AdSense Após 2º Parágrafo (Alto CTR)', '' ),
		'adsense_p5_code'     => array( 'Código AdSense Após 5º Parágrafo (Meio do Post)', '' ),
		'adsense_end_code'    => array( 'Código AdSense Final do Artigo / Abaixo da Calculadora', '' ),
		'adsense_sidebar_code'=> array( 'Código AdSense Barra Lateral Fixa (300x600 ou 300x250)', '' ),
		'adsense_ads_txt'     => array( 'Conteúdo do arquivo ads.txt (ex: google.com, pub-000000, DIRECT, f08c47fec0942fa0)', '' ),
	);

	foreach ( $fields as $id => $info ) {
		$wp_customize->add_setting( $id, array(
			'default'           => $info[1],
			'sanitize_callback' => 'wp_kses_post',
		) );
		$wp_customize->add_control( $id, array(
			'label'   => $info[0],
			'section' => 'guia_adsense_section',
			'type'    => 'textarea',
		) );
	}

	$wp_customize->add_setting( 'adsense_show_placeholders', array(
		'default'           => true,
		'sanitize_callback' => 'rest_sanitize_boolean',
	) );
	$wp_customize->add_control( 'adsense_show_placeholders', array(
		'label'   => 'Exibir caixas simuladas de anúncio (Enquanto aguarda aprovação ou testa layout)',
		'section' => 'guia_adsense_section',
		'type'    => 'checkbox',
	) );
}
add_action( 'customize_register', 'guia_cidadao_customize_register' );

// Insere script global do AdSense no <head> se o Publisher ID estiver preenchido
function guia_cidadao_head_adsense() {
	$pub_id = trim( get_theme_mod( 'adsense_pub_id', '' ) );
	if ( ! empty( $pub_id ) ) {
		echo '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' . esc_attr( $pub_id ) . '" crossorigin="anonymous"></script>' . "\n";
	}
}
add_action( 'wp_head', 'guia_cidadao_head_adsense', 5 );

// Entrega o arquivo /ads.txt virtualmente sem precisar de FTP
function guia_cidadao_serve_ads_txt() {
	if ( isset( $_SERVER['REQUEST_URI'] ) && $_SERVER['REQUEST_URI'] === '/ads.txt' ) {
		$ads_txt = trim( get_theme_mod( 'adsense_ads_txt', '' ) );
		if ( ! empty( $ads_txt ) ) {
			header( 'Content-Type: text/plain; charset=utf-8' );
			echo esc_html( $ads_txt );
			exit;
		}
	}
}
add_action( 'init', 'guia_cidadao_serve_ads_txt', 1 );

// Função auxiliar para renderizar espaços de AdSense com proteção anti-CLS
function guia_cidadao_render_ad( $slot_key, $class = 'ad-in-article', $label_demo = 'Espaço AdSense Responsivo (Alto CTR)' ) {
	$code = trim( get_theme_mod( $slot_key, '' ) );
	$show_demo = get_theme_mod( 'adsense_show_placeholders', true );

	if ( empty( $code ) && ! $show_demo ) {
		return '';
	}

	ob_start();
	?>
	<div class="ad-slot-wrapper <?php echo esc_attr( $class ); ?>" aria-label="Publicidade">
		<span class="ad-label">Publicidade</span>
		<?php if ( ! empty( $code ) ) : ?>
			<?php echo $code; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		<?php else : ?>
			<div class="ad-placeholder-demo">
				<strong>[ <?php echo esc_html( $label_demo ); ?> ]</strong>
				<span>Reserva de altura anti-CLS ativa • Configure o código em Aparência &rarr; Personalizar &rarr; Google AdSense</span>
			</div>
		<?php endif; ?>
	</div>
	<?php
	return ob_get_clean();
}

// Injeção automática de anúncios após o 2º e 5º parágrafos nos artigos
function guia_cidadao_inject_in_content_ads( $content ) {
	if ( ! is_single() || is_admin() ) {
		return $content;
	}

	$ad_p2  = guia_cidadao_render_ad( 'adsense_p2_code', 'ad-in-article', 'Anúncio Automático - Após 2º Parágrafo (Maior Taxa de Cliques)' );
	$ad_p5  = guia_cidadao_render_ad( 'adsense_p5_code', 'ad-in-article', 'Anúncio Automático - Após 5º Parágrafo (Meio do Conteúdo)' );
	$ad_end = guia_cidadao_render_ad( 'adsense_end_code', 'ad-in-article', 'Anúncio Automático - Conclusão do Passo a Passo' );

	$paragraphs = explode( '</p>', $content );
	$new_content = '';

	foreach ( $paragraphs as $index => $paragraph ) {
		if ( trim( $paragraph ) ) {
			$new_content .= $paragraph . '</p>';
		}
		if ( 1 === $index && ! empty( $ad_p2 ) ) {
			$new_content .= $ad_p2;
		}
		if ( 4 === $index && ! empty( $ad_p5 ) ) {
			$new_content .= $ad_p5;
		}
	}

	return $new_content . $ad_end;
}
add_filter( 'the_content', 'guia_cidadao_inject_in_content_ads', 20 );

/**
 * 3. DADOS ESTRUTURADOS SCHEMA.ORG (JSON-LD) PARA SEO DE UTILIDADE PÚBLICA
 */
function guia_cidadao_schema_json_ld() {
	if ( is_single() ) {
		global $post;
		$schema = array(
			'@context'         => 'https://schema.org',
			'@type'            => 'NewsArticle',
			'headline'         => get_the_title(),
			'datePublished'    => get_the_date( 'c' ),
			'dateModified'     => get_the_modified_date( 'c' ),
			'mainEntityOfPage' => get_permalink(),
			'author'           => array(
				'@type' => 'Organization',
				'name'  => get_bloginfo( 'name' ),
			),
			'publisher'        => array(
				'@type' => 'Organization',
				'name'  => get_bloginfo( 'name' ),
			),
		);
		echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) . '</script>' . "\n";
	}
}
add_action( 'wp_head', 'guia_cidadao_schema_json_ld' );

/**
 * 4. SHORTCODES DE CALCULADORAS DE UTILIDADE PÚBLICA (ATUALIZADAS CLT 2026)
 * Uso nos posts ou páginas: [calculadora_rescisao], [calculadora_ferias], [calculadora_decimo_terceiro]
 */
function guia_cidadao_shortcode_ferias() {
	ob_start();
	?>
	<div class="calc-box" id="calc-ferias">
		<div class="calc-header">
			<h3>🧮 Simulador Oficial de Férias Remuneradas (CLT + 1/3 Constitucional)</h3>
		</div>
		<div class="calc-grid">
			<div class="calc-field">
				<label for="ferias-salario">Salário Bruto Mensal (R$)</label>
				<input type="number" id="ferias-salario" value="2800" min="500" step="50">
			</div>
			<div class="calc-field">
				<label for="ferias-dias">Dias de Férias</label>
				<select id="ferias-dias">
					<option value="30">30 dias (Completo)</option>
					<option value="20">20 dias (+ 10 dias vendidos / Abono)</option>
					<option value="15">15 dias</option>
				</select>
			</div>
		</div>
		<button type="button" class="calc-btn" onclick="calcularFeriasCLT()">Calcular Valor Líquido das Férias</button>
		<div class="calc-result" id="resultado-ferias">
			<span>Valor Líquido Estimado a Receber:</span>
			<div class="calc-result-total" id="ferias-valor-liquido">R$ 0,00</div>
			<p id="ferias-detalhes" style="font-size:0.85rem; margin-bottom:0; color:#334155;"></p>
		</div>
	</div>
	<?php
	return ob_get_clean();
}
add_shortcode( 'calculadora_ferias', 'guia_cidadao_shortcode_ferias' );

function guia_cidadao_shortcode_rescisao() {
	ob_start();
	?>
	<div class="calc-box" id="calc-rescisao">
		<div class="calc-header">
			<h3>🧮 Calculadora de Rescisão Trabalhista CLT + Multa 40% FGTS</h3>
		</div>
		<div class="calc-grid">
			<div class="calc-field">
				<label for="resc-salario">Último Salário Bruto (R$)</label>
				<input type="number" id="resc-salario" value="2500" min="500" step="50">
			</div>
			<div class="calc-field">
				<label for="resc-meses">Meses Trabalhados no Ano Atual (1 a 12)</label>
				<input type="number" id="resc-meses" value="8" min="1" max="12">
			</div>
			<div class="calc-field">
				<label for="resc-dias">Dias Trabalhados no Último Mês</label>
				<input type="number" id="resc-dias" value="15" min="1" max="31">
			</div>
			<div class="calc-field">
				<label for="resc-motivo">Motivo do Desligamento</label>
				<select id="resc-motivo">
					<option value="sem_justa_causa">Demissão Sem Justa Causa (Com Multa 40%)</option>
					<option value="pedido_demissao">Pedido de Demissão pelo Trabalhador</option>
					<option value="acordo">Acordo Comum (Multa 20% FGTS)</option>
				</select>
			</div>
		</div>
		<button type="button" class="calc-btn" onclick="calcularRescisaoCLT()">Simular Acerto Rescisório Agora</button>
		<div class="calc-result" id="resultado-rescisao">
			<span>Total Estimado da Rescisão:</span>
			<div class="calc-result-total" id="resc-valor-total">R$ 0,00</div>
			<p id="resc-detalhes" style="font-size:0.85rem; margin-bottom:0; color:#334155;"></p>
		</div>
	</div>
	<?php
	return ob_get_clean();
}
add_shortcode( 'calculadora_rescisao', 'guia_cidadao_shortcode_rescisao' );

function guia_cidadao_shortcode_decimo() {
	ob_start();
	?>
	<div class="calc-box" id="calc-decimo">
		<div class="calc-header">
			<h3>🧮 Simulador de 13º Salário (1ª e 2ª Parcela)</h3>
		</div>
		<div class="calc-grid">
			<div class="calc-field">
				<label for="dec-salario">Salário Bruto (R$)</label>
				<input type="number" id="dec-salario" value="3000" min="500" step="50">
			</div>
			<div class="calc-field">
				<label for="dec-meses">Meses Trabalhados no Ano (1 a 12)</label>
				<input type="number" id="dec-meses" value="12" min="1" max="12">
			</div>
		</div>
		<button type="button" class="calc-btn" onclick="calcularDecimoCLT()">Calcular 1ª e 2ª Parcelas</button>
		<div class="calc-result" id="resultado-decimo">
			<span>Total Líquido do 13º Salário:</span>
			<div class="calc-result-total" id="dec-valor-total">R$ 0,00</div>
			<p id="dec-detalhes" style="font-size:0.85rem; margin-bottom:0; color:#334155;"></p>
		</div>
	</div>
	<?php
	return ob_get_clean();
}
add_shortcode( 'calculadora_decimo_terceiro', 'guia_cidadao_shortcode_decimo' );

/**
 * 5. PAINEL ADMIN: INSTALADOR 1-CLIQUE (PÁGINAS ADSENSE + CATEGORIAS) E RADAR DE FONTES OFICIAIS (GOV/AGÊNCIA BRASIL)
 */
function guia_cidadao_admin_menu() {
	add_menu_page(
		'Central do Portal & AdSense',
		'Portal & AdSense',
		'manage_options',
		'guia-cidadao-central',
		'guia_cidadao_render_admin_central',
		'dashicons-shield-alt',
		3
	);
}
add_action( 'admin_menu', 'guia_cidadao_admin_menu' );

function guia_cidadao_install_structure() {
	// 1. Cria as 4 Categorias Pilares do Portal de Utilidade Pública
	$categories = array(
		'Benefícios & Trabalhador' => array(
			'slug' => 'beneficios-trabalhador',
			'desc' => 'Guias atualizados sobre FGTS, INSS, Bolsa Família, PIS/PASEP, Seguro-Desemprego e CadÚnico.',
		),
		'Documentos & Gov.br'      => array(
			'slug' => 'documentos-gov-br',
			'desc' => 'Passo a passo para emissão de CIN (Novo RG), CNH Digital, CPF, Certidões Negativas, Detran e MEI.',
		),
		'Contas & Finanças'        => array(
			'slug' => 'contas-financas',
			'desc' => 'Consulta de CPF, renegociação de dívidas, Imposto de Renda, 2ª via de contas e educação financeira.',
		),
		'Calculadoras & Simuladores' => array(
			'slug' => 'calculadoras-simuladores',
			'desc' => 'Ferramentas gratuitas de cálculo trabalhista: Férias, Rescisão CLT, 13º Salário e benefícios.',
		),
	);

	foreach ( $categories as $name => $data ) {
		if ( ! term_exists( $name, 'category' ) ) {
			wp_insert_term( $name, 'category', array(
				'slug'        => $data['slug'],
				'description' => $data['desc'],
			) );
		}
	}

	// 2. Cria as Páginas Obrigatórias de Aprovação no Google AdSense + Página de Calculadoras
	$mandatory_pages = array(
		'politica-de-privacidade' => array(
			'title'    => 'Política de Privacidade e Cookies (LGPD)',
			'template' => 'page-privacidade.php',
		),
		'termos-de-uso'           => array(
			'title'    => 'Termos e Condições de Uso',
			'template' => 'page-termos.php',
		),
		'sobre-nos'               => array(
			'title'    => 'Sobre Nós e Política Editorial',
			'template' => 'page-sobre.php',
		),
		'contato'                 => array(
			'title'    => 'Fale Conosco / Ouvidoria do Leitor',
			'template' => 'page-contato.php',
		),
		'calculadoras'            => array(
			'title'    => 'Calculadoras Trabalhistas e Simuladores do Cidadão',
			'template' => 'page-calculadoras.php',
		),
	);

	foreach ( $mandatory_pages as $slug => $page_info ) {
		$existing = get_page_by_path( $slug );
		if ( ! $existing ) {
			$page_id = wp_insert_post( array(
				'post_title'   => $page_info['title'],
				'post_name'    => $slug,
				'post_status'  => 'publish',
				'post_type'    => 'page',
				'post_content' => '<!-- Conteúdo renderizado automaticamente pelo template otimizado do tema Guia do Cidadão Pro -->',
			) );
			if ( $page_id && ! is_wp_error( $page_id ) ) {
				update_post_meta( $page_id, '_wp_page_template', $page_info['template'] );
			}
		}
	}
}

function guia_cidadao_render_admin_central() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$message = '';
	if ( isset( $_POST['guia_action'] ) && check_admin_referer( 'guia_central_nonce' ) ) {
		if ( 'install_portal' === $_POST['guia_action'] ) {
			guia_cidadao_install_structure();
			$message = '✅ Estrutura do Portal (4 Categorias + 5 Páginas Obrigatórias de Aprovação no AdSense e Calculadoras) criada com sucesso!';
		} elseif ( 'import_rss_draft' === $_POST['guia_action'] && ! empty( $_POST['rss_title'] ) ) {
			$title   = sanitize_text_field( wp_unslash( $_POST['rss_title'] ) );
			$summary = wp_kses_post( wp_unslash( $_POST['rss_desc'] ) );
			$link    = esc_url_raw( wp_unslash( $_POST['rss_link'] ) );
			$source  = sanitize_text_field( wp_unslash( $_POST['rss_source'] ) );

			$post_content  = "<div class=\"gov-callout\"><strong>📌 Resumo Oficial:</strong> " . esc_html( wp_strip_all_tags( $summary ) ) . "</div>\n\n";
			$post_content .= "<h2>O que mudou e quem tem direito?</h2>\n<p>Confira abaixo as informações divulgadas oficialmente e veja o passo a passo atualizado para realizar sua consulta pelos canais oficiais.</p>\n\n";
			$post_content .= "<h2>Passo a passo para consultar pelos canais oficiais</h2>\n<ol><li>Acesse o portal ou aplicativo oficial (Gov.br / Caixa / Meu INSS);</li><li>Faça login com seu CPF e senha cadastrada;</li><li>Localize o serviço desejado no menu principal.</li></ol>\n\n";
			$post_content .= "<p><em>Fonte oficial de referência (Reprodução pública permitida com citação): <a href=\"" . esc_url( $link ) . "\" target=\"_blank\" rel=\"noopener nofollow\">" . esc_html( $source ) . "</a>.</em></p>";

			$draft_id = wp_insert_post( array(
				'post_title'   => $title,
				'post_content' => $post_content,
				'post_status'  => 'draft',
				'post_type'    => 'post',
			) );

			if ( $draft_id ) {
				$message = '✅ Rascunho importado com sucesso! <a href="' . esc_url( get_edit_post_link( $draft_id ) ) . '">Clique aqui para revisar e publicar o artigo</a>.';
			}
		}
	}

	include_once ABSPATH . WPINC . '/feed.php';
	$official_feeds = array(
		'Agência Brasil (EBC - Economia & Cidadania)' => 'https://agenciabrasil.ebc.com.br/rss/economia/feed.xml',
		'Agência Senado (Direitos & Leis Aprovadas)'  => 'https://www12.senado.leg.br/noticias/feed/todasnoticias',
	);
	?>
	<div class="wrap">
		<h1>🏛️ Central do Portal de Utilidade Pública & Google AdSense</h1>
		<p>Gerencie as páginas obrigatórias de aprovação no AdSense e busque pautas 100% verdadeiras e gratuitas direto das Agências Oficiais Públicas do Brasil.</p>

		<?php if ( ! empty( $message ) ) : ?>
			<div class="notice notice-success is-dismissible"><p><?php echo wp_kses_post( $message ); ?></p></div>
		<?php endif; ?>

		<div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-top:20px;">
			<div style="background:#fff; padding:20px; border:1px solid #ccd0d4; border-radius:8px;">
				<h2>🚀 1. Instalação Rápida (Páginas AdSense + Categorias)</h2>
				<p>Clique no botão abaixo para criar automaticamente:</p>
				<ul style="list-style:disc; margin-left:20px;">
					<li><strong>4 Categorias Pilares:</strong> Benefícios & Trabalhador, Documentos & Gov.br, Contas & Finanças, Calculadoras & Simuladores.</li>
					<li><strong>4 Páginas Obrigatórias do Google AdSense:</strong> Política de Privacidade (com cláusula Cookie DART e LGPD), Termos de Uso (com isenção de vínculo governamental), Sobre Nós (E-E-A-T) e Contato.</li>
					<li><strong>Central de Calculadoras Interativas:</strong> Página pronta com simuladores de Férias, Rescisão e 13º Salário.</li>
				</ul>
				<form method="post">
					<?php wp_nonce_field( 'guia_central_nonce' ); ?>
					<input type="hidden" name="guia_action" value="install_portal">
					<button type="submit" class="button button-primary button-hero">Criar Páginas Obrigatórias & Categorias Agora</button>
				</form>
			</div>

			<div style="background:#fff; padding:20px; border:1px solid #ccd0d4; border-radius:8px;">
				<h2>📡 2. Fontes Oficiais de Dados em Tempo Real</h2>
				<p>No Brasil, o conteúdo da <strong>Agência Brasil (EBC)</strong>, <strong>Agência Senado</strong> e <strong>Agência Câmara</strong> possui reprodução livre e gratuita garantida por lei (basta manter o crédito da fonte oficial). Além disso, usamos <strong>APIs Públicas Oficiais</strong>:</p>
				<ul style="list-style:disc; margin-left:20px;">
					<li><strong>Portal Gov.br / Diário Oficial da União:</strong> Calendários oficiais do INSS, Bolsa Família e FGTS.</li>
					<li><strong>Agência Brasil (EBC):</strong> Notícias diárias verificadas sobre pagamentos, PIS/PASEP, Receita Federal e Enem.</li>
					<li><strong>BrasilAPI / Banco Central:</strong> Taxa Selic, Índices e Feriados Nacionais.</li>
				</ul>
			</div>
		</div>

		<div style="background:#fff; padding:20px; border:1px solid #ccd0d4; border-radius:8px; margin-top:20px;">
			<h2>📰 Radar ao Vivo: Últimas Notícias Oficiais (Agência Brasil & Senado)</h2>
			<p>Transforme comunicados oficiais em rascunhos otimizados para AdSense com 1 clique:</p>
			<?php foreach ( $official_feeds as $source_name => $feed_url ) : ?>
				<h3 style="margin-top:15px; border-bottom:1px solid #eee; padding-bottom:5px;"><?php echo esc_html( $source_name ); ?></h3>
				<?php
				$rss = fetch_feed( $feed_url );
				if ( ! is_wp_error( $rss ) ) :
					$maxitems  = $rss->get_item_quantity( 5 );
					$rss_items = $rss->get_items( 0, $maxitems );
					?>
					<table class="widefat striped">
						<thead>
							<tr>
								<th>Título Oficial</th>
								<th>Data</th>
								<th>Ação Rápida</th>
							</tr>
						</thead>
						<tbody>
							<?php foreach ( $rss_items as $item ) : ?>
								<tr>
									<td>
										<strong><a href="<?php echo esc_url( $item->get_permalink() ); ?>" target="_blank"><?php echo esc_html( $item->get_title() ); ?></a></strong>
									</td>
									<td><?php echo esc_html( $item->get_date( 'd/m/Y H:i' ) ); ?></td>
									<td>
										<form method="post" style="margin:0;">
											<?php wp_nonce_field( 'guia_central_nonce' ); ?>
											<input type="hidden" name="guia_action" value="import_rss_draft">
											<input type="hidden" name="rss_title" value="<?php echo esc_attr( $item->get_title() ); ?>">
											<input type="hidden" name="rss_desc" value="<?php echo esc_attr( $item->get_description() ); ?>">
											<input type="hidden" name="rss_link" value="<?php echo esc_url( $item->get_permalink() ); ?>">
											<input type="hidden" name="rss_source" value="<?php echo esc_attr( $source_name ); ?>">
											<button type="submit" class="button button-secondary">Importar p/ Rascunho</button>
										</form>
									</td>
								</tr>
							<?php endforeach; ?>
						</tbody>
					</table>
				<?php else : ?>
					<p><em>Conecte-se à internet para carregar o feed ao vivo de <?php echo esc_html( $source_name ); ?>.</em></p>
				<?php endif; ?>
			<?php endforeach; ?>
		</div>
	</div>
	<?php
}
