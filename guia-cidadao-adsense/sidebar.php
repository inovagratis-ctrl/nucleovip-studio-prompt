<aside id="secondary" class="widget-area" role="complementary" aria-label="Barra Lateral">
	<!-- Widget 1: Acesso Rápido às Calculadoras (Aumenta Retenção e RPM AdSense) -->
	<div class="widget-card">
		<h3 class="widget-title">🧮 Ferramentas do Trabalhador</h3>
		<ul class="popular-utility-list">
			<li><a href="<?php echo esc_url( home_url( '/calculadoras/#calc-rescisao' ) ); ?>"><span>📊</span> Simulador de Rescisão CLT + 40%</a></li>
			<li><a href="<?php echo esc_url( home_url( '/calculadoras/#calc-ferias' ) ); ?>"><span>🏖️</span> Calculadora de Férias + 1/3</a></li>
			<li><a href="<?php echo esc_url( home_url( '/calculadoras/#calc-decimo' ) ); ?>"><span>💰</span> Cálculo do 13º Salário</a></li>
		</ul>
	</div>

	<!-- Widget 2: Canais Oficiais de Consulta (Sinal de Confiança E-E-A-T para o Google) -->
	<div class="widget-card">
		<h3 class="widget-title">🏛️ Acesso Rápido Fontes Oficiais</h3>
		<ul class="popular-utility-list">
			<li><a href="https://www.gov.br/pt-br" target="_blank" rel="noopener nofollow"><span>🔗</span> Portal Único Gov.br</a></li>
			<li><a href="https://meu.inss.gov.br/" target="_blank" rel="noopener nofollow"><span>🔗</span> Meu INSS (Consulta Benefícios)</a></li>
			<li><a href="https://servicos.receita.fazenda.gov.br/" target="_blank" rel="noopener nofollow"><span>🔗</span> Receita Federal (Situação CPF)</a></li>
			<li><a href="https://www.caixa.gov.br/" target="_blank" rel="noopener nofollow"><span>🔗</span> Caixa (FGTS e Benefícios Sociais)</a></li>
		</ul>
	</div>

	<!-- Widget 3: Bloco AdSense Fixo (Sticky Sidebar 300x600 / 300x250 - Maior Visibilidade Active View) -->
	<div class="sticky-sidebar-container">
		<?php echo guia_cidadao_render_ad( 'adsense_sidebar_code', 'ad-sidebar-sticky', 'Anúncio Lateral Fixo (Sticky 300x600 ou 300x250)' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
</aside>
