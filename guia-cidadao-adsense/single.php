<?php
/**
 * Template de Artigo Individual (Otimizado para CTR de AdSense, E-E-A-T e Tempo de Permanência)
 */
get_header();
?>

<main id="primary" class="site-main container">
	<div class="site-main-grid">
		<div class="content-area">
			<?php
			while ( have_posts() ) :
				the_post();
				$categories = get_the_category();
				$cat_name   = ! empty( $categories ) ? $categories[0]->name : 'Utilidade Pública';
				$cat_link   = ! empty( $categories ) ? get_category_link( $categories[0]->term_id ) : home_url();
				?>
				<article id="post-<?php the_ID(); ?>" <?php post_class( 'single-article-card' ); ?>>
					<nav class="breadcrumbs" aria-label="Navegação estrutural">
						<a href="<?php echo esc_url( home_url( '/' ) ); ?>">Início</a>
						<span>&rsaquo;</span>
						<a href="<?php echo esc_url( $cat_link ); ?>"><?php echo esc_html( $cat_name ); ?></a>
						<span>&rsaquo;</span>
						<span><?php the_title(); ?></span>
					</nav>

					<header class="entry-header">
						<span class="post-category-badge"><?php echo esc_html( $cat_name ); ?></span>
						<h1 class="entry-title"><?php the_title(); ?></h1>

						<div class="entry-meta-bar">
							<span class="updated-badge">✔ Verificado e Atualizado em <?php echo esc_html( get_the_modified_date( 'd/m/Y' ) ); ?></span>
							<span>Por <strong>Redação <?php bloginfo( 'name' ); ?></strong></span>
						</div>
					</header>

					<div class="entry-content">
						<?php the_content(); ?>
					</div>

					<!-- Caixa de Autoridade Editorial (E-E-A-T) exigida pelo Google para aprovar sites YMYL / Utilidade Pública -->
					<div class="author-eeat-box">
						<div class="author-avatar" aria-hidden="true">NV</div>
						<div>
							<strong>Equipe Editorial <?php bloginfo( 'name' ); ?></strong>
							<p style="font-size:0.85rem; color:#475569; margin-top:0.25rem;">
								Nosso conteúdo de utilidade pública é apurado com base em dados oficiais do Portal Gov.br, Agência Brasil (EBC), Ministério do Trabalho e Previdência e Receita Federal. Consulte nossa <a href="<?php echo esc_url( home_url( '/sobre-nos/' ) ); ?>">Política Editorial</a>.
							</p>
						</div>
					</div>
				</article>
			<?php endwhile; ?>
		</div>

		<?php get_sidebar(); ?>
	</div>
</main>

<?php
get_footer();
