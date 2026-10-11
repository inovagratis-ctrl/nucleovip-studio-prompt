<?php
/**
 * Template Name: Central de Calculadoras do Cidadão (Alto CTR AdSense)
 */
get_header();
?>
<main id="primary" class="site-main container">
	<div class="site-main-grid">
		<div class="content-area">
			<article class="single-article-card">
				<span class="post-category-badge">Ferramentas Gratuitas CLT</span>
				<h1 class="entry-title">Calculadoras Trabalhistas e Simuladores do Cidadão</h1>
				<div class="entry-meta-bar">
					<span class="updated-badge">✔ Tabelas INSS, FGTS e CLT Atualizadas</span>
					<span>Cálculo instantâneo e 100% gratuito</span>
				</div>

				<div class="entry-content">
					<p>Utilize nossos simuladores gratuitos abaixo para calcular rapidamente o valor estimado das suas <strong>Férias Remuneradas (com 1/3 constitucional)</strong>, <strong>Acerto de Rescisão Trabalhista CLT (com multa de 40% do FGTS)</strong> e <strong>13º Salário</strong>.</p>

					<?php echo guia_cidadao_render_ad( 'adsense_p2_code', 'ad-in-article', 'Anúncio Acima das Calculadoras (Altíssimo CTR)' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>

					<?php echo do_shortcode( '[calculadora_rescisao]' ); ?>

					<?php echo guia_cidadao_render_ad( 'adsense_p5_code', 'ad-in-article', 'Anúncio Entre Calculadoras (Meio da Página)' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>

					<?php echo do_shortcode( '[calculadora_ferias]' ); ?>

					<?php echo do_shortcode( '[calculadora_decimo_terceiro]' ); ?>

					<?php echo guia_cidadao_render_ad( 'adsense_end_code', 'ad-in-article', 'Anúncio Abaixo do Resultado das Calculadoras' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</div>
			</article>
		</div>
		<?php get_sidebar(); ?>
	</div>
</main>
<?php
get_footer();
