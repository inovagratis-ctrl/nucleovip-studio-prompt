<?php
/**
 * Template Name: Fale Conosco e Ouvidoria (AdSense)
 */

$sent       = false;
$error_msg  = '';

// Processamento Server-Side do Formulário (O e-mail de destino fica oculto no servidor e NUNCA aparece no HTML público)
if ( 'POST' === $_SERVER['REQUEST_METHOD'] && isset( $_POST['guia_contato_submit'] ) ) {
	$nome     = isset( $_POST['nome'] ) ? sanitize_text_field( wp_unslash( $_POST['nome'] ) ) : '';
	$email    = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
	$assunto  = isset( $_POST['assunto'] ) ? sanitize_text_field( wp_unslash( $_POST['assunto'] ) ) : 'duvida';
	$mensagem = isset( $_POST['mensagem'] ) ? sanitize_textarea_field( wp_unslash( $_POST['mensagem'] ) ) : '';
	$honeypot = isset( $_POST['website_url'] ) ? sanitize_text_field( wp_unslash( $_POST['website_url'] ) ) : '';

	if ( empty( $honeypot ) && ! empty( $nome ) && is_email( $email ) && ! empty( $mensagem ) ) {
		$assuntos_map = array(
			'duvida'      => 'Dúvida ou Sugestão de Guia',
			'correcao'    => 'Comunicar Atualização / Correção',
			'privacidade' => 'Privacidade de Dados (LGPD)',
			'publicidade' => 'Parcerias e Publicidade',
		);
		$assunto_label = isset( $assuntos_map[ $assunto ] ) ? $assuntos_map[ $assunto ] : 'Contato do Leitor';

		// Redirecionamento interno para a caixa do administrador (invisível ao público)
		$destino_interno = 'eusimar72@gmail.com';
		$subject         = sprintf( '[Núcleo VIP - %s] Mensagem de %s', $assunto_label, $nome );
		$body            = "Nova mensagem enviada pelo formulário oficial (contato@nucleovip.com.br):\n\n";
		$body           .= "Nome: {$nome}\n";
		$body           .= "E-mail do Leitor: {$email}\n";
		$body           .= "Assunto: {$assunto_label}\n";
		$body           .= "Data/Hora: " . current_time( 'd/m/Y H:i:s' ) . "\n";
		$body           .= "--------------------------------------------------\n\n";
		$body           .= $mensagem . "\n";

		$headers = array(
			'Content-Type: text/plain; charset=UTF-8',
			'From: Ouvidoria Núcleo VIP <contato@nucleovip.com.br>',
			'Reply-To: ' . $nome . ' <' . $email . '>',
		);

		// Envia para o e-mail redirecionado e salva registro de backup no banco
		@wp_mail( $destino_interno, $subject, $body, $headers );

		$log = get_option( 'guia_cidadao_contato_log', array() );
		if ( ! is_array( $log ) ) {
			$log = array();
		}
		array_unshift( $log, array(
			'data'     => current_time( 'Y-m-d H:i:s' ),
			'nome'     => $nome,
			'email'    => $email,
			'assunto'  => $assunto_label,
			'mensagem' => $mensagem,
		) );
		update_option( 'guia_cidadao_contato_log', array_slice( $log, 0, 100 ), false );

		$sent = true;
	} else {
		$error_msg = 'Por favor, preencha todos os campos obrigatórios com um e-mail válido.';
	}
} elseif ( isset( $_GET['enviado'] ) && '1' === $_GET['enviado'] ) {
	$sent = true;
}

get_header();
$site_name = get_bloginfo( 'name' );
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
					<p>Tem alguma dúvida sobre o conteúdo publicado no <strong><?php echo esc_html( $site_name ); ?></strong>, deseja sugerir uma pauta de utilidade pública, reportar uma atualização legislativa ou tratar de assuntos publicitários e de privacidade (LGPD)? Envie sua mensagem pelo formulário abaixo ou diretamente para o nosso canal institucional: <strong><a href="mailto:contato@nucleovip.com.br">contato@nucleovip.com.br</a></strong>.</p>

					<div class="gov-callout warning">
						<span class="gov-callout-title">🔒 Lembrete de Segurança ao Cidadão:</span>
						<p style="margin-bottom:0;">Por sua segurança, <strong>nunca envie número de CPF, senhas do Gov.br ou dados bancários</strong> neste formulário. Não realizamos atendimento em nome do INSS ou da Caixa Econômica Federal.</p>
					</div>

					<div class="gov-callout success" id="contato-sucesso" style="<?php echo $sent ? '' : 'display:none;'; ?>">
						<span class="gov-callout-title">✅ Mensagem encaminhada com sucesso à Ouvidoria!</span>
						<p style="margin-bottom:0;">Nossa equipe editorial recebeu sua mensagem através da central <strong>contato@nucleovip.com.br</strong> e responderá pelo e-mail informado em até 48 horas úteis.</p>
					</div>
					<script>
					if (window.location.search.indexOf('enviado=1') !== -1) {
						var el = document.getElementById('contato-sucesso');
						if (el) el.style.display = 'block';
					}
					</script>

					<?php if ( ! empty( $error_msg ) ) : ?>
						<div class="gov-callout warning">
							<span class="gov-callout-title">⚠️ Atenção:</span>
							<p style="margin-bottom:0;"><?php echo esc_html( $error_msg ); ?></p>
						</div>
					<?php endif; ?>

					<form method="post" action="/contato/" class="calc-box" style="margin-top:1.5rem;">
						<input type="hidden" name="guia_contato_submit" value="1">
						<div style="display:none;" aria-hidden="true">
							<input type="text" name="website_url" tabindex="-1" autocomplete="off">
						</div>
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
						<p style="font-size:0.82rem; color:#64748b; margin-top:0.75rem; margin-bottom:0;">Canal oficial de atendimento: <strong>contato@nucleovip.com.br</strong> • Tempo médio de resposta: até 48h úteis.</p>
					</form>
				</div>
			</article>
		</div>
		<?php get_sidebar(); ?>
	</div>
</main>
<?php
get_footer();
