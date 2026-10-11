<footer class="site-footer" role="contentinfo">
	<div class="container">
		<div class="footer-grid">
			<div class="footer-col">
				<h4><?php bloginfo( 'name' ); ?> — Portal de Utilidade Pública</h4>
				<p>Nosso compromisso é traduzir leis, calendários oficiais, benefícios sociais e serviços públicos digitais em guias passo a passo claros, gratuitos e acessíveis para todos os cidadãos brasileiros.</p>
				<p style="margin-top:0.75rem; font-size:0.8rem; color:#93c5fd;">✔ Conteúdo baseado em fontes públicas oficiais (Gov.br, Agência Brasil, Diário Oficial da União e Ministério do Trabalho).</p>
			</div>

			<div class="footer-col">
				<h4>Categorias do Portal</h4>
				<ul class="footer-links">
					<li><a href="<?php echo esc_url( home_url( '/category/beneficios-trabalhador/' ) ); ?>">Benefícios & Trabalhador (INSS/FGTS)</a></li>
					<li><a href="<?php echo esc_url( home_url( '/category/documentos-gov-br/' ) ); ?>">Documentos & Gov.br (CIN/CNH/CPF)</a></li>
					<li><a href="<?php echo esc_url( home_url( '/category/contas-financas/' ) ); ?>">Contas, CPF & Finanças Populares</a></li>
					<li><a href="<?php echo esc_url( home_url( '/calculadoras/' ) ); ?>">Calculadoras Trabalhistas (CLT)</a></li>
				</ul>
			</div>

			<div class="footer-col">
				<h4>Transparência & Legal (AdSense)</h4>
				<ul class="footer-links">
					<li><a href="<?php echo esc_url( home_url( '/sobre-nos/' ) ); ?>">Sobre Nós e Expediente Editorial</a></li>
					<li><a href="<?php echo esc_url( home_url( '/politica-de-privacidade/' ) ); ?>">Política de Privacidade e Cookies (LGPD)</a></li>
					<li><a href="<?php echo esc_url( home_url( '/termos-de-uso/' ) ); ?>">Termos e Condições de Uso</a></li>
					<li><a href="<?php echo esc_url( home_url( '/contato/' ) ); ?>">Fale Conosco / Ouvidoria</a></li>
					<li><a href="<?php echo esc_url( home_url( '/ads.txt' ) ); ?>">Arquivo ads.txt Oficial</a></li>
				</ul>
			</div>
		</div>

		<!-- Aviso Legal Obrigatório para Sites de Utilidade Pública no Google AdSense -->
		<div class="footer-disclaimer-box">
			<strong>⚠️ AVISO DE ISENÇÃO DE VÍNCULO GOVERNAMENTAL (TRANSPARÊNCIA):</strong> O portal <strong><?php bloginfo( 'name' ); ?></strong> é um veículo jornalístico e informativo independente de caráter privado. <strong>NÃO</strong> possuímos qualquer vínculo com o Governo Federal, Caixa Econômica Federal, INSS, Receita Federal, Detran ou qualquer outro órgão público. Não solicitamos senhas, dados bancários ou pagamentos para liberação de benefícios. Para realizar consultas oficiais que exijam login, utilize sempre os canais oficiais <code>gov.br</code>.
		</div>

		<div class="footer-bottom">
			<p>&copy; <?php echo esc_html( date_i18n( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. Todos os direitos reservados. Desenvolvido com foco em acessibilidade e alta velocidade.</p>
		</div>
	</div>
</footer>

<!-- Barra de Consentimento de Cookies LGPD / Google DART Cookie -->
<div class="lgpd-cookie-banner hidden" id="lgpd-banner" role="dialog" aria-label="Aviso de Cookies e Privacidade">
	<div>
		<strong>🍪 Privacidade e Transparência (LGPD):</strong> Utilizamos cookies próprios e de terceiros (incluindo o Google AdSense / DoubleClick DART) para personalizar anúncios e melhorar sua experiência de consulta. Ao continuar navegando, você concorda com nossa <a href="<?php echo esc_url( home_url( '/politica-de-privacidade/' ) ); ?>">Política de Privacidade</a> e <a href="<?php echo esc_url( home_url( '/termos-de-uso/' ) ); ?>">Termos de Uso</a>.
	</div>
	<button type="button" class="lgpd-btn" id="lgpd-accept-btn">Entendi e Aceito</button>
</div>

<?php wp_footer(); ?>
</body>
</html>
