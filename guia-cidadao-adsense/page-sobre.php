<?php
/**
 * Template Name: Sobre Nós e Expediente Editorial (E-E-A-T AdSense)
 */
get_header();
$site_name = get_bloginfo( 'name' );
?>
<main id="primary" class="site-main container">
	<div class="site-main-grid">
		<div class="content-area">
			<article class="single-article-card">
				<span class="post-category-badge">Institucional & E-E-A-T</span>
				<h1 class="entry-title">Sobre Nós e Política Editorial de Verificação</h1>
				<div class="entry-meta-bar">
					<span class="updated-badge">✔ Compromisso com a Informação Pública Verificada</span>
				</div>

				<div class="entry-content">
					<p>O portal <strong><?php echo esc_html( $site_name ); ?></strong> nasceu com a missão de simplificar o acesso do cidadão brasileiro às informações de utilidade pública, direitos trabalhistas, benefícios sociais, emissão de documentos e educação financeira.</p>

					<h2>Nossa Metodologia de Apuração e Fontes Oficiais</h2>
					<p>Sabemos que informações sobre benefícios, calendários de pagamento e obrigações fiscais impactam diretamente a vida das famílias brasileiras. Por isso, todos os artigos publicados seguem um rigoroso protocolo editorial baseado exclusivamente em <strong>Fontes Primárias Oficiais</strong>:</p>
					<ul>
						<li><strong>Diário Oficial da União (DOU)</strong> e portarias ministeriais;</li>
						<li><strong>Agência Brasil (EBC)</strong>, <strong>Agência Senado</strong> e <strong>Agência Câmara de Notícias</strong>;</li>
						<li>Manuais públicos do <strong>Portal Gov.br</strong>, <strong>INSS</strong>, <strong>Caixa Econômica Federal</strong> e <strong>Receita Federal</strong>;</li>
						<li>Consolidação das Leis do Trabalho (CLT) e tabelas vigentes da Previdência Social.</li>
					</ul>

					<h2>Como Nos Mantemos Gratuitos (Transparência Publicitária)</h2>
					<p>Todo o conteúdo e todas as calculadoras do <strong><?php echo esc_html( $site_name ); ?></strong> são 100% gratuitos para o leitor. Para custear servidores, desenvolvimento técnico e equipe de redação, exibimos anúncios programáticos gerenciados pelo <strong>Google AdSense</strong>, sempre devidamente identificados com a etiqueta "Publicidade".</p>

					<h2>Correções e Direito de Resposta</h2>
					<p>Caso identifique qualquer informação desatualizada devido a mudanças recentes na legislação, entre em contato imediatamente pela nossa <a href="<?php echo esc_url( home_url( '/contato/' ) ); ?>">Ouvidoria / Fale Conosco</a> para revisão prioritária.</p>
				</div>
			</article>
		</div>
		<?php get_sidebar(); ?>
	</div>
</main>
<?php
get_footer();
