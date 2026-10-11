<?php
/**
 * Template Name: Calendário de Benefícios e Roteiro Onde Resolver
 * Página Central de Consulta Recorrente (Bolsa Família, INSS/BPC, PIS/PASEP + Roteiro "Onde Resolver?")
 * Sem coleta de CPF, senha Gov.br ou dados bancários.
 */
get_header();
?>

<main id="primary" class="site-main container">
	<div class="site-main-grid">
		<div class="content-area">
			<article class="single-article-card">
				<nav class="breadcrumbs" aria-label="Navegação estrutural">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>">Início</a>
					<span>&rsaquo;</span>
					<span>Calendário de Pagamentos de Benefícios 2026 &amp; Onde Resolver</span>
				</nav>

				<header class="entry-header">
					<span class="post-category-badge">Consulta Recorrente Oficial • Vigência 2026</span>
					<h1 class="entry-title">Calendário de Pagamentos de Benefícios 2026 (INSS/BPC, Bolsa Família e PIS/PASEP)</h1>
					<div class="entry-meta-bar">
						<span class="updated-badge">✔ Calendários Oficiais Verificados em Outubro/2026</span>
						<span>Fontes: <strong>MDS, INSS/MPS, Caixa e CODEFAT/MTE</strong></span>
					</div>
				</header>

				<div class="entry-content">
					<div class="official-alert" style="margin-top:0;">
						<strong>🔒 Consulta 100% Segura e Anônima:</strong> Use o filtro abaixo selecionando apenas o <strong>último dígito do seu NIS/Benefício</strong> ou o <strong>mês de nascimento</strong>. Este portal <strong>jamais solicita número de CPF, senha Gov.br ou dados bancários</strong>.
					</div>

					<!-- SIMULADOR DE CALENDÁRIO DE BENEFÍCIOS 2026 -->
					<div class="calc-box" id="box-calendario-beneficios">
						<div class="calc-header">
							<h3>📅 Consultar Datas de Pagamento 2026 por Final do Benefício / NIS</h3>
							<small style="color:#475569;">Vigência: Ano-Calendário 2026 • Revisado pela equipe editorial com base nos cronogramas do Governo Federal</small>
						</div>

						<div class="calc-grid">
							<div class="calc-field">
								<label for="cal-programa">1. Escolha o Benefício ou Programa</label>
								<select id="cal-programa" onchange="atualizarOpcoesCalendario2026()">
									<option value="bolsa_familia">Bolsa Família 2026 (Pelo último dígito do NIS)</option>
									<option value="inss_ate_1sm">INSS e BPC/LOAS — Até 1 Salário Mínimo (Pelo final do benefício)</option>
									<option value="inss_acima_1sm">INSS — Acima de 1 Salário Mínimo (Pelo final do benefício)</option>
									<option value="pis_pasep">Abono Salarial PIS/PASEP 2026 (Pelo mês de nascimento)</option>
								</select>
							</div>

							<div class="calc-field">
								<label for="cal-digito" id="label-cal-digito">2. Último dígito do NIS (1 a 0)</label>
								<select id="cal-digito">
									<option value="1">Final 1</option>
									<option value="2">Final 2</option>
									<option value="3">Final 3</option>
									<option value="4">Final 4</option>
									<option value="5">Final 5</option>
									<option value="6">Final 6</option>
									<option value="7">Final 7</option>
									<option value="8">Final 8</option>
									<option value="9">Final 9</option>
									<option value="0">Final 0</option>
								</select>
							</div>
						</div>

						<button type="button" class="calc-btn" onclick="consultarCalendarioBeneficios2026()">Ver Datas Oficiais de Pagamento em 2026</button>

						<div class="calc-result" id="resultado-calendario" style="display:block;">
							<span id="cal-titulo-resultado" style="font-weight:700; color:#102b57; font-size:1.05rem;">Selecione o programa e clique para exibir o cronograma completo de 2026.</span>
							<div id="cal-tabela-container" style="margin-top:0.85rem;"></div>
						</div>
					</div>

					<!-- ROTEIRO INTERATIVO "ONDE RESOLVER?" -->
					<h2 id="onde-resolver">🧭 Roteiro Rápido: “Onde Resolver?” (Guia de Atendimento Oficial)</h2>
					<p>Precisa resolver uma pendência cadastral, destravar um benefício ou emitir um documento sem cair em sites intermediários pagos? Selecione abaixo o que você precisa fazer hoje:</p>

					<?php echo do_shortcode( '[roteiro_onde_resolver]' ); ?>

					<h2>Regras Gerais dos Calendários de Pagamento em 2026</h2>
					<ul>
						<li><strong>Bolsa Família (MDS e Caixa Econômica Federal):</strong> Os depósitos ocorrem sempre nos <strong>últimos 10 dias úteis de cada mês</strong>, de forma escalonada conforme o último dígito do Número de Identificação Social (NIS) impresso no cartão. Em dezembro, o calendário é antecipado para encerrar antes do Natal. Municípios em estado de calamidade pública reconhecido pelo Governo Federal têm pagamento unificado no 1º dia do calendário.</li>
						<li><strong>Benefícios do INSS e BPC/LOAS (Ministério da Previdência Social):</strong> Para descobrir o dia de recebimento, observe o <strong>penúltimo algarismo</strong> do seu cartão de benefício (o número que fica imediatamente <strong>antes do traço</strong>, ignorando o dígito verificador após o hífen). Exemplo: no benefício <code>123.456.789-0</code>, o final considerado é o <strong>9</strong>.</li>
						<li><strong>Abono Salarial PIS/PASEP 2026 (CODEFAT / Ministério do Trabalho):</strong> O calendário é unificado pelo <strong>mês de nascimento</strong> tanto para trabalhadores da iniciativa privada (PIS, pago pela Caixa) quanto para servidores públicos (PASEP, pago pelo Banco do Brasil), com saques disponíveis até o encerramento do exercício em <strong>29 de dezembro de 2026</strong>.</li>
					</ul>

					<?php echo do_shortcode( '[infografico_consulta_segura]' ); ?>
				</div>
			</article>
		</div>

		<?php get_sidebar(); ?>
	</div>
</main>

<script>
function atualizarOpcoesCalendario2026() {
	var prog = document.getElementById('cal-programa').value;
	var selectDig = document.getElementById('cal-digito');
	var labelDig = document.getElementById('label-cal-digito');
	selectDig.innerHTML = '';

	if (prog === 'pis_pasep') {
		labelDig.textContent = '2. Mês de Nascimento do Trabalhador';
		var meses = [
			['1', 'Janeiro'], ['2', 'Fevereiro'], ['3', 'Março'], ['4', 'Abril'],
			['5', 'Maio'], ['6', 'Junho'], ['7', 'Julho'], ['8', 'Agosto'],
			['9', 'Setembro'], ['10', 'Outubro'], ['11', 'Novembro'], ['12', 'Dezembro']
		];
		meses.forEach(function(m) {
			var opt = document.createElement('option');
			opt.value = m[0];
			opt.textContent = m[1];
			selectDig.appendChild(opt);
		});
	} else if (prog === 'inss_acima_1sm') {
		labelDig.textContent = '2. Final do Benefício (antes do traço)';
		var grupos = [
			['1_6', 'Finais 1 e 6'],
			['2_7', 'Finais 2 e 7'],
			['3_8', 'Finais 3 e 8'],
			['4_9', 'Finais 4 e 9'],
			['5_0', 'Finais 5 e 0']
		];
		grupos.forEach(function(g) {
			var opt = document.createElement('option');
			opt.value = g[0];
			opt.textContent = g[1];
			selectDig.appendChild(opt);
		});
	} else {
		labelDig.textContent = prog === 'bolsa_familia'
			? '2. Último dígito do NIS (1 a 0)'
			: '2. Final do Benefício antes do traço (1 a 0)';
		['1','2','3','4','5','6','7','8','9','0'].forEach(function(d) {
			var opt = document.createElement('option');
			opt.value = d;
			opt.textContent = 'Final ' + d;
			selectDig.appendChild(opt);
		});
	}
	consultarCalendarioBeneficios2026();
}

function consultarCalendarioBeneficios2026() {
	var prog = document.getElementById('cal-programa').value;
	var dig = document.getElementById('cal-digito').value;
	var titulo = document.getElementById('cal-titulo-resultado');
	var container = document.getElementById('cal-tabela-container');

	var bfDatas2026 = {
		'1': ['19/Jan', '16/Fev', '18/Mar', '16/Abr', '18/Mai', '17/Jun', '20/Jul', '18/Ago', '17/Set', '19/Out', '16/Nov', '10/Dez'],
		'2': ['20/Jan', '17/Fev', '19/Mar', '17/Abr', '19/Mai', '18/Jun', '21/Jul', '19/Ago', '18/Set', '20/Out', '17/Nov', '11/Dez'],
		'3': ['21/Jan', '18/Fev', '20/Mar', '20/Abr', '20/Mai', '19/Jun', '22/Jul', '20/Ago', '21/Set', '21/Out', '18/Nov', '14/Dez'],
		'4': ['22/Jan', '19/Fev', '23/Mar', '22/Abr', '21/Mai', '22/Jun', '23/Jul', '21/Ago', '22/Set', '22/Out', '19/Nov', '15/Dez'],
		'5': ['23/Jan', '20/Fev', '24/Mar', '23/Abr', '22/Mai', '23/Jun', '24/Jul', '24/Ago', '23/Set', '23/Out', '23/Nov', '16/Dez'],
		'6': ['26/Jan', '23/Fev', '25/Mar', '24/Abr', '25/Mai', '24/Jun', '27/Jul', '25/Ago', '24/Set', '26/Out', '24/Nov', '17/Dez'],
		'7': ['27/Jan', '24/Fev', '26/Mar', '27/Abr', '26/Mai', '25/Jun', '28/Jul', '26/Ago', '25/Set', '27/Out', '25/Nov', '18/Dez'],
		'8': ['28/Jan', '25/Fev', '27/Mar', '28/Abr', '27/Mai', '26/Jun', '29/Jul', '27/Ago', '28/Set', '28/Out', '26/Nov', '21/Dez'],
		'9': ['29/Jan', '26/Fev', '30/Mar', '29/Abr', '28/Mai', '29/Jun', '30/Jul', '28/Ago', '29/Set', '29/Out', '27/Nov', '22/Dez'],
		'0': ['30/Jan', '27/Fev', '31/Mar', '30/Abr', '29/Mai', '30/Jun', '31/Jul', '31/Ago', '30/Set', '30/Out', '30/Nov', '23/Dez']
	};

	var inssAte1SM = {
		'1': ['26/Jan', '23/Fev', '25/Mar', '24/Abr', '25/Mai', '24/Jun', '27/Jul', '25/Ago', '24/Set', '26/Out', '24/Nov', '21/Dez'],
		'2': ['27/Jan', '24/Fev', '26/Mar', '27/Abr', '26/Mai', '25/Jun', '28/Jul', '26/Ago', '25/Set', '27/Out', '25/Nov', '22/Dez'],
		'3': ['28/Jan', '25/Fev', '27/Mar', '28/Abr', '27/Mai', '26/Jun', '29/Jul', '27/Ago', '28/Set', '28/Out', '26/Nov', '23/Dez'],
		'4': ['29/Jan', '26/Fev', '30/Mar', '29/Abr', '28/Mai', '29/Jun', '30/Jul', '28/Ago', '29/Set', '29/Out', '27/Nov', '28/Dez'],
		'5': ['30/Jan', '27/Fev', '31/Mar', '30/Abr', '29/Mai', '30/Jun', '31/Jul', '31/Ago', '30/Set', '30/Out', '30/Nov', '29/Dez'],
		'6': ['02/Fev', '02/Mar', '01/Abr', '04/Mai', '01/Jun', '01/Jul', '03/Ago', '01/Set', '01/Out', '03/Nov', '01/Dez', '04/Jan/27'],
		'7': ['03/Fev', '03/Mar', '02/Abr', '05/Mai', '02/Jun', '02/Jul', '04/Ago', '02/Set', '02/Out', '04/Nov', '02/Dez', '05/Jan/27'],
		'8': ['04/Fev', '04/Mar', '06/Abr', '06/Mai', '03/Jun', '03/Jul', '05/Ago', '03/Set', '05/Out', '05/Nov', '03/Dez', '06/Jan/27'],
		'9': ['05/Fev', '05/Mar', '07/Abr', '07/Mai', '05/Jun', '06/Jul', '06/Ago', '04/Set', '06/Out', '06/Nov', '04/Dez', '07/Jan/27'],
		'0': ['06/Fev', '06/Mar', '08/Abr', '08/Mai', '08/Jun', '07/Jul', '07/Ago', '08/Set', '07/Out', '09/Nov', '07/Dez', '08/Jan/27']
	};

	var inssAcima1SM = {
		'1_6': ['02/Fev', '02/Mar', '01/Abr', '04/Mai', '01/Jun', '01/Jul', '03/Ago', '01/Set', '01/Out', '03/Nov', '01/Dez', '04/Jan/27'],
		'2_7': ['03/Fev', '03/Mar', '02/Abr', '05/Mai', '02/Jun', '02/Jul', '04/Ago', '02/Set', '02/Out', '04/Nov', '02/Dez', '05/Jan/27'],
		'3_8': ['04/Fev', '04/Mar', '06/Abr', '06/Mai', '03/Jun', '03/Jul', '05/Ago', '03/Set', '05/Out', '05/Nov', '03/Dez', '06/Jan/27'],
		'4_9': ['05/Fev', '05/Mar', '07/Abr', '07/Mai', '05/Jun', '06/Jul', '06/Ago', '04/Set', '06/Out', '06/Nov', '04/Dez', '07/Jan/27'],
		'5_0': ['06/Fev', '06/Mar', '08/Abr', '08/Mai', '08/Jun', '07/Jul', '07/Ago', '08/Set', '07/Out', '09/Nov', '07/Dez', '08/Jan/27']
	};

	var pisPasep2026 = {
		'1':  { nome: 'Janeiro',   inicio: '16/02/2026', limite: '29/12/2026' },
		'2':  { nome: 'Fevereiro', inicio: '16/03/2026', limite: '29/12/2026' },
		'3':  { nome: 'Março',     inicio: '15/04/2026', limite: '29/12/2026' },
		'4':  { nome: 'Abril',     inicio: '15/04/2026', limite: '29/12/2026' },
		'5':  { nome: 'Maio',      inicio: '15/05/2026', limite: '29/12/2026' },
		'6':  { nome: 'Junho',     inicio: '15/05/2026', limite: '29/12/2026' },
		'7':  { nome: 'Julho',     inicio: '15/06/2026', limite: '29/12/2026' },
		'8':  { nome: 'Agosto',    inicio: '15/06/2026', limite: '29/12/2026' },
		'9':  { nome: 'Setembro',  inicio: '15/07/2026', limite: '29/12/2026' },
		'10': { nome: 'Outubro',   inicio: '15/07/2026', limite: '29/12/2026' },
		'11': { nome: 'Novembro',  inicio: '17/08/2026', limite: '29/12/2026' },
		'12': { nome: 'Dezembro',  inicio: '17/08/2026', limite: '29/12/2026' }
	};

	var nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

	if (prog === 'pis_pasep') {
		var info = pisPasep2026[dig] || pisPasep2026['1'];
		titulo.innerHTML = 'Abono Salarial PIS/PASEP 2026 — Nascidos em <strong>' + info.nome + '</strong>:';
		container.innerHTML =
			'<div style="background:#fff; border:1px solid #cbd5e1; border-radius:10px; padding:1rem; margin-bottom:0.75rem;">' +
			'<p style="margin:0 0 0.4rem 0; font-size:0.95rem;"><strong>Data de Liberação do Depósito/Saque:</strong> <span style="color:#178b4b; font-weight:800; font-size:1.15rem;">A partir de ' + info.inicio + '</span></p>' +
			'<p style="margin:0 0 0.4rem 0; font-size:0.9rem;"><strong>Prazo Final para Saque:</strong> ' + info.limite + ' (após essa data, o valor retorna ao FAT e exige recurso administrativo).</p>' +
			'<p style="margin:0; font-size:0.82rem; color:#475569;"><strong>Fonte oficial:</strong> Resolução CODEFAT / Ministério do Trabalho e Emprego (MTE). Consulta individual no App Carteira de Trabalho Digital.</p>' +
			'</div>' +
			'<a href="<?php echo esc_url( home_url( '/abono-salarial-pis-pasep-quem-tem-direito-consultar/' ) ); ?>" style="font-weight:700; color:#178b4b;">Ler guia completo do Abono Salarial PIS/PASEP 2026 &rarr;</a>';
		return;
	}

	var lista = [];
	var fonte = '';
	var linkGuia = '';
	var textoLink = '';

	if (prog === 'bolsa_familia') {
		lista = bfDatas2026[dig] || bfDatas2026['1'];
		titulo.innerHTML = 'Calendário Bolsa Família 2026 — <strong>NIS Final ' + dig + '</strong>:';
		fonte = 'Ministério do Desenvolvimento e Assistência Social, Família e Combate à Fome (MDS) e Caixa Econômica Federal.';
		linkGuia = '<?php echo esc_url( home_url( '/bolsa-familia-e-cadastro-unico-cadunico-quem-tem-direito/' ) ); ?>';
		textoLink = 'Ler guia completo do Bolsa Família e CadÚnico &rarr;';
	} else if (prog === 'inss_ate_1sm') {
		lista = inssAte1SM[dig] || inssAte1SM['1'];
		titulo.innerHTML = 'Calendário INSS e BPC/LOAS 2026 (Até 1 Salário Mínimo) — <strong>Final ' + dig + '</strong>:';
		fonte = 'Instituto Nacional do Seguro Social (INSS) / Ministério da Previdência Social.';
		linkGuia = '<?php echo esc_url( home_url( '/meu-inss-como-consultar-beneficios-cnis-pericia/' ) ); ?>';
		textoLink = 'Ler guia passo a passo do Meu INSS &rarr;';
	} else {
		lista = inssAcima1SM[dig] || inssAcima1SM['1_6'];
		var rotulo = dig.replace('_', ' e ');
		titulo.innerHTML = 'Calendário INSS 2026 (Acima de 1 Salário Mínimo) — <strong>Finais ' + rotulo + '</strong>:';
		fonte = 'Instituto Nacional do Seguro Social (INSS) / Ministério da Previdência Social.';
		linkGuia = '<?php echo esc_url( home_url( '/meu-inss-como-consultar-beneficios-cnis-pericia/' ) ); ?>';
		textoLink = 'Ler guia passo a passo do Meu INSS &rarr;';
	}

	var gridHtml = '<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(145px, 1fr)); gap:0.6rem; margin-bottom:0.85rem;">';
	for (var i = 0; i < 12; i++) {
		gridHtml += '<div style="background:#fff; border:1px solid #dbe5ef; border-radius:8px; padding:0.6rem 0.75rem;">' +
			'<span style="display:block; font-size:0.75rem; color:#64748b; text-transform:uppercase; font-weight:700;">' + nomesMeses[i] + '/2026</span>' +
			'<strong style="font-size:1rem; color:#102b57;">' + lista[i] + '</strong>' +
			'</div>';
	}
	gridHtml += '</div>';
	gridHtml += '<p style="font-size:0.8rem; color:#475569; margin:0 0 0.5rem 0;"><strong>Fonte oficial:</strong> ' + fonte + ' • <em>Revisado em Outubro/2026</em></p>';
	gridHtml += '<a href="' + linkGuia + '" style="font-weight:700; color:#178b4b;">' + textoLink + '</a>';

	container.innerHTML = gridHtml;
}

document.addEventListener('DOMContentLoaded', function() {
	consultarCalendarioBeneficios2026();
});
</script>

<?php
get_footer();
