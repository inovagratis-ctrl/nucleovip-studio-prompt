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
	add_theme_support( 'custom-logo', array(
		'height'      => 210,
		'width'       => 960,
		'flex-height' => true,
		'flex-width'  => true,
	) );
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
	wp_enqueue_style( 'guia-cidadao-style', get_stylesheet_uri(), array(), '2.3.0' );
	wp_enqueue_script( 'guia-cidadao-main', get_template_directory_uri() . '/assets/js/main.js', array(), '2.2.0', true );
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
function guia_cidadao_render_ad( $slot_key, $class = 'ad-in-article', $label_demo = '' ) {
	$code = trim( get_theme_mod( $slot_key, '' ) );
	if ( empty( $code ) ) {
		return '';
	}

	ob_start();
	?>
	<div class="ad-slot-wrapper <?php echo esc_attr( $class ); ?>" aria-label="Publicidade">
		<span class="ad-label">Publicidade</span>
		<?php echo $code; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
	<?php
	return ob_get_clean();
}

function guia_cidadao_inject_in_content_ads( $content ) {
	if ( ! is_single() || is_admin() ) {
		return $content;
	}

	$ad_p2  = guia_cidadao_render_ad( 'adsense_p2_code', 'ad-in-article' );
	$ad_p5  = guia_cidadao_render_ad( 'adsense_p5_code', 'ad-in-article' );
	$ad_end = guia_cidadao_render_ad( 'adsense_end_code', 'ad-in-article' );

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

	echo '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />' . "\n";
	echo '<meta name="description" content="' . esc_attr( $description ) . '" />' . "\n";
	echo '<link rel="canonical" href="' . esc_url( $canonical ) . '" />' . "\n";

	$thumb_url = '';
	if ( is_singular() && has_post_thumbnail() ) {
		$thumb_url = get_the_post_thumbnail_url( get_the_ID(), 'full' );
	}

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

	echo '<meta name="twitter:card" content="summary_large_image" />' . "\n";
	echo '<meta name="twitter:title" content="' . esc_attr( $title ) . '" />' . "\n";
	echo '<meta name="twitter:description" content="' . esc_attr( $description ) . '" />' . "\n";
	if ( ! empty( $thumb_url ) ) {
		echo '<meta name="twitter:image" content="' . esc_url( $thumb_url ) . '" />' . "\n";
	}

	$graph = array(
		array(
			'@type' => 'Organization',
			'@id'   => $site_url . '#organization',
			'name'  => $site_name,
			'url'   => $site_url,
			'email' => 'contato@nucleovip.com.br',
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
			'author'           => array(
				'@type' => 'Person',
				'name'  => 'Eusimar Teixeira (Editor Responsável)',
				'url'   => home_url( '/sobre-nos/' ),
			),
			'publisher'        => array( '@id' => $site_url . '#organization' ),
		);
		if ( ! empty( $thumb_url ) ) {
			$article_schema['image'] = array( $thumb_url );
		}
		$graph[] = $article_schema;
	}

	if ( is_page( 'calculadoras' ) || ( is_singular() && has_shortcode( get_post()->post_content, 'calculadora_seguro_desemprego' ) ) || ( is_singular() && has_shortcode( get_post()->post_content, 'calculadora_irpf' ) ) || ( is_singular() && has_shortcode( get_post()->post_content, 'calculadora_decimo_terceiro' ) ) ) {
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
 * 6. SHORTCODES DAS 5 CALCULADORAS OFICIAIS DE UTILIDADE PÚBLICA (TABELAS 2026)
 */
function guia_cidadao_shortcode_seguro_desemprego() {
	ob_start();
	?>
	<div class="calc-box" id="calc-seguro-desemprego">
		<div class="calc-header">
			<h3>🛡️ Simulador de Seguro-Desemprego 2026 (Estimativa de Valor e Parcelas)</h3>
			<small style="color:#475569;">Vigência 2026: Piso R$ 1.621,00 e Teto R$ 2.588,41 (Portaria Interministerial MPS/MF nº 13, de 09/01/2026 e Lei nº 7.998/1990)</small>
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
		<button type="button" class="calc-btn" onclick="calcularSeguroDesemprego()">Simular Estimativa de Valor e Parcelas</button>
		<div class="calc-result" id="resultado-sd">
			<span>Estimativa do Benefício:</span>
			<div class="calc-result-total" id="sd-valor-parcela">0 parcelas de R$ 0,00</div>
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
			<h3>🦁 Simulador de Imposto de Renda Mensal 2026 (IRRF e Salário Líquido)</h3>
			<small style="color:#475569;">Vigência 2026: Tabela INSS Portaria MPS/MF nº 13/2026 + Isenção IRRF até R$ 5.000 (Lei nº 15.270/2025)</small>
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
		<button type="button" class="calc-btn" onclick="calcularIRPFMensal()">Simular Estimativa de IRRF e Salário Líquido</button>
		<div class="calc-result" id="resultado-irpf">
			<span>Estimativa de Imposto de Renda Retido na Fonte (IRRF):</span>
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
			<h3>🏖️ Simulador de Férias Remuneradas 2026 (CLT + 1/3 Constitucional)</h3>
			<small style="color:#475569;">Vigência 2026: INSS Portaria MPS/MF nº 13/2026 + Isenção IRRF até R$ 5.000 (Lei nº 15.270/2025)</small>
		</div>
		<div class="calc-grid">
			<div class="calc-field">
				<label for="ferias-salario">Salário Bruto Mensal Fixo (R$)</label>
				<input type="number" id="ferias-salario" value="2800" min="500" step="50">
			</div>
			<div class="calc-field">
				<label for="ferias-dias">Dias de Gozo de Férias</label>
				<select id="ferias-dias">
					<option value="30">30 dias (Completo)</option>
					<option value="20">20 dias (+ 10 dias vendidos / Abono Pecuniário)</option>
					<option value="15">15 dias</option>
				</select>
			</div>
		</div>
		<div class="calc-field" style="margin-bottom:1rem;">
			<label for="ferias-dependentes">Número de Dependentes Legais (para cálculo de IRRF)</label>
			<input type="number" id="ferias-dependentes" value="0" min="0" max="15">
		</div>
		<button type="button" class="calc-btn" onclick="calcularFeriasCLT()">Calcular Estimativa Líquida das Férias</button>
		<div class="calc-result" id="resultado-ferias">
			<span>Estimativa Líquida a Receber:</span>
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
			<h3>📊 Simulador de Rescisão Trabalhista CLT 2026 + Multa do FGTS</h3>
			<small style="color:#475569;">Vigência 2026: Tabela INSS Portaria MPS/MF nº 13, de 09/01/2026 e Art. 477 da CLT</small>
		</div>
		<div class="calc-grid">
			<div class="calc-field">
				<label for="resc-salario">Último Salário Bruto Fixo (R$)</label>
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
				<label for="resc-motivo">Modalidade de Desligamento</label>
				<select id="resc-motivo">
					<option value="sem_justa_causa">Demissão Sem Justa Causa (Com Multa 40% FGTS)</option>
					<option value="pedido_demissao">Pedido de Demissão pelo Trabalhador</option>
					<option value="acordo">Acordo Comum Art. 484-A (Multa 20% FGTS)</option>
				</select>
			</div>
		</div>
		<button type="button" class="calc-btn" onclick="calcularRescisaoCLT()">Simular Estimativa de Acerto Rescisório</button>
		<div class="calc-result" id="resultado-rescisao">
			<span>Estimativa Líquida da Rescisão:</span>
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
			<h3>💰 Simulador de 13º Salário 2026 (Estimativa de 1ª e 2ª Parcela)</h3>
			<small style="color:#475569;">Vigência 2026: INSS Portaria MPS/MF nº 13/2026 • Isenção IRRF até R$ 5.000 (Lei nº 15.270/2025) • Lei nº 4.749/1965</small>
		</div>
		<div class="calc-grid">
			<div class="calc-field">
				<label for="dec-salario">Salário Bruto Mensal Fixo (R$)</label>
				<input type="number" id="dec-salario" value="3000" min="500" step="50">
			</div>
			<div class="calc-field">
				<label for="dec-meses">Meses Trabalhados no Ano (1 a 12)</label>
				<input type="number" id="dec-meses" value="12" min="1" max="12">
			</div>
		</div>
		<div class="calc-field" style="margin-bottom:1rem;">
			<label for="dec-dependentes">Número de Dependentes Legais (para cálculo de IRRF na 2ª parcela)</label>
			<input type="number" id="dec-dependentes" value="0" min="0" max="15">
		</div>
		<button type="button" class="calc-btn" onclick="calcularDecimoCLT()">Calcular Estimativa da 1ª e 2ª Parcelas</button>
		<div class="calc-result" id="resultado-decimo">
			<span>Estimativa Total Líquida do 13º Salário:</span>
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
 * 8. GERADOR AUTOMÁTICO DE FOTOGRAFIAS EDITORIAIS EM WEBP (1200x675 - PADRÃO 16:9 LEVE, ZERO TEXTO NA IMAGEM)
 * - Associa cada artigo a uma fotografia real de alta resolução específica do seu assunto (Dólar, Apostas, MEI, CNH, 13º, FGTS, INSS, etc.)
 * - Redimensiona para 1200x675px (16:9) e salva em formato WebP leve
 * - Define texto alternativo (alt) que descreve fielmente a fotografia e o tema do cartão, sem repetir o título inteiro
 */
function guia_cidadao_get_topic_photo_and_alt( $title, $cat_slug = '' ) {
	$lower = mb_strtolower( $title, 'UTF-8' );

	if ( false !== mb_strpos( $lower, 'dólar' ) || false !== mb_strpos( $lower, 'câmbio' ) ) {
		return array(
			'url' => 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=1200&q=80',
			'alt' => 'Fotografia de cédulas de dólar norte-americano sobre mesa representando cotação cambial',
		);
	}
	if ( false !== mb_strpos( $lower, 'bets' ) || false !== mb_strpos( $lower, 'apostas' ) || false !== mb_strpos( $lower, 'apostador' ) ) {
		return array(
			'url' => 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
			'alt' => 'Pessoa utilizando aplicativo financeiro e transação digital no smartphone',
		);
	}
	if ( false !== mb_strpos( $lower, 'mei' ) || false !== mb_strpos( $lower, 'empreendedor' ) || false !== mb_strpos( $lower, 'dasn' ) ) {
		return array(
			'url' => 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80',
			'alt' => 'Microempreendedor conferindo notas fiscais e guia mensal de pagamento no balcão de trabalho',
		);
	}
	if ( false !== mb_strpos( $lower, 'cnh' ) || false !== mb_strpos( $lower, 'trânsito' ) || false !== mb_strpos( $lower, 'condutor' ) ) {
		return array(
			'url' => 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80',
			'alt' => 'Motorista ao volante de automóvel representando habilitação e Carteira Digital de Trânsito',
		);
	}
	if ( false !== mb_strpos( $lower, '13º' ) || false !== mb_strpos( $lower, 'décimo' ) ) {
		return array(
			'url' => 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
			'alt' => 'Calculadora financeira e demonstrativo de folha de pagamento sobre mesa de escritório',
		);
	}
	if ( false !== mb_strpos( $lower, 'rescisão' ) ) {
		return array(
			'url' => 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
			'alt' => 'Assinatura de documento contratual e conferência de verbas rescisórias trabalhistas',
		);
	}
	if ( false !== mb_strpos( $lower, 'férias' ) ) {
		return array(
			'url' => 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80',
			'alt' => 'Calendário mensal sobre mesa planejando período de descanso de férias remuneradas',
		);
	}
	if ( false !== mb_strpos( $lower, 'seguro-desemprego' ) ) {
		return array(
			'url' => 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80',
			'alt' => 'Trabalhador consultando carteira de trabalho e requerimento de benefício no computador',
		);
	}
	if ( false !== mb_strpos( $lower, 'imposto de renda' ) || false !== mb_strpos( $lower, 'irpf' ) ) {
		return array(
			'url' => 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80',
			'alt' => 'Planilha de apuração tributária, óculos e calculadora para simulação de Imposto de Renda',
		);
	}
	if ( false !== mb_strpos( $lower, 'fgts' ) ) {
		return array(
			'url' => 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80',
			'alt' => 'Moedas e reserva financeira representando saldo acumulado do Fundo de Garantia',
		);
	}
	if ( false !== mb_strpos( $lower, 'bpc' ) || false !== mb_strpos( $lower, 'loas' ) ) {
		return array(
			'url' => 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=1200&q=80',
			'alt' => 'Casal de idosos sorrindo em casa representando amparo assistencial e previdenciário',
		);
	}
	if ( false !== mb_strpos( $lower, 'inss' ) || false !== mb_strpos( $lower, 'cnis' ) ) {
		return array(
			'url' => 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
			'alt' => 'Pessoa consultando extrato previdenciário e serviços digitais na tela do notebook',
		);
	}
	if ( false !== mb_strpos( $lower, 'bolsa família' ) || false !== mb_strpos( $lower, 'cadúnico' ) ) {
		return array(
			'url' => 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
			'alt' => 'Família reunida representando programas sociais de transferência de renda e proteção à infância',
		);
	}
	if ( false !== mb_strpos( $lower, 'pis' ) || false !== mb_strpos( $lower, 'pasep' ) || false !== mb_strpos( $lower, 'abono' ) ) {
		return array(
			'url' => 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
			'alt' => 'Profissionais no ambiente de trabalho formal representando direito ao abono salarial anual',
		);
	}
	if ( false !== mb_strpos( $lower, 'valores a receber' ) || false !== mb_strpos( $lower, 'banco central' ) ) {
		return array(
			'url' => 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=1200&q=80',
			'alt' => 'Consulta bancária pelo celular e cartão representando resgate de saldo financeiro',
		);
	}
	if ( false !== mb_strpos( $lower, 'energia' ) || false !== mb_strpos( $lower, 'conta de luz' ) || false !== mb_strpos( $lower, 'tarifa social' ) ) {
		return array(
			'url' => 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
			'alt' => 'Rede de distribuição de energia elétrica ao entardecer representando desconto na fatura de luz',
		);
	}
	if ( false !== mb_strpos( $lower, 'gov.br' ) || false !== mb_strpos( $lower, 'prata ou ouro' ) ) {
		return array(
			'url' => 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
			'alt' => 'Smartphone exibindo tela de autenticação digital segura e validação biométrica',
		);
	}
	if ( false !== mb_strpos( $lower, 'cpf' ) || false !== mb_strpos( $lower, 'certidão' ) ) {
		return array(
			'url' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
			'alt' => 'Emissão de certidão de regularidade fiscal e conferência de cadastro em computador',
		);
	}
	return array(
		'url' => 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
		'alt' => 'Cidadão apresentando documentação pessoal em atendimento de serviço público',
	);
}

function guia_cidadao_generate_post_thumbnail( $post_id ) {
	if ( wp_is_post_revision( $post_id ) || 'post' !== get_post_type( $post_id ) ) {
		return;
	}
	if ( has_post_thumbnail( $post_id ) ) {
		return;
	}
	if ( ! function_exists( 'imagecreatetruecolor' ) ) {
		return;
	}

	$title = html_entity_decode( get_the_title( $post_id ), ENT_QUOTES, 'UTF-8' );
	if ( empty( $title ) || 'Auto Draft' === $title ) {
		return;
	}

	$categories = get_the_category( $post_id );
	$cat_slug   = ! empty( $categories ) ? $categories[0]->slug : 'geral';
	$photo_info = guia_cidadao_get_topic_photo_and_alt( $title, $cat_slug );

	$response = wp_remote_get( $photo_info['url'], array( 'timeout' => 15 ) );
	if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
		return;
	}

	$img_bytes = wp_remote_retrieve_body( $response );
	$src_im    = @imagecreatefromstring( $img_bytes );
	if ( ! $src_im ) {
		return;
	}

	$src_w = imagesx( $src_im );
	$src_h = imagesy( $src_im );
	$dst_w = 1200;
	$dst_h = 675;

	// Recorte centralizado proporcional 16:9 (1200x675)
	$src_ratio = $src_w / $src_h;
	$dst_ratio = $dst_w / $dst_h;
	if ( $src_ratio > $dst_ratio ) {
		$crop_h = $src_h;
		$crop_w = (int) ( $src_h * $dst_ratio );
		$crop_x = (int) ( ( $src_w - $crop_w ) / 2 );
		$crop_y = 0;
	} else {
		$crop_w = $src_w;
		$crop_h = (int) ( $src_w / $dst_ratio );
		$crop_x = 0;
		$crop_y = (int) ( ( $src_h - $crop_h ) / 2 );
	}

	$dst_im = imagecreatetruecolor( $dst_w, $dst_h );
	imagecopyresampled( $dst_im, $src_im, 0, 0, $crop_x, $crop_y, $dst_w, $dst_h, $crop_w, $crop_h );
	imagedestroy( $src_im );

	$upload_dir = wp_upload_dir();
	$use_webp   = function_exists( 'imagewebp' );
	$ext        = $use_webp ? '.webp' : '.jpg';
	$mime       = $use_webp ? 'image/webp' : 'image/jpeg';
	$filename   = 'foto-editorial-' . $post_id . '-' . time() . $ext;
	$filepath   = trailingslashit( $upload_dir['path'] ) . $filename;

	if ( $use_webp ) {
		imagewebp( $dst_im, $filepath, 82 );
	} else {
		imagejpeg( $dst_im, $filepath, 85 );
	}
	imagedestroy( $dst_im );

	if ( ! file_exists( $filepath ) ) {
		return;
	}

	$attachment = array(
		'guid'           => trailingslashit( $upload_dir['url'] ) . $filename,
		'post_mime_type' => $mime,
		'post_title'     => $photo_info['alt'],
		'post_content'   => '',
		'post_status'    => 'inherit',
	);

	$attach_id = wp_insert_attachment( $attachment, $filepath, $post_id );
	if ( ! is_wp_error( $attach_id ) && $attach_id ) {
		require_once ABSPATH . 'wp-admin/includes/image.php';
		$attach_data = wp_generate_attachment_metadata( $attach_id, $filepath );
		wp_update_attachment_metadata( $attach_id, $attach_data );
		set_post_thumbnail( $post_id, $attach_id );
		update_post_meta( $attach_id, '_wp_attachment_image_alt', $photo_info['alt'] );
	}
}
add_action( 'save_post', 'guia_cidadao_generate_post_thumbnail', 20, 1 );

/**
 * 9. INFOGRÁFICO RESPONSIVO E ACESSÍVEL: "CONSULTE COM SEGURANÇA" (KIT VISUAL NÚCLEO VIP)
 */
function guia_cidadao_shortcode_infografico_seguranca() {
	ob_start();
	?>
	<aside class="nv-consulta-segura" aria-label="Infográfico com três recomendações para consultar serviços públicos digitais com segurança">
		<div class="nv-cs-top">
			<div class="nv-cs-brand">
				<span class="nv-cs-badge" aria-hidden="true">NV</span>
				<span>NÚCLEO VIP · GUIA DO CIDADÃO</span>
			</div>
			<div class="nv-cs-hero">
				<span class="nv-cs-label">ORIENTAÇÃO AO CIDADÃO</span>
				<h3 class="nv-cs-title">Consulte com segurança</h3>
				<p class="nv-cs-subtitle">Use nossos guias para encontrar o caminho — e confirme informações e acessos nos canais oficiais.</p>
			</div>
		</div>
		<div class="nv-cs-steps" role="list" aria-label="Três passos para uma consulta segura">
			<div class="nv-cs-card" role="listitem">
				<div class="nv-cs-num" aria-hidden="true">01</div>
				<h4>Encontre o serviço</h4>
				<p>Localize o guia relacionado ao benefício, documento ou consulta que você precisa.</p>
			</div>
			<div class="nv-cs-card" role="listitem">
				<div class="nv-cs-num" aria-hidden="true">02</div>
				<h4>Confira a fonte</h4>
				<p>Use os links oficiais indicados no guia e confira o endereço do site antes de entrar.</p>
			</div>
			<div class="nv-cs-card" role="listitem">
				<div class="nv-cs-num" aria-hidden="true">03</div>
				<h4>Proteja seus dados</h4>
				<p>Não informe senhas ou códigos de acesso em formulários de terceiros. Não pague para “liberar” uma consulta oficial.</p>
			</div>
		</div>
		<div class="nv-cs-rule">
			<strong>Importante:</strong> o Núcleo VIP é um portal independente. Não representa órgãos públicos nem solicita senha Gov.br, dados bancários ou pagamento para liberar benefícios.
		</div>
		<div class="nv-cs-footer">
			<span class="nv-cs-footbrand">Núcleo VIP — Guia do Cidadão</span>
			<span>Informação independente · Consulte sempre os canais oficiais</span>
		</div>
	</aside>
	<?php
	return ob_get_clean();
}
add_shortcode( 'infografico_consulta_segura', 'guia_cidadao_shortcode_infografico_seguranca' );

/**
 * 10. ROTEIRO INTERATIVO "ONDE RESOLVER?" (TRIAGEM DE ATENDIMENTO E LINKS OFICIAIS)
 */
function guia_cidadao_shortcode_onde_resolver() {
	$url_cadunico = get_permalink( 119 ) ? get_permalink( 119 ) : get_permalink( 11 );
	$url_inss     = get_permalink( 10 );
	$url_cin      = get_permalink( 12 );
	$url_cpf      = get_permalink( 14 );
	$url_fgts     = get_permalink( 9 );
	$url_cnh      = get_permalink( 25 );
	$url_mei      = get_permalink( 26 );
	$url_svr      = get_permalink( 15 );

	ob_start();
	?>
	<div class="calc-box" id="box-onde-resolver" style="border-left: 5px solid #178b4b;">
		<div class="calc-header">
			<h3>🧭 Roteiro Prático “Onde Resolver?” — Canais Oficiais e Documentos</h3>
			<small style="color:#475569;">Escolha uma tarefa abaixo para ver onde ir, quais documentos separar e o link oficial seguro (.gov.br)</small>
		</div>
		<div class="calc-field" style="margin-bottom:0.85rem;">
			<label for="or-tarefa">Qual serviço você precisa resolver?</label>
			<select id="or-tarefa" onchange="mostrarRoteiroOndeResolver()">
				<option value="cadunico">Atualizar CadÚnico ou desbloquear Bolsa Família no CRAS</option>
				<option value="inss_bpc">Consultar benefício do INSS, extrato CNIS ou pedir BPC/LOAS</option>
				<option value="cin_rg">Emitir 1ª via gratuita da Nova Carteira de Identidade (CIN)</option>
				<option value="cpf_receita">Regularizar CPF suspenso ou emitir Certidão Negativa na Receita</option>
				<option value="fgts_seguro">Consultar saldo do FGTS ou dar entrada no Seguro-Desemprego</option>
				<option value="cnh_detran">Baixar CNH Digital (CDT) ou consultar pontos da carteira</option>
				<option value="mei_das">Emitir boleto mensal DAS-MEI ou entregar Declaração Anual</option>
				<option value="svr_bc">Consultar Dinheiro Esquecido no Sistema Valores a Receber (Banco Central)</option>
			</select>
		</div>
		<div class="calc-result" id="resultado-onde-resolver" style="display:block; background:#ffffff; margin-top:0.5rem; margin-bottom:0.85rem;"></div>
		<button type="button" class="calc-btn" id="btn-abrir-guia-onde-resolver" onclick="abrirGuiaSelecionadoOndeResolver()">Abrir Guia Passo a Passo da Tarefa Selecionada &rarr;</button>
	</div>
	<script>
	var dadosOndeResolver = {
		'cadunico': {
			orgao: 'CRAS (Centro de Referência de Assistência Social) da prefeitura ou Posto do Cadastro Único',
			docs: 'CPF ou Título de Eleitor do Responsável Familiar + documento com foto e CPF/Certidão de TODOS os moradores da casa + comprovante de endereço recente e declaração escolar das crianças.',
			canalUrl: 'https://meucadunico.cidadania.gov.br/',
			canalNome: 'Portal/App Meu CadÚnico (gov.br)',
			guiaUrl: <?php echo wp_json_encode( $url_cadunico ); ?>,
			guiaNome: 'Abrir Guia Prático do CadÚnico e CRAS →'
		},
		'inss_bpc': {
			orgao: 'Instituto Nacional do Seguro Social (Meu INSS ou Central Telefônica 135)',
			docs: 'Conta Gov.br (nível Prata ou Ouro para serviços completos), CPF, documentos médicos/laudos (para perícia) e CadÚnico atualizado há menos de 2 anos (no caso de BPC/LOAS).',
			canalUrl: 'https://meu.inss.gov.br/',
			canalNome: 'Portal Oficial Meu INSS (meu.inss.gov.br)',
			guiaUrl: <?php echo wp_json_encode( $url_inss ); ?>,
			guiaNome: 'Abrir Guia Passo a Passo do Meu INSS →'
		},
		'cin_rg': {
			orgao: 'Instituto de Identificação Civil do seu Estado (Poupatempo, DETRAN, SAC, Vapt Vupt, Tudo Fácil)',
			docs: 'CPF regularizado na Receita Federal + Certidão de Nascimento (se solteiro) ou Certidão de Casamento (original ou cópia autenticada legível). A 1ª via em papel e digital é gratuita por lei.',
			canalUrl: 'https://www.gov.br/governodigital/pt-br/identidade/identificacao-do-cidadao-e-carteira-de-identidade-nacional',
			canalNome: 'Página Oficial da CIN no Gov.br',
			guiaUrl: <?php echo wp_json_encode( $url_cin ); ?>,
			guiaNome: 'Abrir Guia da Nova Carteira de Identidade (CIN) →'
		},
		'cpf_receita': {
			orgao: 'Secretaria Especial da Receita Federal do Brasil (Atendimento Virtual e-CAC / Portal RFB)',
			docs: 'Número do CPF, data de nascimento, nome da mãe e Título de Eleitor (para regularização cadastral online gratuita).',
			canalUrl: 'https://servicos.receita.fazenda.gov.br/Servicos/CPF/ConsultaSituacao/ConsultaPublica.asp',
			canalNome: 'Consulta Oficial de CPF na Receita Federal',
			guiaUrl: <?php echo wp_json_encode( $url_cpf ); ?>,
			guiaNome: 'Abrir Guia de Regularização de CPF e Certidão →'
		},
		'fgts_seguro': {
			orgao: 'Caixa Econômica Federal (App FGTS) e Ministério do Trabalho (App Carteira de Trabalho Digital)',
			docs: 'Acesso com login Gov.br; para Seguro-Desemprego, tenha o número do Requerimento entregue pelo empregador (10 dígitos) e o TRCT.',
			canalUrl: 'https://www.gov.br/pt-br/servicos/solicitar-o-seguro-desemprego',
			canalNome: 'Serviço Oficial Seguro-Desemprego / FGTS no Gov.br',
			guiaUrl: <?php echo wp_json_encode( $url_fgts ); ?>,
			guiaNome: 'Abrir Guia do FGTS e Saque-Aniversário →'
		},
		'cnh_detran': {
			orgao: 'SENATRAN / Ministério dos Transportes (Aplicativo Carteira Digital de Trânsito — CDT)',
			docs: 'Conta Gov.br nível Prata ou Ouro + CNH física que possua QR Code impresso no verso.',
			canalUrl: 'https://portalservicos.senatran.serpro.gov.br/',
			canalNome: 'Portal de Serviços SENATRAN (gov.br)',
			guiaUrl: <?php echo wp_json_encode( $url_cnh ); ?>,
			guiaNome: 'Abrir Guia da CNH Digital no Celular →'
		},
		'mei_das': {
			orgao: 'Portal do Empreendedor / Simples Nacional (Receita Federal)',
			docs: 'Número do CNPJ MEI e CPF do titular. Para a declaração anual (DASN-SIMEI), o relatório de faturamento bruto do ano anterior.',
			canalUrl: 'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor',
			canalNome: 'Portal do Empreendedor Oficial (gov.br)',
			guiaUrl: <?php echo wp_json_encode( $url_mei ); ?>,
			guiaNome: 'Abrir Guia do MEI (DAS e Declaração Anual) →'
		},
		'svr_bc': {
			orgao: 'Banco Central do Brasil (Sistema de Valores a Receber — SVR)',
			docs: 'CPF e data de nascimento para consulta inicial; Conta Gov.br nível Prata ou Ouro e chave PIX para solicitar o resgate gratuito.',
			canalUrl: 'https://valoresareceber.bcb.gov.br/',
			canalNome: 'Site Único Oficial: valoresareceber.bcb.gov.br',
			guiaUrl: <?php echo wp_json_encode( $url_svr ); ?>,
			guiaNome: 'Abrir Guia do Valores a Receber (BC) →'
		}
	};

	function mostrarRoteiroOndeResolver() {
		var el = document.getElementById('or-tarefa');
		var out = document.getElementById('resultado-onde-resolver');
		var btn = document.getElementById('btn-abrir-guia-onde-resolver');
		if (!el || !out) return;
		var item = dadosOndeResolver[el.value] || dadosOndeResolver['cadunico'];
		out.style.display = 'block';
		if (btn) {
			btn.textContent = item.guiaNome;
		}
		out.innerHTML =
			'<p style="margin:0 0 0.45rem 0; font-size:0.95rem; color:#102b57;"><strong>🏢 Órgão Oficial Responsável:</strong> ' + item.orgao + '</p>' +
			'<p style="margin:0 0 0.85rem 0; font-size:0.92rem; color:#334155;"><strong>📋 Documentos Necessários:</strong> ' + item.docs + '</p>' +
			'<div style="display:flex; flex-wrap:wrap; gap:0.75rem; align-items:center; padding-top:0.65rem; border-top:1px solid #dbe5ef;">' +
			'<a href="' + item.canalUrl + '" target="_blank" rel="noopener noreferrer" style="background:#102b57; color:#ffffff !important; padding:0.55rem 1.1rem; border-radius:8px; font-weight:700; font-size:0.88rem; text-decoration:none !important; display:inline-block;">🔗 Acessar ' + item.canalNome + ' &nearr;</a>' +
			'</div>';
	}

	function abrirGuiaSelecionadoOndeResolver() {
		var el = document.getElementById('or-tarefa');
		if (!el) return;
		var item = dadosOndeResolver[el.value] || dadosOndeResolver['cadunico'];
		if (item && item.guiaUrl) {
			window.location.href = item.guiaUrl;
		}
	}

	document.addEventListener('DOMContentLoaded', mostrarRoteiroOndeResolver);
	</script>
	<?php
	return ob_get_clean();
}
add_shortcode( 'roteiro_onde_resolver', 'guia_cidadao_shortcode_onde_resolver' );





