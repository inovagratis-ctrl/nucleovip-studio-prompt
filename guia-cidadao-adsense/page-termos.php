<?php
/**
 * Template Name: Termos e Condições de Uso (AdSense)
 */
get_header();
$site_name = get_bloginfo( 'name' );
?>
<main id="primary" class="site-main container">
	<div class="site-main-grid">
		<div class="content-area">
			<article class="single-article-card">
				<span class="post-category-badge">Termos Legais</span>
				<h1 class="entry-title">Termos e Condições Gerais de Uso</h1>
				<div class="entry-meta-bar">
					<span class="updated-badge">✔ Transparência Editorial e Isenção de Vínculo Governamental</span>
				</div>

				<div class="entry-content">
					<p>Bem-vindo ao <strong><?php echo esc_html( $site_name ); ?></strong>. Ao acessar e utilizar este portal, você concorda integralmente com os Termos e Condições de Uso descritos abaixo.</p>

					<h2>1. Natureza Informativa e Isenção de Vínculo Oficial</h2>
					<div class="gov-callout warning">
						<span class="gov-callout-title">⚠️ Aviso Importante de Não-Afiliação Governamental:</span>
						<p style="margin-bottom:0;">O portal <strong><?php echo esc_html( $site_name ); ?></strong> é um site informativo e jornalístico independente de iniciativa privada. <strong>Não representamos nem possuímos vínculo com o Governo Federal (Gov.br), INSS, Caixa Econômica Federal, Receita Federal, Detran ou prefeituras.</strong> Todos os nossos guias têm caráter exclusivamente educativo e orientativo, baseados em dados públicos oficiais.</p>
					</div>

					<h2>2. Uso das Calculadoras e Simuladores</h2>
					<p>As ferramentas de cálculo disponíveis neste portal (como simuladores de Férias, Rescisão Trabalhista e 13º Salário) realizam estimativas baseadas nas alíquotas vigentes da legislação brasileira (CLT, INSS e IRRF). Os resultados possuem caráter meramente informativo e não substituem o demonstrativo oficial emitido pelo empregador, contador ou órgão público competente.</p>

					<h2>3. Fontes de Informação e Direitos Autorais</h2>
					<p>Nossas matérias utilizam informações públicas oficiais (como comunicados da Agência Brasil/EBC, Agência Senado, Agência Câmara e Diário Oficial da União), sempre acompanhadas da devida verificação e citação da fonte primária.</p>

					<h2>4. Segurança do Usuário</h2>
					<p>Nunca solicitamos depósito prévio, taxas de liberação de benefícios, senhas do aplicativo Gov.br ou códigos de segurança por WhatsApp ou comentários.</p>
				</div>
			</article>
		</div>
		<?php get_sidebar(); ?>
	</div>
</main>
<?php
get_footer();
