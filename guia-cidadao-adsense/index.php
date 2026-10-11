<?php
/**
 * Template Principal (Homepage do Portal de Utilidade Pública)
 * Estrutura Otimizada:
 * 1. Destaque para Ferramenta Principal ("Calcular meu 13º") + Atalhos das Calculadoras (Separado dos Guias)
 * 2. Navegação pelas 4 Categorias
 * 3. Cartões Visuais Padronizados (Miniatura WebP 1/3 do cartão + Categoria + Título + Resumo curto + CTA específico)
 */
get_header();
?>

<main id="primary" class="site-main container">

	<?php if ( is_home() && ! is_paged() ) : ?>
		<!-- 1. SEÇÃO DE FERRAMENTAS INTERATIVAS (Separada dos Artigos, com destaque para "Calcular meu 13º") -->
		<section class="tools-spotlight-section" aria-label="Calculadoras Trabalhistas em Destaque">
			<div class="tools-spotlight-grid">
				<!-- Cartão Principal Evidente: Calcular meu 13º -->
				<div class="featured-tool-card">
					<span class="hero-badge-2026">✔ TABELA OFICIAL INSS 2026 (PORTARIA MPS/MF Nº 13/2026)</span>
					<h2>Calcular meu 13º Salário 2026</h2>
					<p>Descubra na hora a estimativa da sua <strong>1ª parcela (até 30/11/2026)</strong> e da <strong>2ª parcela (até 18/12/2026)</strong>, já com cálculo progressivo de INSS e IRRF separado.</p>
					<div class="hero-cta-group">
						<a href="<?php echo esc_url( home_url( '/simulador-decimo-terceiro-salario-1-e-2-parcela/' ) ); ?>" class="hero-btn-primary">Acessar simulador de 13º &rarr;</a>
						<a href="<?php echo esc_url( home_url( '/calculadoras/' ) ); ?>" class="hero-btn-secondary">Ver todas as 5 calculadoras</a>
					</div>
				</div>

				<!-- Outras 4 Ferramentas Rápidas -->
				<div class="quick-tools-list">
					<a href="<?php echo esc_url( home_url( '/calculadora-rescisao-trabalhista-clt-multa-fgts/' ) ); ?>" class="quick-tool-item">
						<span class="quick-tool-icon">📊</span>
						<div>
							<strong>Simulador de Rescisão CLT</strong>
							<span>Saldo de salário, férias, 13º e multa FGTS</span>
						</div>
						<span class="quick-tool-arrow">&rarr;</span>
					</a>

					<a href="<?php echo esc_url( home_url( '/calculadora-seguro-desemprego-valor-quantidade-parcelas/' ) ); ?>" class="quick-tool-item">
						<span class="quick-tool-icon">🛡️</span>
						<div>
							<strong>Calculadora de Seguro-Desemprego</strong>
							<span>Valor e quantidade de parcelas (3 a 5x)</span>
						</div>
						<span class="quick-tool-arrow">&rarr;</span>
					</a>

					<a href="<?php echo esc_url( home_url( '/calculadora-de-ferias-clt-terco-constitucional-abono/' ) ); ?>" class="quick-tool-item">
						<span class="quick-tool-icon">🏖️</span>
						<div>
							<strong>Calculadora de Férias + 1/3</strong>
							<span>Valor líquido e abono de 10 dias</span>
						</div>
						<span class="quick-tool-arrow">&rarr;</span>
					</a>

					<a href="<?php echo esc_url( home_url( '/calculadora-imposto-de-renda-mensal-irpf-salario-liquido/' ) ); ?>" class="quick-tool-item">
						<span class="quick-tool-icon">🦁</span>
						<div>
							<strong>Simulador de IRPF e Salário Líquido</strong>
							<span>Compare desconto simplificado vs legal</span>
						</div>
						<span class="quick-tool-arrow">&rarr;</span>
					</a>
				</div>
			</div>
		</section>

		<!-- 2. NAVEGAÇÃO POR ASSUNTO -->
		<section class="utility-hub-section" aria-label="Categorias de Utilidade Pública">
			<div class="section-header">
				<h2 class="section-title">Consultas por Categoria</h2>
			</div>

			<div class="utility-grid">
				<a href="<?php echo esc_url( home_url( '/category/beneficios-trabalhador/' ) ); ?>" class="utility-card">
					<div class="utility-icon blue">📋</div>
					<h3>Benefícios & Trabalhador</h3>
					<p>INSS, FGTS, Bolsa Família, PIS/PASEP, BPC/LOAS e Seguro-Desemprego.</p>
					<span class="utility-card-cta">Ver guias de benefícios &rarr;</span>
				</a>

				<a href="<?php echo esc_url( home_url( '/category/documentos-gov-br/' ) ); ?>" class="utility-card">
					<div class="utility-icon green">🪪</div>
					<h3>Documentos & Gov.br</h3>
					<p>Nova Carteira de Identidade (CIN), CNH Digital, CPF, Certidões e MEI.</p>
					<span class="utility-card-cta">Ver guias de documentos &rarr;</span>
				</a>

				<a href="<?php echo esc_url( home_url( '/category/contas-financas/' ) ); ?>" class="utility-card">
					<div class="utility-icon amber">💳</div>
					<h3>Contas & Finanças</h3>
					<p>Valores a Receber (BC), Tarifa Social de Energia e Restituição do IRPF.</p>
					<span class="utility-card-cta">Ver guias financeiros &rarr;</span>
				</a>

				<a href="<?php echo esc_url( home_url( '/category/calculadoras-simuladores/' ) ); ?>" class="utility-card">
					<div class="utility-icon purple">🧮</div>
					<h3>Calculadoras CLT 2026</h3>
					<p>Simuladores gratuitos com memória de cálculo oficial passo a passo.</p>
					<span class="utility-card-cta">Abrir simuladores &rarr;</span>
				</a>
			</div>
		</section>
	<?php endif; ?>

	<!-- 3. SEÇÃO DE GUIAS E ARTIGOS (Cartões Padronizados: Miniatura 1/3 + Categoria + Título + Resumo curto + Ação) -->
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
						echo 'Guias Passo a Passo e Orientações ao Cidadão';
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
						$cat_slug   = ! empty( $categories ) ? $categories[0]->slug : '';
						$is_calc    = ( 'calculadoras-simuladores' === $cat_slug );
						$cta_label  = $is_calc ? 'Acessar simulador' : 'Ler guia passo a passo';
						?>
						<article id="post-<?php the_ID(); ?>" <?php post_class( 'post-card' ); ?>>
							<?php if ( has_post_thumbnail() ) : ?>
								<a href="<?php the_permalink(); ?>" class="post-card-thumb" tabindex="-1">
									<?php the_post_thumbnail( 'medium_large', array( 'loading' => 'lazy' ) ); ?>
								</a>
							<?php endif; ?>
							<div class="post-card-body">
								<div>
									<span class="post-category-badge"><?php echo esc_html( $cat_name ); ?></span>
								</div>
								<h3 class="post-card-title">
									<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
								</h3>
								<p class="post-card-excerpt">
									<?php echo esc_html( wp_trim_words( get_the_excerpt(), 15, '...' ) ); ?>
								</p>
								<div class="post-card-meta">
									<a href="<?php the_permalink(); ?>" class="post-card-cta-link"><?php echo esc_html( $cta_label ); ?> &rarr;</a>
									<span class="post-card-date">Atualizado <?php echo esc_html( get_the_modified_date( 'd/m/Y' ) ); ?></span>
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
