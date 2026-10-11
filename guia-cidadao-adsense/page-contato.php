<?php
/**
 * Template Name: Fale Conosco e Ouvidoria (AdSense)
 */
get_header();
$site_name = get_bloginfo( 'name' );
$sent      = isset( $_GET['enviado'] ) && '1' === $_GET['enviado'];
?>
<main id="primary" class="site-main container">
	<div class="site-main-grid">
		<div class="content-area">
			<article class="single-article-card">
				<span class="post-category-badge">Atendimento ao Leitor</span>
				<h1 class="entry-title">Fale Conosco / Ouvidoria Editorial</h1>
				<div class="entry-meta-bar">
					<span class="updated-badge">✔ Canal de Atendimento e Sugestão de Pautas</span>
				</div>

				<div class="entry-content">
					<p>Tem alguma dúvida sobre o conteúdo publicado no <strong><?php echo esc_html( $site_name ); ?></strong>, deseja sugerir uma pauta de utilidade pública, reportar um erro ou tratar de assuntos publicitários e de privacidade (LGPD)? Envie sua mensagem abaixo.</p>

					<div class="gov-callout warning">
						<span class="gov-callout-title">🔒 Lembrete de Segurança ao Cidadão:</span>
						<p style="margin-bottom:0;">Por sua segurança, <strong>nunca envie número de CPF, senhas do Gov.br ou dados bancários</strong> neste formulário. Não realizamos atendimento em nome do INSS ou da Caixa Econômica Federal.</p>
					</div>

					<?php if ( $sent ) : ?>
						<div class="gov-callout success">
							<span class="gov-callout-title">✅ Mensagem recebida com sucesso!</span>
							<p style="margin-bottom:0;">Nossa equipe editorial analisará sua mensagem e responderá pelo e-mail informado em até 48 horas úteis.</p>
						</div>
					<?php endif; ?>

					<form method="get" action="<?php echo esc_url( home_url( '/contato/' ) ); ?>" class="calc-box" style="margin-top:1.5rem;">
						<input type="hidden" name="enviado" value="1">
						<div class="calc-grid">
							<div class="calc-field">
								<label for="contato-nome">Seu Nome</label>
								<input type="text" id="contato-nome" name="nome" required placeholder="Digite seu nome">
							</div>
							<div class="calc-field">
								<label for="contato-email">Seu E-mail</label>
								<input type="email" id="contato-email" name="email" required placeholder="seu@email.com.br">
							</div>
						</div>
						<div class="calc-field" style="margin-bottom:1rem;">
							<label for="contato-assunto">Assunto</label>
							<select id="contato-assunto" name="assunto">
								<option value="duvida">Dúvida ou Sugestão de Guia</option>
								<option value="correcao">Comunicar Atualização / Correção</option>
								<option value="privacidade">Privacidade de Dados (LGPD)</option>
								<option value="publicidade">Parcerias e Publicidade</option>
							</select>
						</div>
						<div class="calc-field" style="margin-bottom:1rem;">
							<label for="contato-mensagem">Mensagem</label>
							<textarea id="contato-mensagem" name="mensagem" rows="5" required style="width:100%; padding:0.75rem; border:1px solid #cbd5e1; border-radius:6px; font-family:inherit;" placeholder="Escreva sua mensagem..."></textarea>
						</div>
						<button type="submit" class="calc-btn">Enviar Mensagem para a Equipe</button>
					</form>
				</div>
			</article>
		</div>
		<?php get_sidebar(); ?>
	</div>
</main>
<?php
get_footer();
