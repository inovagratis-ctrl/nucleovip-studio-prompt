<?php
/**
 * Template Principal (Homepage do Portal de Utilidade Pública)
 */
get_header();
?>

<main id="primary" class="site-main container">

	<?php if ( is_home() && ! is_paged() ) : ?>
		<!-- Hub de Acesso Rápido às 4 Categorias Pilares -->
		<section class="utility-hub-section" aria-label="Serviços e Guias de Utilidade Pública">
			<div class="section-header">
				<h2 class="section-title">Central de Consulta Rápida do Cidadão</h2>
			</div>

			<div class="utility-grid">
				<a href="<?php echo esc_url( home_url( '/category/beneficios-trabalhador/' ) ); ?>" class="utility-card">
					<div class="utility-icon blue">📋</div>
					<h3>Benefícios & Trabalhador</h3>
					<p>Calendários e consultas do INSS, FGTS, Bolsa Família, PIS/PASEP e Seguro-Desemprego.</p>
					<span class="utility-card-cta">Acessar guias &rarr;</span>
				</a>

				<a href="<?php echo esc_url( home_url( '/category/documentos-gov-br/' ) ); ?>" class="utility-card">
					<div class="utility-icon green">🪪</div>
					<h3>Documentos & Gov.br</h3>
					<p>Como emitir a Nova Carteira de Identidade (CIN), CNH Digital, CPF, Certidões e MEI.</p>
					<span class="utility-card-cta">Ver passo a passo &rarr;</span>
				</a>

				<a href="<?php echo esc_url( home_url( '/category/contas-financas/' ) ); ?>" class="utility-card">
					<div class="utility-icon amber">💳</div>
					<h3>Contas & Finanças</h3>
					<p>2ª via de contas, consulta de CPF, negociação de dívidas e declaração de Imposto de Renda.</p>
					<span class="utility-card-cta">Consultar agora &rarr;</span>
				</a>

				<a href="<?php echo esc_url( home_url( '/calculadoras/' ) ); ?>" class="utility-card">
					<div class="utility-icon purple">🧮</div>
					<h3>Calculadoras CLT</h3>
					<p>Simuladores gratuitos e imediatos de Rescisão Trabalhista, Férias Remuneradas e 13º Salário.</p>
					<span class="utility-card-cta">Calcular grátis &rarr;</span>
				</a>
			</div>
		</section>
	<?php endif; ?>

	<div class="site-main-grid">
		<div class="content-area">
			<div class="section-header">
				<h2 class="section-title">
					<?php
					if ( is_category() ) {
						single_cat_title( 'Guias sobre: ' );
					} elseif ( is_search() ) {
						printf( 'Resultados da busca por: "%s"', get_search_query() );
					} else {
						echo 'Últimas Atualizações e Guias Passo a Passo';
					}
					?>
				</h2>
			</div>

			<?php if ( have_posts() ) : ?>
				<div class="posts-grid">
					<?php
					while ( have_posts() ) :
						the_post();
						$categories = get_the_category();
						$cat_name   = ! empty( $categories ) ? $categories[0]->name : 'Utilidade Pública';
						?>
						<article id="post-<?php the_ID(); ?>" <?php post_class( 'post-card' ); ?>>
							<a href="<?php the_permalink(); ?>" class="post-card-thumb" aria-hidden="true" tabindex="-1">
								<?php if ( has_post_thumbnail() ) : ?>
									<?php the_post_thumbnail( 'medium_large' ); ?>
								<?php else : ?>
									<span><strong><?php echo esc_html( $cat_name ); ?></strong><br><small>Guia Atualizado</small></span>
								<?php endif; ?>
							</a>
							<div class="post-card-body">
								<div>
									<span class="post-category-badge"><?php echo esc_html( $cat_name ); ?></span>
								</div>
								<h3 class="post-card-title">
									<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
								</h3>
								<div class="post-card-excerpt">
									<?php echo wp_kses_post( wp_trim_words( get_the_excerpt(), 22, '...' ) ); ?>
								</div>
								<div class="post-card-meta">
									<span>📅 Atualizado em <?php echo esc_html( get_the_modified_date( 'd/m/Y' ) ); ?></span>
									<a href="<?php the_permalink(); ?>" style="font-weight:700;">Ler guia &rarr;</a>
								</div>
							</div>
						</article>
					<?php endwhile; ?>
				</div>

				<div style="margin-top: 2rem;">
					<?php
					the_posts_pagination( array(
						'mid_size'  => 2,
						'prev_text' => '&larr; Anterior',
						'next_text' => 'Próxima &rarr;',
					) );
					?>
				</div>

			<?php else : ?>
				<div class="single-article-card">
					<h3>Use o menu "Portal & AdSense" no Painel do WordPress</h3>
					<p>Para criar automaticamente as <strong>4 Categorias</strong>, as <strong>Páginas Obrigatórias de Aprovação no Google AdSense</strong> e importar notícias reais direto da <strong>Agência Brasil / Gov.br</strong>, acesse o menu <strong>Portal & AdSense</strong> no seu painel administrativo.</p>
				</div>
			<?php endif; ?>
		</div>

		<?php get_sidebar(); ?>
	</div>

</main>

<?php
get_footer();
