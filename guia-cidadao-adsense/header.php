<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Barra Superior de Transparência (Fundamental para aprovação no Google AdSense em sites de Utilidade Pública) -->
<div class="top-utility-bar">
	<div class="container top-utility-inner">
		<div class="top-utility-disclaimer">
			<span class="badge-independent">Portal Independente</span>
			<span>Guia informativo de utilidade pública e cidadania • Sem vínculo com órgãos governamentais.</span>
		</div>
		<ul class="top-utility-links">
			<li><a href="<?php echo esc_url( home_url( '/calculadoras/' ) ); ?>">🧮 Calculadoras CLT</a></li>
			<li><a href="<?php echo esc_url( home_url( '/sobre-nos/' ) ); ?>">Sobre Nós</a></li>
			<li><a href="<?php echo esc_url( home_url( '/politica-de-privacidade/' ) ); ?>">Privacidade</a></li>
			<li><a href="<?php echo esc_url( home_url( '/contato/' ) ); ?>">Contato</a></li>
		</ul>
	</div>
</div>

<!-- Cabeçalho Principal -->
<header class="site-header" role="banner">
	<div class="container header-inner">
		<div class="site-branding">
			<?php
			$custom_logo_id  = get_theme_mod( 'custom_logo' );
			$custom_logo_url = $custom_logo_id ? wp_get_attachment_image_url( $custom_logo_id, 'full' ) : '';
			?>
			<?php if ( $custom_logo_url ) : ?>
				<?php if ( is_front_page() && is_home() ) : ?>
					<h1 class="site-title-logo">
						<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" class="site-logo-link">
							<img src="<?php echo esc_url( $custom_logo_url ); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name' ) . ' — ' . get_bloginfo( 'description' ) ); ?>" class="site-logo-horizontal" width="380" height="88" decoding="async" />
						</a>
					</h1>
				<?php else : ?>
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" class="site-logo-link">
						<img src="<?php echo esc_url( $custom_logo_url ); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name' ) . ' — ' . get_bloginfo( 'description' ) ); ?>" class="site-logo-horizontal" width="380" height="88" decoding="async" />
					</a>
				<?php endif; ?>
			<?php else : ?>
				<div class="site-logo-icon" aria-hidden="true">NV</div>
				<div>
					<?php if ( is_front_page() && is_home() ) : ?>
						<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
					<?php else : ?>
						<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
					<?php endif; ?>
					<p class="site-description"><?php bloginfo( 'description' ); ?></p>
				</div>
			<?php endif; ?>
		</div>

		<button class="mobile-menu-toggle" id="mobile-menu-btn" aria-label="Abrir Menu">☰ Categorias</button>

		<div class="header-search">
			<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
				<input type="search" class="search-field" placeholder="Consultar benefício, documento ou cálculo..." value="<?php echo get_search_query(); ?>" name="s" aria-label="Pesquisar no portal" />
				<button type="submit" class="search-submit">Buscar</button>
			</form>
		</div>
	</div>
</header>

<!-- Barra de Categorias Pilares -->
<div class="category-nav-bar">
	<div class="container">
		<nav id="site-navigation" class="main-navigation" role="navigation" aria-label="Menu Principal">
			<?php
			if ( has_nav_menu( 'primary' ) ) {
				wp_nav_menu( array(
					'theme_location' => 'primary',
					'menu_id'        => 'primary-menu',
					'container'      => false,
				) );
			} else {
				?>
				<ul id="primary-menu">
					<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">🏠 Início</a></li>
					<li><a href="<?php echo esc_url( home_url( '/calendario-de-beneficios/' ) ); ?>">📅 Calendário de Benefícios 2026</a></li>
					<li><a href="<?php echo esc_url( home_url( '/category/beneficios-trabalhador/' ) ); ?>">📋 Benefícios & Trabalhador</a></li>
					<li><a href="<?php echo esc_url( home_url( '/category/documentos-gov-br/' ) ); ?>">🪪 Documentos & Gov.br</a></li>
					<li><a href="<?php echo esc_url( home_url( '/category/contas-financas/' ) ); ?>">💳 Contas & Finanças</a></li>
					<li><a href="<?php echo esc_url( home_url( '/calculadoras/' ) ); ?>">🧮 Calculadoras & Simuladores</a></li>
				</ul>
				<?php
			}
			?>
		</nav>
	</div>
</div>

<!-- Espaço AdSense Topo (Leaderboard com proteção Anti-CLS) -->
<div class="container">
	<?php echo guia_cidadao_render_ad( 'adsense_header_code', 'ad-header-leaderboard', 'Banner Topo AdSense (728x90 / Responsivo Automático)' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
