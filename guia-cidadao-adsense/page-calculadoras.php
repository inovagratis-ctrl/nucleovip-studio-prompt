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
				<span class="post-category-badge">5 Ferramentas Oficiais Gratuitas</span>
				<h1 class="entry-title">Calculadoras do Cidadão: Seguro-Desemprego, Imposto de Renda, Rescisão, Férias e 13º Salário</h1>
				<div class="entry-meta-bar">
					<span class="updated-badge">✔ Tabelas Receita Federal, MTE, INSS e CLT Atualizadas</span>
					<span>Simulação instantânea e 100% gratuita</span>
				</div>

				<div class="entry-content">
					<p>Utilize nossas <strong>5 calculadoras oficiais e gratuitas</strong> abaixo para simular na hora o valor e a quantidade de parcelas do seu <strong>Seguro-Desemprego</strong>, o desconto de <strong>Imposto de Renda Mensal (IRPF e Salário Líquido)</strong>, o acerto de <strong>Rescisão Trabalhista CLT (com multa do FGTS)</strong>, <strong>Férias Remuneradas + 1/3</strong> e <strong>13º Salário</strong>.</p>

					<?php echo guia_cidadao_render_ad( 'adsense_p2_code', 'ad-in-article', 'Anúncio Acima das Calculadoras (Altíssimo CTR)' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>

					<?php echo do_shortcode( '[calculadora_seguro_desemprego]' ); ?>

					<?php echo do_shortcode( '[calculadora_irpf]' ); ?>

					<?php echo guia_cidadao_render_ad( 'adsense_p5_code', 'ad-in-article', 'Anúncio Entre Calculadoras (Meio da Página)' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>

					<?php echo do_shortcode( '[calculadora_rescisao]' ); ?>

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
