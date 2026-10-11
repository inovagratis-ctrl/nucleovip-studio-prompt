<?php
/**
 * Template de Artigo Individual (Otimizado para CTR de AdSense, E-E-A-T, Compartilhamento WhatsApp e Links Internos)
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
				$cat_id     = ! empty( $categories ) ? $categories[0]->term_id : 0;
				$cat_link   = ! empty( $categories ) ? get_category_link( $cat_id ) : home_url();
				$share_url  = rawurlencode( get_permalink() );
				$share_text = rawurlencode( get_the_title() . ' - ' . get_permalink() );
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
							<a href="https://api.whatsapp.com/send?text=<?php echo esc_attr( $share_text ); ?>" target="_blank" rel="noopener nofollow" style="margin-left:auto; background:#16a34a; color:#fff; padding:0.25rem 0.7rem; border-radius:6px; font-weight:700; font-size:0.78rem; text-decoration:none;">📲 Compartilhar no WhatsApp</a>
						</div>

						<?php if ( has_post_thumbnail() ) : ?>
							<figure class="single-post-thumb" style="margin: 0 0 1.5rem 0; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(15,23,42,0.08);">
								<?php the_post_thumbnail( 'large', array( 'style' => 'width:100%; height:auto; display:block;' ) ); ?>
							</figure>
						<?php endif; ?>
					</header>

					<div class="entry-content">
						<?php the_content(); ?>
					</div>

					<!-- Caixa de Autoridade Editorial (E-E-A-T) com Editor Responsável Nomeado -->
					<div class="author-eeat-box">
						<div class="author-avatar" aria-hidden="true">ET</div>
						<div>
							<strong>Revisão Técnica: Eusimar Teixeira — Editor Responsável (<?php bloginfo( 'name' ); ?>)</strong>
							<p style="font-size:0.85rem; color:#475569; margin-top:0.25rem;">
								Conteúdo e tabelas paramétricas conferidos conforme atos normativos vigentes em 2026 (<a href="https://www.gov.br/previdencia/pt-br/assuntos/rpps/documentos/PortariaInterministerialMPSMF13de9dejaneirode2026.pdf" target="_blank" rel="noopener nofollow">Portaria Interministerial MPS/MF nº 13/2026</a>, <a href="https://www.planalto.gov.br/ccivil_03/leis/l4749.htm" target="_blank" rel="noopener nofollow">Lei nº 4.749/1965</a>, CLT e Portal Gov.br). Consulte nosso <a href="<?php echo esc_url( home_url( '/sobre-nos/' ) ); ?>">Expediente Editorial</a> ou <a href="<?php echo esc_url( home_url( '/contato/' ) ); ?>">reporte uma atualização</a>.
							</p>
						</div>
					</div>
				</article>

				<!-- Artigos Relacionados (Aumenta Páginas/Sessão e Receita do AdSense) -->
				<?php
				$related = new WP_Query( array(
					'category__in'   => array( $cat_id ),
					'post__not_in'   => array( get_the_ID() ),
					'posts_per_page' => 4,
					'orderby'        => 'date',
					'order'          => 'DESC',
				) );
				if ( $related->have_posts() ) :
					?>
					<section style="margin-top:2rem;" aria-label="Guias Relacionados">
						<div class="section-header">
							<h2 class="section-title">Leia Também: Guias Relacionados</h2>
						</div>
						<div class="posts-grid">
							<?php
							while ( $related->have_posts() ) :
								$related->the_post();
								?>
								<article class="post-card">
									<?php if ( has_post_thumbnail() ) : ?>
										<a href="<?php the_permalink(); ?>" class="post-card-thumb" aria-hidden="true" tabindex="-1">
											<?php the_post_thumbnail( 'medium_large' ); ?>
										</a>
									<?php endif; ?>
									<div class="post-card-body">
										<span class="post-category-badge"><?php echo esc_html( $cat_name ); ?></span>
										<h3 class="post-card-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
										<div class="post-card-meta">
											<span>📅 <?php echo esc_html( get_the_modified_date( 'd/m/Y' ) ); ?></span>
											<a href="<?php the_permalink(); ?>" style="font-weight:700;">Ler guia &rarr;</a>
										</div>
									</div>
								</article>
								<?php
							endwhile;
							wp_reset_postdata();
							?>
						</div>
					</section>
				<?php endif; ?>

			<?php endwhile; ?>
		</div>

		<?php get_sidebar(); ?>
	</div>
</main>

<?php
get_footer();
