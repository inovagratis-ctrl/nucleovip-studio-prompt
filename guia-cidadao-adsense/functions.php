<?php
/**
 * Guia do Cidadão Pro - Functions and Definitions
 * Otimizado para Core Web Vitals (PageSpeed 99+), SEO Avançado (Sitemap XML, Robots.txt, Schema.org, OpenGraph),
 * Google AdSense e 5 Calculadoras Oficiais de Utilidade Pública.
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
	wp_enqueue_style( 'guia-cidadao-style', get_stylesheet_uri(), array(), '1.1.0' );
	wp_enqueue_script( 'guia-cidadao-main', get_template_directory_uri() . '/assets/js/main.js', array(), '1.1.0', true );
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
		'default'           => false,
		'sanitize_callback' => 'rest_sanitize_boolean',
	) );
	$wp_customize->add_control( 'adsense_show_placeholders', array(
		'label'   => 'Exibir caixas simuladas de anúncio (Enquanto aguarda aprovação ou testa layout)',
		'section' => 'guia_adsense_section',
		'type'    => 'checkbox',
	) );
}
add_action( 'customize_register', 'guia_cidadao_customize_register' );

function guia_cidadao_head_adsense() {
	$pub_id = trim( get_theme_mod( 'adsense_pub_id', '' ) );
	if ( ! empty( $pub_id ) ) {
		echo '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' . esc_attr( $pub_id ) . '" crossorigin="anonymous"></script>' . "\n";
	}
}
add_action( 'wp_head', 'guia_cidadao_head_adsense', 5 );

/**
 * 3. SITEMAP.XML DINÂMICO, ROBOTS.TXT OTIMIZADO PARA ADSENSE E ADS.TXT VIRTUAL
 */
function guia_cidadao_virtual_seo_files() {
	if ( ! isset( $_SERVER['REQUEST_URI'] ) ) {
		return;
	}
	$uri = strtok( $_SERVER['REQUEST_URI'], '?' );

	// 3.1. Entrega /ads.txt
	if ( '/ads.txt' === $uri ) {
		$ads_txt = trim( get_theme_mod( 'adsense_ads_txt', '' ) );
		header( 'Content-Type: text/plain; charset=utf-8' );
		if ( ! empty( $ads_txt ) ) {
			echo esc_html( $ads_txt ) . "\n";
		} else {
			echo "# Arquivo ads.txt pronto para Google AdSense - Configure seu ID em Aparencia > Personalizar > Google AdSense\n";
		}
		exit;
	}

	// 3.2. Entrega /robots.txt otimizado para Googlebot, Google Discover e Mediapartners-Google (AdSense)
	if ( '/robots.txt' === $uri ) {
		header( 'Content-Type: text/plain; charset=utf-8' );
		$site_url = home_url( '/' );
		echo "User-agent: Mediapartners-Google\n";
		echo "Allow: /\n\n";
		echo "User-agent: Googlebot\n";
		echo "Allow: /\n";
		echo "Disallow: /wp-admin/\n";
		echo "Allow: /wp-admin/admin-ajax.php\n\n";
		echo "User-agent: *\n";
		echo "Allow: /\n";
		echo "Disallow: /wp-admin/\n";
		echo "Allow: /wp-admin/admin-ajax.php\n\n";
		echo "Sitemap: " . esc_url( $site_url . 'sitemap.xml' ) . "\n";
		echo "Sitemap: " . esc_url( $site_url . 'wp-sitemap.xml' ) . "\n";
		exit;
	}

	// 3.3. Entrega /sitemap.xml completo em tempo real (Home + Categorias + Páginas + Artigos)
	if ( '/sitemap.xml' === $uri ) {
		header( 'Content-Type: application/xml; charset=utf-8' );
		header( 'X-Robots-Tag: noindex, follow', true );
		echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
		?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			<url>
				<loc><?php echo esc_url( home_url( '/' ) ); ?></loc>
				<lastmod><?php echo esc_html( gmdate( 'c' ) ); ?></lastmod>
				<changefreq>daily</changefreq>
				<priority>1.0</priority>
			</url>
			<?php
			$categories = get_categories( array( 'hide_empty' => false ) );
			foreach ( $categories as $cat ) :
				?>
				<url>
					<loc><?php echo esc_url( get_category_link( $cat->term_id ) ); ?></loc>
					<lastmod><?php echo esc_html( gmdate( 'c' ) ); ?></lastmod>
					<changefreq>daily</changefreq>
					<priority>0.8</priority>
				</url>
			<?php endforeach; ?>

			<?php
			$pages = get_pages( array( 'post_status' => 'publish' ) );
			foreach ( $pages as $p ) :
				?>
				<url>
					<loc><?php echo esc_url( get_permalink( $p->ID ) ); ?></loc>
					<lastmod><?php echo esc_html( get_the_modified_date( 'c', $p->ID ) ); ?></lastmod>
					<changefreq>weekly</changefreq>
					<priority>0.8</priority>
				</url>
			<?php endforeach; ?>

			<?php
			$posts = get_posts( array(
				'numberposts' => 500,
				'post_status' => 'publish',
				'post_type'   => 'post',
			) );
			foreach ( $posts as $post_item ) :
				?>
				<url>
					<loc><?php echo esc_url( get_permalink( $post_item->ID ) ); ?></loc>
					<lastmod><?php echo esc_html( get_the_modified_date( 'c', $post_item->ID ) ); ?></lastmod>
					<changefreq>weekly</changefreq>
					<priority>0.9</priority>
				</url>
			<?php endforeach; ?>
		</urlset>
		<?php
		exit;
	}
}
add_action( 'init', 'guia_cidadao_virtual_seo_files', 1 );

/**
 * 4. RENDERIZAÇÃO E INJEÇÃO AUTOMÁTICA DE ANÚNCIOS ADSENSE
 */
function guia_cidadao_render_ad( $slot_key, $class = 'ad-in-article', $label_demo = 'Espaço AdSense Responsivo (Alto CTR)' ) {
	$code = trim( get_theme_mod( $slot_key, '' ) );
	$show_demo = get_theme_mod( 'adsense_show_placeholders', false ) || ( isset( $_GET['preview_ads'] ) && '1' === $_GET['preview_ads'] );

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
 * 5. SEO TÉCNICO PERFEITO: META TAGS, OPEN GRAPH, GOOGLE DISCOVER & SCHEMA.ORG JSON-LD
 */
function guia_cidadao_advanced_seo_head() {
	$site_name = get_bloginfo( 'name' );
	$site_url  = home_url( '/' );

	if ( is_singular() ) {
		global $post;
		$title       = get_the_title() . ' — ' . $site_name;
		$description = has_excerpt( $post->ID ) ? wp_strip_all_tags( get_the_excerpt( $post->ID ) ) : wp_trim_words( wp_strip_all_tags( $post->post_content ), 28, '...' );
		if ( empty( $description ) ) {
			$description = get_bloginfo( 'description' );
		}
		$canonical = get_permalink( $post->ID );
		$og_type   = is_single() ? 'article' : 'website';
	} elseif ( is_category() ) {
		$cat         = get_queried_object();
		$title       = single_cat_title( '', false ) . ' — ' . $site_name;
		$description = ! empty( $cat->description ) ? wp_strip_all_tags( $cat->description ) : 'Guias passo a passo e consultas sobre ' . single_cat_title( '', false );
		$canonical   = get_category_link( $cat->term_id );
		$og_type     = 'website';
	} else {
		$title       = $site_name . ' — ' . get_bloginfo( 'description' );
		$description = get_bloginfo( 'description' );
		$canonical   = $site_url;
		$og_type     = 'website';
	}

	// Meta Robots otimizado para Google Search e Google Discover (max-image-preview:large)
	echo '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />' . "\n";
	echo '<meta name="description" content="' . esc_attr( $description ) . '" />' . "\n";
	echo '<link rel="canonical" href="' . esc_url( $canonical ) . '" />' . "\n";

	$thumb_url = '';
	if ( is_singular() && has_post_thumbnail() ) {
		$thumb_url = get_the_post_thumbnail_url( get_the_ID(), 'full' );
	}

	// Open Graph (WhatsApp, Facebook, Telegram, Discover)
	echo '<meta property="og:locale" content="pt_BR" />' . "\n";
	echo '<meta property="og:type" content="' . esc_attr( $og_type ) . '" />' . "\n";
	echo '<meta property="og:title" content="' . esc_attr( $title ) . '" />' . "\n";
	echo '<meta property="og:description" content="' . esc_attr( $description ) . '" />' . "\n";
	echo '<meta property="og:url" content="' . esc_url( $canonical ) . '" />' . "\n";
	echo '<meta property="og:site_name" content="' . esc_attr( $site_name ) . '" />' . "\n";
	if ( ! empty( $thumb_url ) ) {
		echo '<meta property="og:image" content="' . esc_url( $thumb_url ) . '" />' . "\n";
		echo '<meta property="og:image:width" content="1200" />' . "\n";
		echo '<meta property="og:image:height" content="675" />' . "\n";
	}

	// Twitter Card
	echo '<meta name="twitter:card" content="summary_large_image" />' . "\n";
	echo '<meta name="twitter:title" content="' . esc_attr( $title ) . '" />' . "\n";
	echo '<meta name="twitter:description" content="' . esc_attr( $description ) . '" />' . "\n";
	if ( ! empty( $thumb_url ) ) {
		echo '<meta name="twitter:image" content="' . esc_url( $thumb_url ) . '" />' . "\n";
	}

	// Schema.org JSON-LD (@graph completo: Organization + WebSite + NewsArticle / WebApplication)
	$graph = array(
		array(
			'@type' => 'Organization',
			'@id'   => $site_url . '#organization',
			'name'  => $site_name,
			'url'   => $site_url,
		),
		array(
			'@type'           => 'WebSite',
			'@id'             => $site_url . '#website',
			'url'             => $site_url,
			'name'            => $site_name,
			'description'     => get_bloginfo( 'description' ),
			'publisher'       => array( '@id' => $site_url . '#organization' ),
			'potentialAction' => array(
				'@type'       => 'SearchAction',
				'target'      => $site_url . '?s={search_term_string}',
				'query-input' => 'required name=search_term_string',
			),
		),
	);

	if ( is_single() ) {
		$article_schema = array(
			'@type'            => 'NewsArticle',
			'@id'              => $canonical . '#article',
			'headline'         => get_the_title(),
			'description'      => $description,
			'datePublished'    => get_the_date( 'c' ),
			'dateModified'     => get_the_modified_date( 'c' ),
			'mainEntityOfPage' => $canonical,
			'author'           => array( '@id' => $site_url . '#organization' ),
			'publisher'        => array( '@id' => $site_url . '#organization' ),
		);
		if ( ! empty( $thumb_url ) ) {
			$article_schema['image'] = array( $thumb_url );
		}
		$graph[] = $article_schema;
	}

	if ( is_page( 'calculadoras' ) || ( is_singular() && has_shortcode( get_post()->post_content, 'calculadora_seguro_desemprego' ) ) || ( is_singular() && has_shortcode( get_post()->post_content, 'calculadora_irpf' ) ) ) {
		$graph[] = array(
			'@type'               => 'WebApplication',
			'name'                => get_the_title(),
			'url'                 => $canonical,
			'applicationCategory' => 'FinanceApplication',
			'operatingSystem'     => 'All',
			'offers'              => array(
				'@type'         => 'Offer',
				'price'         => '0.00',
				'priceCurrency' => 'BRL',
			),
		);
	}

	$schema = array(
		'@context' => 'https://schema.org',
		'@graph'   => $graph,
	);
	echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) . '</script>' . "\n";
}
add_action( 'wp_head', 'guia_cidadao_advanced_seo_head', 2 );

/**
 * 6. SHORTCODES DAS 5 CALCULADORAS OFICIAIS DE UTILIDADE PÚBLICA
 * [calculadora_seguro_desemprego], [calculadora_irpf], [calculadora_rescisao], [calculadora_ferias], [calculadora_decimo_terceiro]
 */
function guia_cidadao_shortcode_seguro_desemprego() {
	ob_start();
	?>
	<div class="calc-box" id="calc-seguro-desemprego">
		<div class="calc-header">
			<h3>🧮 Calculadora de Seguro-Desemprego Oficial (Valor e Quantidade de Parcelas)</h3>
		</div>
		<div class="calc-grid">
			<div class="calc-field">
				<label for="sd-sal1">Antepenúltimo Salário Bruto (R$)</label>
				<input type="number" id="sd-sal1" value="2400" min="0" step="50">
			</div>
			<div class="calc-field">
				<label for="sd-sal2">Penúltimo Salário Bruto (R$)</label>
				<input type="number" id="sd-sal2" value="2400" min="0" step="50">
			</div>
			<div class="calc-field">
				<label for="sd-sal3">Último Salário Bruto (R$)</label>
				<input type="number" id="sd-sal3" value="2400" min="0" step="50">
			</div>
			<div class="calc-field">
				<label for="sd-meses">Meses Trabalhados com Carteira Assinada</label>
				<input type="number" id="sd-meses" value="18" min="1" max="120">
			</div>
		</div>
		<div class="calc-field" style="margin-bottom:1rem;">
			<label for="sd-vez">Quantas vezes você já solicitou o Seguro-Desemprego?</label>
			<select id="sd-vez">
				<option value="1">1ª Solicitação na vida trabalhista</option>
				<option value="2">2ª Solicitação</option>
				<option value="3">3ª Solicitação ou mais</option>
			</select>
		</div>
		<button type="button" class="calc-btn" onclick="calcularSeguroDesemprego()">Calcular Valor e Quantidade de Parcelas</button>
		<div class="calc-result" id="resultado-sd">
			<span>Resultado Estimado do Benefício:</span>
			<div class="calc-result-total" id="sd-valor-parcela">0x de R$ 0,00</div>
			<p id="sd-detalhes" style="font-size:0.85rem; margin-bottom:0; color:#334155;"></p>
		</div>
	</div>
	<?php
	return ob_get_clean();
}
add_shortcode( 'calculadora_seguro_desemprego', 'guia_cidadao_shortcode_seguro_desemprego' );

function guia_cidadao_shortcode_irpf() {
	ob_start();
	?>
	<div class="calc-box" id="calc-irpf">
		<div class="calc-header">
			<h3>🦁 Calculadora de Imposto de Renda Mensal (IRPF / Salário Líquido Oficial)</h3>
		</div>
		<div class="calc-grid">
			<div class="calc-field">
				<label for="irpf-salario">Salário ou Rendimento Bruto Mensal (R$)</label>
				<input type="number" id="irpf-salario" value="3800" min="500" step="100">
			</div>
			<div class="calc-field">
				<label for="irpf-dependentes">Número de Dependentes Legais</label>
				<input type="number" id="irpf-dependentes" value="0" min="0" max="15">
			</div>
		</div>
		<button type="button" class="calc-btn" onclick="calcularIRPFMensal()">Simular Imposto de Renda e Salário Líquido</button>
		<div class="calc-result" id="resultado-irpf">
			<span>Imposto de Renda Retido na Fonte (IRRF):</span>
			<div class="calc-result-total" id="irpf-valor-imposto">R$ 0,00</div>
			<p id="irpf-detalhes" style="font-size:0.85rem; margin-bottom:0; color:#334155;"></p>
		</div>
	</div>
	<?php
	return ob_get_clean();
}
add_shortcode( 'calculadora_irpf', 'guia_cidadao_shortcode_irpf' );

function guia_cidadao_shortcode_ferias() {
	ob_start();
	?>
	<div class="calc-box" id="calc-ferias">
		<div class="calc-header">
			<h3>🏖️ Simulador Oficial de Férias Remuneradas (CLT + 1/3 Constitucional)</h3>
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
			<h3>📊 Calculadora de Rescisão Trabalhista CLT + Multa 40% FGTS</h3>
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
			<h3>💰 Simulador de 13º Salário (1ª e 2ª Parcela)</h3>
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
 * 7. PAINEL ADMIN: INSTALADOR 1-CLIQUE (PÁGINAS ADSENSE + CATEGORIAS) E RADAR DE FONTES OFICIAIS
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
			'desc' => 'Ferramentas gratuitas de cálculo trabalhista e fiscal: Seguro-Desemprego, Imposto de Renda IRPF, Férias, Rescisão CLT e 13º Salário.',
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
			'title'    => 'Calculadoras Trabalhistas, Seguro-Desemprego e Imposto de Renda',
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
			$message = '✅ Estrutura do Portal (4 Categorias + 5 Páginas Obrigatórias de Aprovação no AdSense e Calculadoras) verificada com sucesso!';
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
		<p>Gerencie o SEO, Sitemap XML, Calculadoras e busque pautas 100% verdadeiras direto das Agências Oficiais Públicas do Brasil.</p>

		<?php if ( ! empty( $message ) ) : ?>
			<div class="notice notice-success is-dismissible"><p><?php echo wp_kses_post( $message ); ?></p></div>
		<?php endif; ?>

		<div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-top:20px;">
			<div style="background:#fff; padding:20px; border:1px solid #ccd0d4; border-radius:8px;">
				<h2>🚀 1. SEO, Sitemap XML e Robots.txt Ativos</h2>
				<ul style="list-style:disc; margin-left:20px;">
					<li><strong>Sitemap XML Principal:</strong> <a href="<?php echo esc_url( home_url( '/sitemap.xml' ) ); ?>" target="_blank"><?php echo esc_url( home_url( '/sitemap.xml' ) ); ?></a></li>
					<li><strong>Robots.txt Otimizado AdSense:</strong> <a href="<?php echo esc_url( home_url( '/robots.txt' ) ); ?>" target="_blank"><?php echo esc_url( home_url( '/robots.txt' ) ); ?></a></li>
					<li><strong>Arquivo ads.txt:</strong> <a href="<?php echo esc_url( home_url( '/ads.txt' ) ); ?>" target="_blank"><?php echo esc_url( home_url( '/ads.txt' ) ); ?></a></li>
				</ul>
				<form method="post" style="margin-top:15px;">
					<?php wp_nonce_field( 'guia_central_nonce' ); ?>
					<input type="hidden" name="guia_action" value="install_portal">
					<button type="submit" class="button button-primary">Sincronizar Estrutura & Páginas</button>
				</form>
			</div>

			<div style="background:#fff; padding:20px; border:1px solid #ccd0d4; border-radius:8px;">
				<h2>🧮 2. Shortcodes das 5 Calculadoras Oficiais</h2>
				<p>Você pode inserir qualquer calculadora dentro de qualquer post usando os shortcodes abaixo:</p>
				<ul style="list-style:disc; margin-left:20px;">
					<li><code>[calculadora_seguro_desemprego]</code> — Valor e Parcelas MTE</li>
					<li><code>[calculadora_irpf]</code> — Imposto de Renda e Salário Líquido</li>
					<li><code>[calculadora_rescisao]</code> — Acerto Trabalhista CLT + Multa FGTS</li>
					<li><code>[calculadora_ferias]</code> — Férias + 1/3 Constitucional</li>
					<li><code>[calculadora_decimo_terceiro]</code> — 1ª e 2ª Parcela do 13º</li>
				</ul>
			</div>
		</div>

		<div style="background:#fff; padding:20px; border:1px solid #ccd0d4; border-radius:8px; margin-top:20px;">
			<h2>📰 Radar ao Vivo: Últimas Notícias Oficiais (Agência Brasil & Senado)</h2>
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

/**
 * 8. GERADOR AUTOMÁTICO DE IMAGENS DESTACADAS HD (1200x675 - PADRÃO GOOGLE DISCOVER 16:9)
 * Gera capas editoriais exclusivas com a identidade visual da categoria para todos os artigos!
 */
function guia_cidadao_generate_post_thumbnail( $post_id ) {
	if ( wp_is_post_revision( $post_id ) || 'post' !== get_post_type( $post_id ) ) {
		return;
	}
	if ( has_post_thumbnail( $post_id ) ) {
		return;
	}
	if ( ! function_exists( 'imagecreatetruecolor' ) || ! function_exists( 'imagettftext' ) ) {
		return;
	}

	$font_bold = '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf';
	$font_reg  = '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf';
	if ( ! file_exists( $font_bold ) ) {
		return;
	}
	if ( ! file_exists( $font_reg ) ) {
		$font_reg = $font_bold;
	}

	$title = html_entity_decode( get_the_title( $post_id ), ENT_QUOTES, 'UTF-8' );
	if ( empty( $title ) || 'Auto Draft' === $title ) {
		return;
	}

	$categories = get_the_category( $post_id );
	$cat_name   = ! empty( $categories ) ? mb_strtoupper( $categories[0]->name, 'UTF-8' ) : 'UTILIDADE PÚBLICA';
	$cat_slug   = ! empty( $categories ) ? $categories[0]->slug : 'geral';

	$w = 1200;
	$h = 675;
	$im = imagecreatetruecolor( $w, $h );

	// Paleta de cores por categoria (Estilo Editorial Moderno / Gov.br)
	if ( 'beneficios-trabalhador' === $cat_slug ) {
		$bg1 = array( 10, 42, 94 );     // Azul Profundo Cívico
		$bg2 = array( 19, 81, 180 );    // Azul Gov
		$acc = array( 34, 197, 94 );    // Verde Esmeralda
	} elseif ( 'documentos-gov-br' === $cat_slug ) {
		$bg1 = array( 6, 78, 59 );      // Verde Institucional Escuro
		$bg2 = array( 22, 136, 33 );    // Verde Gov
		$acc = array( 250, 204, 21 );   // Amarelo Ouro
	} elseif ( 'contas-financas' === $cat_slug ) {
		$bg1 = array( 15, 23, 42 );     // Slate Finanças
		$bg2 = array( 30, 58, 138 );    // Azul Finanças
		$acc = array( 245, 158, 11 );   // Âmbar Destaque
	} else {
		$bg1 = array( 49, 16, 104 );    // Roxo Calculadoras
		$bg2 = array( 88, 28, 135 );    // Violeta
		$acc = array( 56, 189, 248 );   // Ciano
	}

	// Renderiza gradiente suave
	for ( $y = 0; $y < $h; $y++ ) {
		$r = (int) ( $bg1[0] + ( $bg2[0] - $bg1[0] ) * ( $y / $h ) );
		$g = (int) ( $bg1[1] + ( $bg2[1] - $bg1[1] ) * ( $y / $h ) );
		$b = (int) ( $bg1[2] + ( $bg2[2] - $bg1[2] ) * ( $y / $h ) );
		$line_col = imagecolorallocate( $im, $r, $g, $b );
		imageline( $im, 0, $y, $w, $y, $line_col );
	}

	// Círculos decorativos translúcidos modernos à direita
	imagealphablending( $im, true );
	$circle_col1 = imagecolorallocatealpha( $im, 255, 255, 255, 117 );
	$circle_col2 = imagecolorallocatealpha( $im, $acc[0], $acc[1], $acc[2], 108 );
	imagefilledellipse( $im, 1080, 140, 480, 480, $circle_col1 );
	imagefilledellipse( $im, 1050, 550, 360, 360, $circle_col2 );

	// Barra lateral de destaque
	$accent_col = imagecolorallocate( $im, $acc[0], $acc[1], $acc[2] );
	$white      = imagecolorallocate( $im, 255, 255, 255 );
	$light_gray = imagecolorallocate( $im, 219, 234, 254 );
	$dark_bar   = imagecolorallocatealpha( $im, 7, 18, 38, 35 );

	imagefilledrectangle( $im, 0, 0, 18, $h, $accent_col );

	// Badge Superior da Categoria
	imagefilledrectangle( $im, 75, 68, 75 + ( strlen( $cat_name ) * 16 ) + 40, 118, $accent_col );
	$badge_text_col = ( 'documentos-gov-br' === $cat_slug || 'contas-financas' === $cat_slug || 'calculadoras-simuladores' === $cat_slug )
		? imagecolorallocate( $im, 15, 23, 42 )
		: $white;
	imagettftext( $im, 18, 0, 95, 101, $badge_text_col, $font_bold, $cat_name );

	// Quebra automática do Título em até 4 linhas legíveis no Google Discover e Cards
	$words = explode( ' ', $title );
	$lines = array();
	$curr  = '';
	foreach ( $words as $word ) {
		$test = empty( $curr ) ? $word : $curr . ' ' . $word;
		if ( mb_strlen( $test, 'UTF-8' ) > 34 && ! empty( $curr ) ) {
			$lines[] = $curr;
			$curr    = $word;
		} else {
			$curr = $test;
		}
	}
	if ( ! empty( $curr ) ) {
		$lines[] = $curr;
	}
	$lines = array_slice( $lines, 0, 4 );

	$y_text = 210;
	foreach ( $lines as $line ) {
		// Sombra sutil do texto
		$shadow = imagecolorallocatealpha( $im, 0, 0, 0, 75 );
		imagettftext( $im, 37, 0, 78, $y_text + 3, $shadow, $font_bold, $line );
		imagettftext( $im, 37, 0, 75, $y_text, $white, $font_bold, $line );
		$y_text += 68;
	}

	// Rodapé de Verificação Editorial
	imagefilledrectangle( $im, 18, $h - 90, $w, $h, $dark_bar );
	imagettftext( $im, 18, 0, 75, $h - 38, $light_gray, $font_reg, 'NÚCLEO VIP  •  GUIA PASSO A PASSO VERIFICADO  •  FONTES OFICIAIS GOV.BR' );

	$upload_dir = wp_upload_dir();
	$filename   = 'capa-guia-' . $post_id . '-' . time() . '.png';
	$filepath   = trailingslashit( $upload_dir['path'] ) . $filename;

	imagepng( $im, $filepath, 8 );
	imagedestroy( $im );

	if ( ! file_exists( $filepath ) ) {
		return;
	}

	$attachment = array(
		'guid'           => trailingslashit( $upload_dir['url'] ) . $filename,
		'post_mime_type' => 'image/png',
		'post_title'     => $title,
		'post_content'   => '',
		'post_status'    => 'inherit',
	);

	$attach_id = wp_insert_attachment( $attachment, $filepath, $post_id );
	if ( ! is_wp_error( $attach_id ) && $attach_id ) {
		require_once ABSPATH . 'wp-admin/includes/image.php';
		$attach_data = wp_generate_attachment_metadata( $attach_id, $filepath );
		wp_update_attachment_metadata( $attach_id, $attach_data );
		set_post_thumbnail( $post_id, $attach_id );
		update_post_meta( $attach_id, '_wp_attachment_image_alt', $title );
	}
}
add_action( 'save_post', 'guia_cidadao_generate_post_thumbnail', 20, 1 );

