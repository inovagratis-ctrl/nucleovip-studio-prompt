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
				<span class="post-category-badge">Expediente & Governança Editorial (E-E-A-T)</span>
				<h1 class="entry-title">Sobre Nós, Expediente Editorial e Metodologia de Revisão Técnica</h1>
				<div class="entry-meta-bar">
					<span class="updated-badge">✔ Transparência Editorial, Fontes Primárias e Auditoria de Cálculos 2026</span>
				</div>

				<div class="entry-content">
					<p>O portal <strong><?php echo esc_html( $site_name ); ?></strong> (<code>https://nucleovip.com.br</code>) é uma plataforma independente de utilidade pública dedicada a traduzir a legislação trabalhista, previdenciária e tributária brasileira em guias passo a passo claros e simuladores gratuitos de código auditável.</p>

					<h2>1. Expediente e Responsabilidade Editorial</h2>
					<div class="gov-callout">
						<span class="gov-callout-title">📋 Equipe Responsável e Contato Institucional:</span>
						<ul style="margin-bottom:0;">
							<li><strong>Direção e Edição-Chefe:</strong> Eusimar Teixeira — Editor e Analista de Sistemas de Informação Pública (Contato direto: <code>contato@nucleovip.com.br</code>).</li>
							<li><strong>Núcleo de Revisão Trabalhista e Previdenciária:</strong> Equipe Editorial Núcleo VIP — Especializada na conferência de tabelas paramétricas do INSS, Receita Federal (IRPF), eSocial e Consolidação das Leis do Trabalho (CLT).</li>
							<li><strong>Canal de Correções e Ouvidoria:</strong> <a href="<?php echo esc_url( home_url( '/contato/' ) ); ?>">https://nucleovip.com.br/contato/</a> (Prazo de revisão técnica: até 24 horas úteis).</li>
						</ul>
					</div>

					<h2>2. Base Normativa das Calculadoras (Vigência 2026)</h2>
					<p>Todas as calculadoras trabalhistas e previdenciárias do portal utilizam parâmetros oficiais documentados e verificáveis pelo leitor:</p>
					<ul>
						<li><strong>Tabela Progressiva do INSS e Salário Mínimo (R$ 1.621,00 em 2026):</strong> <a href="https://www.gov.br/previdencia/pt-br/assuntos/rpps/documentos/PortariaInterministerialMPSMF13de9dejaneirode2026.pdf" target="_blank" rel="noopener nofollow">Portaria Interministerial MPS/MF nº 13, de 9 de janeiro de 2026</a> (Faixas de R$ 1.621,00 a R$ 8.708,55 com alíquotas progressivas de 7,5%, 9%, 12% e 14%).</li>
						<li><strong>Isenção de IRPF/IRRF até R$ 5.000,00 (Salário e 13º Salário):</strong> <a href="https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15270.htm" target="_blank" rel="noopener nofollow">Lei Federal nº 15.270/2025</a> (Isenção total para rendimentos mensais e 13º até R$ 5.000,00 e redução gradual até R$ 7.350,00).</li>
						<li><strong>Prazos e Regras do 13º Salário (Gratificação de Natal):</strong> <a href="https://www.planalto.gov.br/ccivil_03/leis/l4749.htm" target="_blank" rel="noopener nofollow">Lei Federal nº 4.749, de 12 de agosto de 1965</a> e <a href="https://www.gov.br/esocial/pt-br/noticias/como-pagar-a-primeira-parcela-do-13o-salario" target="_blank" rel="noopener nofollow">Manual Oficial do eSocial</a> (1ª parcela até <strong>30 de novembro</strong> — segunda-feira, 30/11/2026 — e 2ª parcela com prazo legal até <strong>20 de dezembro</strong>, antecipado operacionalmente em 2026 para <strong>18/12/2026, sexta-feira</strong>, por 20/12 cair no domingo).</li>
						<li><strong>Férias e Rescisão de Contrato de Trabalho:</strong> <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="noopener nofollow">Decreto-Lei nº 5.452/1943 (CLT)</a> e Lei nº 13.467/2017.</li>
						<li><strong>Seguro-Desemprego:</strong> <a href="https://www.planalto.gov.br/ccivil_03/leis/l7998.htm" target="_blank" rel="noopener nofollow">Lei nº 7.998/1990</a> e resoluções do CODEFAT/MTE.</li>
					</ul>

					<h2>3. Limitações das Simulações e Isenção de Vínculo Oficial</h2>
					<p>Os resultados apresentados por nossas calculadoras representam <strong>estimativas paramétricas</strong> para contratos de trabalho padrão com salário fixo. Situações específicas — como médias de horas extras, comissões, adicionais de insalubridade/periculosidade, faltas injustificadas, pensão alimentícia ou cláusulas mais benéficas de Convenção Coletiva de Trabalho (CCT) — podem alterar os valores finais constantes no holerite ou TRCT emitido pelo empregador.</p>

					<h2>4. Financiamento e Publicidade</h2>
					<p>O acesso a todos os guias e simuladores é 100% gratuito e independe de cadastro. O portal é mantido por meio de publicidade contextual identificada sob o rótulo "Publicidade", respeitando integralmente a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).</p>
				</div>
			</article>
		</div>
		<?php get_sidebar(); ?>
	</div>
</main>
<?php
get_footer();
