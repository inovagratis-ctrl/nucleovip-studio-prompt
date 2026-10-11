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
		<?php
		$hero_bg_id       = get_theme_mod( 'guia_cidadao_hero_bg_id' );
		$hero_bg_url      = $hero_bg_id ? wp_get_attachment_image_url( $hero_bg_id, 'full' ) : '';
		$icon_beneficios  = get_theme_mod( 'guia_cidadao_icon_beneficios' );
		$icon_documentos  = get_theme_mod( 'guia_cidadao_icon_documentos' );
		$icon_financas    = get_theme_mod( 'guia_cidadao_icon_financas' );
		$icon_calculadoras = get_theme_mod( 'guia_cidadao_icon_calculadoras' );

		$url_icon_beneficios   = $icon_beneficios ? wp_get_attachment_image_url( $icon_beneficios, 'full' ) : '';
		$url_icon_documentos   = $icon_documentos ? wp_get_attachment_image_url( $icon_documentos, 'full' ) : '';
		$url_icon_financas     = $icon_financas ? wp_get_attachment_image_url( $icon_financas, 'full' ) : '';
		$url_icon_calculadoras = $icon_calculadoras ? wp_get_attachment_image_url( $icon_calculadoras, 'full' ) : '';
		?>
		<!-- 1. SEÇÃO DE FERRAMENTAS INTERATIVAS (Hero Cidadão + Atalhos das Calculadoras) -->
		<section class="tools-spotlight-section" aria-label="Calculadoras Trabalhistas em Destaque">
			<!-- Cartão Principal (Hero Cidadão 1920x1080 com espaço negativo à esquerda para HTML e pessoa visível à direita) -->
			<div class="featured-tool-card<?php echo $hero_bg_url ? ' has-hero-banner' : ''; ?>" <?php echo $hero_bg_url ? 'style="--hero-bg-image: url(\'' . esc_url( $hero_bg_url ) . '\');"' : ''; ?>>
				<div class="hero-content-left">
					<span class="hero-badge-2026">✔ TABELA OFICIAL INSS 2026 • ISENÇÃO IRRF ATÉ R$ 5.000 (LEI Nº 15.270/2025)</span>
					<h2>Calcular meu 13º Salário 2026</h2>
					<p>Orientação clara para o seu dia a dia: descubra na hora a estimativa da sua <strong>1ª parcela (até 30/11/2026)</strong> e da <strong>2ª parcela (prazo legal até 20/12, antecipado para 18/12/2026 por cair no domingo)</strong>, já com cálculo progressivo de INSS e IRRF separado.</p>
					<div class="hero-cta-group">
						<a href="<?php echo esc_url( home_url( '/simulador-decimo-terceiro-salario-1-e-2-parcela/' ) ); ?>" class="hero-btn-primary">Acessar simulador de 13º &rarr;</a>
						<a href="<?php echo esc_url( home_url( '/calculadoras/' ) ); ?>" class="hero-btn-secondary">Acessar as calculadoras</a>
					</div>
				</div>
				<?php if ( $hero_bg_url ) : ?>
					<div class="hero-mobile-visual">
						<img src="<?php echo esc_url( $hero_bg_url ); ?>" alt="Pessoa consultando serviços públicos e benefícios sociais" width="1200" height="675" loading="eager" decoding="async" />
					</div>
				<?php endif; ?>
			</div>

			<!-- Outras 4 Ferramentas Rápidas -->
			<div class="quick-tools-list">
				<a href="<?php echo esc_url( home_url( '/calculadora-rescisao-trabalhista-clt-multa-fgts/' ) ); ?>" class="quick-tool-item">
					<span class="quick-tool-icon" aria-hidden="true">📊</span>
					<div>
						<strong>Simulador de Rescisão CLT</strong>
						<span>Saldo de salário, férias, 13º e multa FGTS</span>
					</div>
					<span class="quick-tool-arrow" aria-hidden="true">&rarr;</span>
				</a>

				<a href="<?php echo esc_url( home_url( '/calculadora-seguro-desemprego-valor-quantidade-parcelas/' ) ); ?>" class="quick-tool-item">
					<span class="quick-tool-icon" aria-hidden="true">🛡️</span>
					<div>
						<strong>Calculadora de Seguro-Desemprego</strong>
						<span>Valor e quantidade de parcelas (3 a 5x)</span>
					</div>
					<span class="quick-tool-arrow" aria-hidden="true">&rarr;</span>
				</a>

				<a href="<?php echo esc_url( home_url( '/calculadora-de-ferias-clt-terco-constitucional-abono/' ) ); ?>" class="quick-tool-item">
					<span class="quick-tool-icon" aria-hidden="true">🏖️</span>
					<div>
						<strong>Calculadora de Férias + 1/3</strong>
						<span>Valor líquido e abono de 10 dias</span>
					</div>
					<span class="quick-tool-arrow" aria-hidden="true">&rarr;</span>
				</a>

				<a href="<?php echo esc_url( home_url( '/calculadora-imposto-de-renda-mensal-irpf-salario-liquido/' ) ); ?>" class="quick-tool-item">
					<span class="quick-tool-icon" aria-hidden="true">🦁</span>
					<div>
						<strong>Simulador de IRPF e Salário Líquido</strong>
						<span>Isenção até R$ 5.000 (Lei nº 15.270/2025)</span>
					</div>
					<span class="quick-tool-arrow" aria-hidden="true">&rarr;</span>
				</a>
			</div>
		</section>

		<!-- 2. NAVEGAÇÃO POR ASSUNTO (Ícones oficiais do kit com alt descritivo) -->
		<section class="utility-hub-section" aria-label="Categorias de Utilidade Pública">
			<div class="section-header">
				<h2 class="section-title">Consultas por Categoria</h2>
			</div>

			<div class="utility-grid">
				<a href="<?php echo esc_url( home_url( '/category/beneficios-trabalhador/' ) ); ?>" class="utility-card">
					<div class="utility-card-header">
						<div class="utility-icon">
							<?php if ( $url_icon_beneficios ) : ?>
								<img src="<?php echo esc_url( $url_icon_beneficios ); ?>" alt="Ilustração de benefícios e direitos do trabalhador" width="54" height="54" loading="lazy" decoding="async" />
							<?php else : ?>
								<span aria-hidden="true">📋</span>
							<?php endif; ?>
						</div>
						<h3>Benefícios & Trabalhador</h3>
					</div>
					<p>INSS, FGTS, Bolsa Família, PIS/PASEP, BPC/LOAS e Seguro-Desemprego.</p>
					<span class="utility-card-cta">Ver guias de benefícios &rarr;</span>
				</a>

				<a href="<?php echo esc_url( home_url( '/category/documentos-gov-br/' ) ); ?>" class="utility-card">
					<div class="utility-card-header">
						<div class="utility-icon">
							<?php if ( $url_icon_documentos ) : ?>
								<img src="<?php echo esc_url( $url_icon_documentos ); ?>" alt="Ilustração de documentos e serviços Gov.br" width="54" height="54" loading="lazy" decoding="async" />
							<?php else : ?>
								<span aria-hidden="true">🪪</span>
							<?php endif; ?>
						</div>
						<h3>Documentos & Gov.br</h3>
					</div>
					<p>Nova Carteira de Identidade (CIN), CNH Digital, CPF, Certidões e MEI.</p>
					<span class="utility-card-cta">Ver guias de documentos &rarr;</span>
				</a>

				<a href="<?php echo esc_url( home_url( '/category/contas-financas/' ) ); ?>" class="utility-card">
					<div class="utility-card-header">
						<div class="utility-icon">
							<?php if ( $url_icon_financas ) : ?>
								<img src="<?php echo esc_url( $url_icon_financas ); ?>" alt="Ilustração de contas e finanças pessoais" width="54" height="54" loading="lazy" decoding="async" />
							<?php else : ?>
								<span aria-hidden="true">💳</span>
							<?php endif; ?>
						</div>
						<h3>Contas & Finanças</h3>
					</div>
					<p>Valores a Receber (BC), Tarifa Social de Energia, Câmbio e Restituição do IRPF.</p>
					<span class="utility-card-cta">Ver guias financeiros &rarr;</span>
				</a>

				<a href="<?php echo esc_url( home_url( '/category/calculadoras-simuladores/' ) ); ?>" class="utility-card">
					<div class="utility-card-header">
						<div class="utility-icon">
							<?php if ( $url_icon_calculadoras ) : ?>
								<img src="<?php echo esc_url( $url_icon_calculadoras ); ?>" alt="Ilustração de calculadoras trabalhistas" width="54" height="54" loading="lazy" decoding="async" />
							<?php else : ?>
								<span aria-hidden="true">🧮</span>
							<?php endif; ?>
						</div>
						<h3>Calculadoras & Simuladores</h3>
					</div>
					<p>Simuladores gratuitos com memória de cálculo oficial passo a passo.</p>
					<span class="utility-card-cta">Abrir simuladores &rarr;</span>
				</a>
			</div>

			<!-- Atalhos de Consulta Recorrente: Calendário de Benefícios 2026 + Roteiro Onde Resolver -->
			<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1rem; margin-top:1rem;">
				<a href="<?php echo esc_url( home_url( '/calendario-de-beneficios/' ) ); ?>" class="quick-tool-item" style="border-left:4px solid #178b4b; padding:1rem 1.25rem;">
					<span class="quick-tool-icon" aria-hidden="true">📅</span>
					<div>
						<strong>Calendário de Pagamentos de Benefícios 2026</strong>
						<span>Filtre por final do NIS/Benefício: Bolsa Família, INSS/BPC e PIS/PASEP (sem informar CPF)</span>
					</div>
					<span class="quick-tool-arrow" aria-hidden="true">&rarr;</span>
				</a>

				<a href="<?php echo esc_url( home_url( '/calendario-de-beneficios/#onde-resolver' ) ); ?>" class="quick-tool-item" style="border-left:4px solid #102b57; padding:1rem 1.25rem;">
					<span class="quick-tool-icon" aria-hidden="true">🧭</span>
					<div>
						<strong>Roteiro “Onde Resolver?” &amp; Guia CadÚnico / CRAS</strong>
						<span>Escolha uma tarefa e veja quais documentos levar e o link oficial (.gov.br)</span>
					</div>
					<span class="quick-tool-arrow" aria-hidden="true">&rarr;</span>
				</a>
			</div>
		</section>
	<?php endif; ?>

	<!-- 3. SEÇÃO DE GUIAS E ARTIGOS (Heading H1 textual semântico + Introdução na Página 2) -->
	<div class="site-main-grid">
		<div class="content-area">
			<div class="section-header" style="flex-direction:column; align-items:flex-start; gap:0.4rem;">
				<h1 class="section-title" style="font-size:1.45rem;">
					<?php
					$paged_num = max( 1, (int) get_query_var( 'paged' ), (int) get_query_var( 'page' ) );
					if ( is_category() ) {
						single_cat_title( 'Guias sobre: ' );
						if ( $paged_num > 1 ) {
							echo ' — página ' . esc_html( $paged_num );
						}
					} elseif ( is_search() ) {
						printf( 'Resultados da busca por: "%s"', get_search_query() );
					} elseif ( $paged_num > 1 ) {
						echo 'Guias do Cidadão — página ' . esc_html( $paged_num );
					} else {
						echo 'Guia do Cidadão: benefícios, documentos e calculadoras';
					}
					?>
				</h1>
				<?php if ( ! is_category() && ! is_search() && $paged_num > 1 ) : ?>
					<p style="color:#475569; font-size:0.94rem; margin:0; line-height:1.55;">
						Confira abaixo mais guias práticos do nosso arquivo com orientações passo a passo sobre restituição do IRPF, Tarifa Social de Energia, Sistema Valores a Receber (BC), situação cadastral do CPF, níveis Prata e Ouro da conta Gov.br, Nova Carteira de Identidade (CIN), Bolsa Família, Meu INSS e FGTS.
					</p>
				<?php endif; ?>
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
