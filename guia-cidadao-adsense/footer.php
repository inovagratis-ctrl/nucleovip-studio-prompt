<footer class="site-footer" role="contentinfo">
	<div class="container">
		<div class="footer-grid">
			<div class="footer-col">
				<h4><?php bloginfo( 'name' ); ?> — Portal de Utilidade Pública</h4>
				<p>Nosso compromisso é traduzir a legislação trabalhista, portarias interministeriais, calendários oficiais e serviços públicos digitais em guias passo a passo e simuladores gratuitos, auditáveis e acessíveis para todos os cidadãos brasileiros.</p>
				<p style="margin-top:0.75rem; font-size:0.8rem; color:#93c5fd;">✔ Tabelas atualizadas conforme Portaria Interministerial MPS/MF nº 13, de 09/01/2026, CLT (Decreto-Lei nº 5.452/1943) e manuais oficiais do Portal Gov.br e eSocial.</p>
			</div>

			<div class="footer-col">
				<h4>Simuladores & Categorias</h4>
				<ul class="footer-links">
					<li><a href="<?php echo esc_url( home_url( '/simulador-decimo-terceiro-salario-1-e-2-parcela/' ) ); ?>">Simulador de 13º Salário (Tabela 2026)</a></li>
					<li><a href="<?php echo esc_url( home_url( '/calculadora-rescisao-trabalhista-clt-multa-fgts/' ) ); ?>">Calculadora de Rescisão CLT</a></li>
					<li><a href="<?php echo esc_url( home_url( '/calculadora-seguro-desemprego-valor-quantidade-parcelas/' ) ); ?>">Calculadora de Seguro-Desemprego</a></li>
					<li><a href="<?php echo esc_url( home_url( '/category/beneficios-trabalhador/' ) ); ?>">Benefícios & Trabalhador (INSS/FGTS)</a></li>
					<li><a href="<?php echo esc_url( home_url( '/category/documentos-gov-br/' ) ); ?>">Documentos & Gov.br (CIN/CNH/CPF)</a></li>
				</ul>
			</div>

			<div class="footer-col">
				<h4>Transparência & Expediente</h4>
				<ul class="footer-links">
					<li><a href="<?php echo esc_url( home_url( '/sobre-nos/' ) ); ?>">Sobre Nós, Expediente e Revisão Técnica</a></li>
					<li><a href="<?php echo esc_url( home_url( '/politica-de-privacidade/' ) ); ?>">Política de Privacidade e Cookies (LGPD)</a></li>
					<li><a href="<?php echo esc_url( home_url( '/termos-de-uso/' ) ); ?>">Termos e Condições de Uso</a></li>
					<li><a href="<?php echo esc_url( home_url( '/contato/' ) ); ?>">Fale Conosco / Reportar Correção</a></li>
					<li><a href="#gerenciar-cookies" id="lgpd-reopen-link">🍪 Gerenciar Preferências de Cookies</a></li>
				</ul>
			</div>
		</div>

		<!-- Aviso Legal Obrigatório para Sites de Utilidade Pública -->
		<div class="footer-disclaimer-box">
			<strong>⚠️ AVISO DE ISENÇÃO DE VÍNCULO GOVERNAMENTAL (TRANSPARÊNCIA):</strong> O portal <strong><?php bloginfo( 'name' ); ?></strong> é um veículo informativo independente de caráter privado (Contato institucional: <code>contato@nucleovip.com.br</code>). <strong>NÃO</strong> possuímos vínculo com o Governo Federal, Caixa Econômica Federal, INSS, Receita Federal ou Detran. Os simuladores fornecem estimativas baseadas na legislação vigente e não substituem demonstrativos oficiais.
		</div>

		<div class="footer-bottom">
			<p>&copy; <?php echo esc_html( date_i18n( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. Todos os direitos reservados.</p>
		</div>
	</div>
</footer>

<!-- Barra Compacta de Consentimento de Cookies LGPD (Com Aceitar, Rejeitar Não-Essenciais e Configurar) -->
<div class="lgpd-cookie-banner hidden" id="lgpd-banner" role="dialog" aria-label="Aviso de Privacidade e Controle de Cookies">
	<div class="lgpd-main-row">
		<div class="lgpd-text">
			<strong>🍪 Controle de Cookies (LGPD):</strong> Usamos cookies essenciais para funcionamento do site e, mediante seu consentimento, cookies analíticos e de publicidade. Veja nossa <a href="<?php echo esc_url( home_url( '/politica-de-privacidade/' ) ); ?>">Política de Privacidade</a>.
		</div>
		<div class="lgpd-actions">
			<button type="button" class="lgpd-btn lgpd-btn-outline" id="lgpd-prefs-btn">Preferências</button>
			<button type="button" class="lgpd-btn lgpd-btn-secondary" id="lgpd-reject-btn">Rejeitar Não-Essenciais</button>
			<button type="button" class="lgpd-btn lgpd-btn-primary" id="lgpd-accept-btn">Aceitar Todos</button>
		</div>
	</div>
	<div id="lgpd-prefs-panel" style="display:none; margin-top:0.75rem; padding-top:0.75rem; border-top:1px solid rgba(255,255,255,0.15); font-size:0.8rem;">
		<div style="display:flex; flex-wrap:wrap; gap:1.25rem; align-items:center; justify-content:space-between;">
			<div style="display:flex; flex-wrap:wrap; gap:1rem;">
				<label><input type="checkbox" checked disabled> <strong>Essenciais (Obrigatórios)</strong> — Segurança e cálculo local no navegador</label>
				<label><input type="checkbox" id="chk-cookie-analytics" checked> <strong>Analíticos</strong> — Métricas anônimas de desempenho</label>
				<label><input type="checkbox" id="chk-cookie-ads" checked> <strong>Publicidade (AdSense/DART)</strong> — Anúncios personalizados</label>
			</div>
			<button type="button" class="lgpd-btn lgpd-btn-primary" id="lgpd-save-prefs-btn">Salvar Minhas Escolhas</button>
		</div>
	</div>
</div>

<?php wp_footer(); ?>
</body>
</html>
