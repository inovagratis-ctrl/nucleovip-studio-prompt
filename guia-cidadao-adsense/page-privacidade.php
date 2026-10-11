<?php
/**
 * Template Name: Política de Privacidade e Cookies (AdSense + LGPD)
 */
get_header();
$site_name = get_bloginfo( 'name' );
$site_url  = home_url( '/' );
?>
<main id="primary" class="site-main container">
	<div class="site-main-grid">
		<div class="content-area">
			<article class="single-article-card">
				<span class="post-category-badge">Documento Oficial de Transparência</span>
				<h1 class="entry-title">Política de Privacidade e Uso de Cookies (LGPD & Google AdSense)</h1>
				<div class="entry-meta-bar">
					<span class="updated-badge">✔ Em conformidade com a Lei nº 13.709/2018 (LGPD) e Políticas do Google AdSense</span>
				</div>

				<div class="entry-content">
					<p>A sua privacidade é prioridade para o portal <strong><?php echo esc_html( $site_name ); ?></strong> (<a href="<?php echo esc_url( $site_url ); ?>"><?php echo esc_url( $site_url ); ?></a>). Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos as informações dos usuários que visitam nosso portal de utilidade pública.</p>

					<h2>1. Coleta de Dados e Finalidade (LGPD)</h2>
					<p>Nosso portal é de consulta pública e gratuita. Não exigimos cadastro, senhas governamentais (como senha Gov.br) ou dados bancários para leitura dos nossos artigos ou uso das nossas calculadoras trabalhistas (os cálculos são processados diretamente no seu navegador, sem armazenamento em nossos servidores).</p>
					<p>Coletamos apenas dados técnicos anônimos de navegação (endereço IP, tipo de navegador, páginas visitadas e tempo de permanência) para fins estatísticos, segurança cibernética e exibição de publicidade contextualizada.</p>

					<h2>2. Cookies do Google AdSense e DoubleClick DART</h2>
					<div class="gov-callout">
						<span class="gov-callout-title">Declaração Obrigatória de Publicidade Google AdSense:</span>
						<ul>
							<li>O Google, como fornecedor terceirizado, utiliza cookies para exibir anúncios neste portal (<strong><?php echo esc_html( $site_name ); ?></strong>).</li>
							<li>Com o <strong>cookie DART</strong> (e identificadores equivalentes de publicidade), o Google pode exibir anúncios para os visitantes com base nas visitas feitas a este e a outros sites na internet.</li>
							<li>Os usuários podem desativar o uso do cookie DART e a personalização de anúncios a qualquer momento acessando as <a href="https://adssettings.google.com/" target="_blank" rel="noopener nofollow">Configurações de Anúncios do Google</a> ou visitando a página da Política de Privacidade da rede de conteúdo e dos anúncios do Google em <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener nofollow">https://policies.google.com/technologies/ads</a>.</li>
						</ul>
					</div>

					<h2>3. Gerenciamento e Desativação de Cookies</h2>
					<p>Você pode optar por desativar os cookies diretamente nas configurações do seu navegador (Google Chrome, Mozilla Firefox, Microsoft Edge ou Safari). Note que a desativação de cookies não impede o acesso gratuito ao nosso conteúdo informativo.</p>

					<h2>4. Direitos do Titular de Dados (Art. 18 da LGPD)</h2>
					<p>Em cumprimento à Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018), você tem o direito de solicitar informações, correção ou exclusão de eventuais dados enviados voluntariamente por meio da nossa página de contato.</p>

					<h2>5. Canal de Contato do Encarregado (DPO)</h2>
					<p>Para dúvidas relacionadas a esta Política de Privacidade, utilize nossa página oficial de <a href="<?php echo esc_url( home_url( '/contato/' ) ); ?>">Fale Conosco / Ouvidoria</a>.</p>
				</div>
			</article>
		</div>
		<?php get_sidebar(); ?>
	</div>
</main>
<?php
get_footer();
