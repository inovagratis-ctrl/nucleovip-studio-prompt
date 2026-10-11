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
	wp_enqueue_style( 'guia-cidadao-style', get_stylesheet_uri(), array(), '2.0.0' );
	wp_enqueue_script( 'guia-cidadao-main', get_template_directory_uri() . '/assets/js/main.js', array(), '2.0.0', true );
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
			<small style="color:#475569;">Vigência 2026: Tabela INSS Portaria MPS/MF nº 13/2026 + Tabela Progressiva Mensal da Receita Federal</small>
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
			<small style="color:#475569;">Vigência 2026: Tabela INSS Portaria MPS/MF nº 13, de 09/01/2026 + IRRF Mensal</small>
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
			<small style="color:#475569;">Vigência 2026: Tabela INSS Portaria Interministerial MPS/MF nº 13, de 09/01/2026 (Faixas R$ 1.621,00 a R$ 8.708,55) • Lei nº 4.749/1965</small>
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
 * 8. GERADOR AUTOMÁTICO DE ILUSTRAÇÕES EDITORIAIS EM WEBP (1200x675 - PADRÃO 16:9 LEVE)
 * Segue as melhores práticas de UX:
 * - Proporção 16:9 (1200x675px) em formato leve WebP
 * - Fundo claro editorial com ilustração gráfica centralizada (não corta no celular e elimina blocos escuros)
 * - Sem excesso de texto dentro da imagem (apenas um selo curto de 2 palavras do assunto centralizado)
 * - Texto alternativo (alt) descritivo da ilustração, sem repetir o título inteiro do artigo
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
	$cat_slug   = ! empty( $categories ) ? $categories[0]->slug : 'geral';
	$lower      = mb_strtolower( $title, 'UTF-8' );

	// Define tema visual específico por assunto (Fundo claro suave + Ilustração centralizada + Alt descritivo)
	if ( false !== mb_strpos( $lower, '13º' ) || false !== mb_strpos( $lower, 'décimo' ) ) {
		$bg_top = array( 240, 253, 244 ); $bg_bot = array( 220, 252, 231 );
		$primary = array( 21, 128, 61 );  $accent = array( 12, 50, 111 );
		$badge = '13º SALÁRIO CLT';
		$sub   = '1ª e 2ª Parcelas • Tabela 2026';
		$alt   = 'Ilustração de demonstrativo de pagamento e calculadora para estimativa de 13º salário';
		$icon_type = 'calculator';
	} elseif ( false !== mb_strpos( $lower, 'rescisão' ) || false !== mb_strpos( $lower, 'fgts' ) ) {
		$bg_top = array( 239, 246, 255 ); $bg_bot = array( 219, 234, 254 );
		$primary = array( 29, 78, 216 );  $accent = array( 22, 136, 33 );
		$badge = ( false !== mb_strpos( $lower, 'rescisão' ) ) ? 'RESCISÃO CLT' : 'CONSULTA FGTS';
		$sub   = 'Saldo, Extrato e Direitos';
		$alt   = 'Ilustração de carteira de trabalho digital e extrato de Fundo de Garantia';
		$icon_type = 'wallet';
	} elseif ( false !== mb_strpos( $lower, 'férias' ) ) {
		$bg_top = array( 240, 249, 255 ); $bg_bot = array( 224, 242, 254 );
		$primary = array( 3, 105, 161 );  $accent = array( 245, 158, 11 );
		$badge = 'FÉRIAS CLT + 1/3';
		$sub   = 'Simulador de Valor Líquido';
		$alt   = 'Ilustração de calendário de descanso remunerado e cálculo de terço constitucional';
		$icon_type = 'calendar';
	} elseif ( false !== mb_strpos( $lower, 'seguro-desemprego' ) ) {
		$bg_top = array( 245, 243, 255 ); $bg_bot = array( 237, 233, 254 );
		$primary = array( 109, 40, 217 ); $accent = array( 16, 185, 129 );
		$badge = 'SEGURO-DESEMPREGO';
		$sub   = 'Parcelas e Faixas MTE 2026';
		$alt   = 'Ilustração de escudo de proteção trabalhista e tabela de parcelas do Seguro-Desemprego';
		$icon_type = 'shield';
	} elseif ( false !== mb_strpos( $lower, 'imposto de renda' ) || false !== mb_strpos( $lower, 'irpf' ) ) {
		$bg_top = array( 254, 252, 232 ); $bg_bot = array( 254, 240, 138 );
		$primary = array( 180, 83, 9 );   $accent = array( 12, 50, 111 );
		$badge = 'IMPOSTO DE RENDA';
		$sub   = 'Faixas de Isenção e Restituição';
		$alt   = 'Ilustração de formulário de declaração fiscal e cálculo de alíquota efetiva';
		$icon_type = 'chart';
	} elseif ( 'documentos-gov-br' === $cat_slug ) {
		$bg_top = array( 240, 253, 250 ); $bg_bot = array( 204, 251, 241 );
		$primary = array( 15, 118, 110 ); $accent = array( 19, 81, 180 );
		$badge = 'DOCUMENTO DIGITAL';
		$sub   = 'Emissão e Validação Gov.br';
		$alt   = 'Ilustração de documento de identificação nacional com QR Code e validação digital';
		$icon_type = 'idcard';
	} elseif ( 'contas-financas' === $cat_slug ) {
		$bg_top = array( 255, 251, 235 ); $bg_bot = array( 254, 243, 199 );
		$primary = array( 180, 83, 9 );   $accent = array( 21, 128, 61 );
		$badge = 'CONSULTA FINANCEIRA';
		$sub   = 'Serviços Públicos e Economia';
		$alt   = 'Ilustração de painel de consulta financeira e tarifas de serviços públicos';
		$icon_type = 'chart';
	} else {
		$bg_top = array( 248, 250, 252 ); $bg_bot = array( 226, 232, 240 );
		$primary = array( 12, 50, 111 );  $accent = array( 22, 136, 33 );
		$badge = 'DIREITOS E BENEFÍCIOS';
		$sub   = 'Consulta Oficial Passo a Passo';
		$alt   = 'Ilustração de cartão de benefício social e guia informativo ao cidadão';
		$icon_type = 'shield';
	}

	$w = 1200;
	$h = 675;
	$im = imagecreatetruecolor( $w, $h );

	// 1. Fundo claro suave (gradiente pastel luminoso)
	for ( $y = 0; $y < $h; $y++ ) {
		$r = (int) ( $bg_top[0] + ( $bg_bot[0] - $bg_top[0] ) * ( $y / $h ) );
		$g = (int) ( $bg_top[1] + ( $bg_bot[1] - $bg_top[1] ) * ( $y / $h ) );
		$b = (int) ( $bg_top[2] + ( $bg_bot[2] - $bg_top[2] ) * ( $y / $h ) );
		$col = imagecolorallocate( $im, $r, $g, $b );
		imageline( $im, 0, $y, $w, $y, $col );
	}

	imagealphablending( $im, true );
	$c_white   = imagecolorallocate( $im, 255, 255, 255 );
	$c_primary = imagecolorallocate( $im, $primary[0], $primary[1], $primary[2] );
	$c_accent  = imagecolorallocate( $im, $accent[0], $accent[1], $accent[2] );
	$c_dark    = imagecolorallocate( $im, 30, 41, 59 );
	$c_muted   = imagecolorallocate( $im, 100, 116, 139 );
	$c_border  = imagecolorallocate( $im, 203, 213, 225 );
	$c_shadow  = imagecolorallocatealpha( $im, 15, 23, 42, 115 );

	// Círculo suave centralizado de fundo
	$c_halo = imagecolorallocatealpha( $im, $primary[0], $primary[1], $primary[2], 116 );
	imagefilledellipse( $im, 600, 337, 540, 540, $c_halo );

	// 2. Cartão Ilustrativo Centralizado (340..860 x 135..540) — Não corta no mobile!
	imagefilledrectangle( $im, 338, 145, 872, 548, $c_shadow );
	imagefilledrectangle( $im, 330, 135, 870, 540, $c_white );
	imagerectangle( $im, 330, 135, 870, 540, $c_border );

	// Topo colorido do cartão ilustrado
	imagefilledrectangle( $im, 330, 135, 870, 195, $c_primary );
	imagefilledellipse( $im, 365, 165, 16, 16, $c_white );
	imagefilledellipse( $im, 392, 165, 16, 16, $c_accent );

	// 3. Desenho Vetorial Centralizado por Tipo de Assunto (Lado Esquerdo do Cartão Central)
	$ix = 435;
	$iy = 325;
	$c_icon_bg = imagecolorallocatealpha( $im, $primary[0], $primary[1], $primary[2], 110 );
	imagefilledellipse( $im, $ix, $iy, 140, 140, $c_icon_bg );

	if ( 'calculator' === $icon_type ) {
		// Ícone de Calculadora
		imagefilledrectangle( $im, $ix - 38, $iy - 48, $ix + 38, $iy + 48, $c_primary );
		imagefilledrectangle( $im, $ix - 28, $iy - 38, $ix + 28, $iy - 16, $c_white );
		for ( $row = 0; $row < 3; $row++ ) {
			for ( $col_i = 0; $col_i < 3; $col_i++ ) {
				$bx = ( $ix - 26 ) + ( $col_i * 19 );
				$by = ( $iy - 6 ) + ( $row * 17 );
				imagefilledrectangle( $im, $bx, $by, $bx + 13, $by + 11, ( 2 === $col_i && 2 === $row ) ? $c_accent : $c_white );
			}
		}
	} elseif ( 'idcard' === $icon_type ) {
		// Ícone de Carteira de Identidade / Documento
		imagefilledrectangle( $im, $ix - 48, $iy - 34, $ix + 48, $iy + 34, $c_primary );
		imagefilledellipse( $im, $ix - 22, $iy - 4, 24, 24, $c_white );
		imagefilledrectangle( $im, $ix - 36, $iy + 12, $ix - 8, $iy + 24, $c_white );
		imagefilledrectangle( $im, $ix + 2, $iy - 18, $ix + 38, $iy - 10, $c_white );
		imagefilledrectangle( $im, $ix + 2, $iy - 2, $ix + 38, $iy + 6, $c_accent );
		imagefilledrectangle( $im, $ix + 2, $iy + 14, $ix + 28, $iy + 22, $c_white );
	} elseif ( 'chart' === $icon_type ) {
		// Ícone de Gráfico Financeiro / Imposto
		imagefilledrectangle( $im, $ix - 36, $iy + 5, $ix - 18, $iy + 40, $c_primary );
		imagefilledrectangle( $im, $ix - 9, $iy - 15, $ix + 9, $iy + 40, $c_accent );
		imagefilledrectangle( $im, $ix + 18, $iy - 38, $ix + 36, $iy + 40, $c_primary );
	} else {
		// Ícone de Documento Verificado / Benefício
		imagefilledrectangle( $im, $ix - 36, $iy - 45, $ix + 36, $iy + 45, $c_primary );
		imagefilledrectangle( $im, $ix - 24, $iy - 26, $ix + 24, $iy - 18, $c_white );
		imagefilledrectangle( $im, $ix - 24, $iy - 8, $ix + 24, $iy, $c_white );
		imagefilledrectangle( $im, $ix - 24, $iy + 10, $ix + 10, $iy + 18, $c_accent );
	}

	// 4. Elementos Visuais Limpos à Direita do Ícone (Selo Curto + Barras Gráficas Simbólicas)
	imagettftext( $im, 22, 0, 525, 290, $c_dark, $font_bold, $badge );
	imagettftext( $im, 15, 0, 525, 325, $c_muted, $font_reg, $sub );

	// Barras gráficas decorativas de interface (representando linhas de documento/simulador)
	$c_bar1 = imagecolorallocate( $im, 226, 232, 240 );
	imagefilledrectangle( $im, 525, 352, 815, 366, $c_bar1 );
	imagefilledrectangle( $im, 525, 380, 760, 394, $c_bar1 );

	// Selo Verde "Verificado 2026"
	imagefilledrectangle( $im, 525, 418, 725, 456, $c_accent );
	imagettftext( $im, 13, 0, 542, 443, $c_white, $font_bold, 'ATUALIZADO 2026' );

	$upload_dir = wp_upload_dir();
	$use_webp   = function_exists( 'imagewebp' );
	$ext        = $use_webp ? '.webp' : '.png';
	$mime       = $use_webp ? 'image/webp' : 'image/png';
	$filename   = 'ilustracao-post-' . $post_id . '-' . time() . $ext;
	$filepath   = trailingslashit( $upload_dir['path'] ) . $filename;

	if ( $use_webp ) {
		imagewebp( $im, $filepath, 88 );
	} else {
		imagepng( $im, $filepath, 8 );
	}
	imagedestroy( $im );

	if ( ! file_exists( $filepath ) ) {
		return;
	}

	$attachment = array(
		'guid'           => trailingslashit( $upload_dir['url'] ) . $filename,
		'post_mime_type' => $mime,
		'post_title'     => 'Ilustração — ' . $badge,
		'post_content'   => '',
		'post_status'    => 'inherit',
	);

	$attach_id = wp_insert_attachment( $attachment, $filepath, $post_id );
	if ( ! is_wp_error( $attach_id ) && $attach_id ) {
		require_once ABSPATH . 'wp-admin/includes/image.php';
		$attach_data = wp_generate_attachment_metadata( $attach_id, $filepath );
		wp_update_attachment_metadata( $attach_id, $attach_data );
		set_post_thumbnail( $post_id, $attach_id );
		// Alt text descreve a imagem em si, sem repetir o título inteiro do artigo
		update_post_meta( $attach_id, '_wp_attachment_image_alt', $alt );
	}
}
add_action( 'save_post', 'guia_cidadao_generate_post_thumbnail', 20, 1 );


