<?php
/**
 * Template Principal (Homepage do Portal de Utilidade Pública)
 * Inclui Chamada Principal (Hero) na Primeira Dobra com ação direta + 4 Pilares + Artigos Ilustrados
 */
get_header();
?>

<main id="primary" class="site-main container">

	<?php if ( is_home() && ! is_paged() ) : ?>
		<!-- Primeira Dobra (Hero Principal): Benefício concreto e ação imediata sem competir com anúncios -->
		<section class="hero-civic-banner" aria-label="Destaque Principal e Simuladores Oficiais 2026">
			<div class="hero-civic-content">
				<span class="hero-badge-2026">✔ TABELAS OFICIAIS 2026 ATUALIZADAS (PORTARIA MPS/MF Nº 13/2026)</span>
				<h2>Simule Seus Direitos Trabalhistas e Consulte Guias Oficiais Passo a Passo</h2>
				<p>Calcule gratuitamente a estimativa do seu <strong>13º Salário</strong>, <strong>Rescisão CLT</strong>, <strong>Férias</strong>, <strong>Seguro-Desemprego</strong> e <strong>Imposto de Renda</strong> com base nas alíquotas progressivas oficiais vigentes em 2026.</p>
				<div class="hero-cta-group">
					<a href="<?php echo esc_url( home_url( '/simulador-decimo-terceiro-salario-1-e-2-parcela/' ) ); ?>" class="hero-btn-primary">💰 Calcular 13º Salário 2026</a>
					<a href="<?php echo esc_url( home_url( '/calculadora-rescisao-trabalhista-clt-multa-fgts/' ) ); ?>" class="hero-btn-secondary">📊 Simular Rescisão CLT</a>
					<a href="<?php echo esc_url( home_url( '/calculadoras/' ) ); ?>" class="hero-btn-secondary">🧮 Ver Todas as 5 Calculadoras</a>
				</div>
			</div>
		</section>

		<!-- Hub de Acesso Rápido às 4 Categorias Pilares -->
		<section class="utility-hub-section" aria-label="Serviços e Guias de Utilidade Pública">
			<div class="section-header">
				<h2 class="section-title">Navegue por Categoria de Utilidade Pública</h2>
			</div>

			<div class="utility-grid">
				<a href="<?php echo esc_url( home_url( '/category/beneficios-trabalhador/' ) ); ?>" class="utility-card">
					<div class="utility-icon blue">📋</div>
					<h3>Benefícios & Trabalhador</h3>
					<p>Calendários e consultas do INSS, FGTS, Bolsa Família, PIS/PASEP, BPC/LOAS e Seguro-Desemprego.</p>
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
					<p>Valores a Receber (BC), Tarifa Social de Energia, CPF e Restituição do Imposto de Renda.</p>
					<span class="utility-card-cta">Consultar agora &rarr;</span>
				</a>

				<a href="<?php echo esc_url( home_url( '/calculadoras/' ) ); ?>" class="utility-card">
					<div class="utility-icon purple">🧮</div>
					<h3>Calculadoras CLT 2026</h3>
					<p>Simuladores auditados de 13º Salário, Rescisão, Férias, Seguro-Desemprego e IRPF.</p>
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
						echo 'Guias Verificados e Simuladores em Destaque';
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
							<?php if ( has_post_thumbnail() ) : ?>
								<a href="<?php the_permalink(); ?>" class="post-card-thumb" aria-hidden="true" tabindex="-1">
									<?php the_post_thumbnail( 'medium_large' ); ?>
								</a>
							<?php endif; ?>
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
									<span>📅 Revisado em <?php echo esc_html( get_the_modified_date( 'd/m/Y' ) ); ?></span>
									<a href="<?php the_permalink(); ?>" style="font-weight:700;">Acessar &rarr;</a>
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
			<?php endif; ?>
		</div>

		<?php get_sidebar(); ?>
	</div>

</main>

<?php
get_footer();
