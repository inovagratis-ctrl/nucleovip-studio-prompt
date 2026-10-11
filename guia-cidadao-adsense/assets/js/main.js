/**
 * Guia do Cidadão Pro - Script Ultra-Leve (Sem jQuery)
 * Inclui: Banner LGPD, Menu Mobile e 5 Calculadoras Oficiais:
 * 1. Férias CLT + 1/3
 * 2. Rescisão CLT + Multa FGTS
 * 3. 13º Salário
 * 4. Seguro-Desemprego (Faixas MTE + Quantidade de Parcelas)
 * 5. Imposto de Renda Mensal (IRPF / Salário Líquido - Receita Federal)
 */

document.addEventListener('DOMContentLoaded', function () {
  var lgpdBanner = document.getElementById('lgpd-banner');
  var lgpdBtn = document.getElementById('lgpd-accept-btn');

  if (lgpdBanner && !localStorage.getItem('guia_lgpd_accepted')) {
    lgpdBanner.classList.remove('hidden');
  }

  if (lgpdBtn) {
    lgpdBtn.addEventListener('click', function () {
      localStorage.setItem('guia_lgpd_accepted', '1');
      lgpdBanner.classList.add('hidden');
    });
  }

  var menuBtn = document.getElementById('mobile-menu-btn');
  var navBar = document.querySelector('.category-nav-bar');
  if (menuBtn && navBar) {
    menuBtn.addEventListener('click', function () {
      navBar.style.display = navBar.style.display === 'none' ? 'block' : '';
    });
  }
});

function formatarMoedaBR(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function calcularDescontoINSS(base) {
  if (base <= 1518) return base * 0.075;
  if (base <= 2793.88) return (1518 * 0.075) + ((base - 1518) * 0.09);
  if (base <= 4190.83) return (1518 * 0.075) + ((2793.88 - 1518) * 0.09) + ((base - 2793.88) * 0.12);
  var teto = Math.min(base, 8157.41);
  return (1518 * 0.075) + ((2793.88 - 1518) * 0.09) + ((4190.83 - 2793.88) * 0.12) + ((teto - 4190.83) * 0.14);
}

// 1. Calculadora de Férias CLT
window.calcularFeriasCLT = function () {
  var salario = parseFloat(document.getElementById('ferias-salario').value) || 0;
  var dias = parseInt(document.getElementById('ferias-dias').value, 10) || 30;

  var valorProporcional = (salario / 30) * dias;
  var tercoConstitucional = valorProporcional / 3;
  var abonoPecuniario = dias === 20 ? ((salario / 30) * 10) * (4 / 3) : 0;

  var brutoTributavel = valorProporcional + tercoConstitucional;
  var inss = calcularDescontoINSS(brutoTributavel);
  var liquido = brutoTributavel - inss + abonoPecuniario;

  var box = document.getElementById('resultado-ferias');
  document.getElementById('ferias-valor-liquido').textContent = formatarMoedaBR(liquido);
  document.getElementById('ferias-detalhes').innerHTML =
    '<strong>Resumo:</strong> Férias Brutas (' + dias + ' dias): ' + formatarMoedaBR(valorProporcional) +
    ' | + 1/3 Constitucional: ' + formatarMoedaBR(tercoConstitucional) +
    (abonoPecuniario > 0 ? ' | + Abono 10 dias (isento): ' + formatarMoedaBR(abonoPecuniario) : '') +
    ' | - INSS Estimado: ' + formatarMoedaBR(inss);
  box.classList.add('active');
};

// 2. Calculadora de Rescisão Trabalhista CLT
window.calcularRescisaoCLT = function () {
  var salario = parseFloat(document.getElementById('resc-salario').value) || 0;
  var meses = parseInt(document.getElementById('resc-meses').value, 10) || 1;
  var dias = parseInt(document.getElementById('resc-dias').value, 10) || 1;
  var motivo = document.getElementById('resc-motivo').value;

  var saldoSalario = (salario / 30) * dias;
  var decimoProp = (salario / 12) * meses;
  var feriasProp = ((salario / 12) * meses) * (4 / 3);
  var fgtsAcumulado = (salario * 0.08) * meses;
  var multaFgts = 0;

  if (motivo === 'sem_justa_causa') {
    multaFgts = fgtsAcumulado * 0.40;
  } else if (motivo === 'acordo') {
    multaFgts = fgtsAcumulado * 0.20;
  }

  var inss = calcularDescontoINSS(saldoSalario) + calcularDescontoINSS(decimoProp);
  var total = saldoSalario + decimoProp + feriasProp + multaFgts - inss;

  var box = document.getElementById('resultado-rescisao');
  document.getElementById('resc-valor-total').textContent = formatarMoedaBR(total);
  document.getElementById('resc-detalhes').innerHTML =
    '<strong>Detalhamento:</strong> Saldo de Salário (' + dias + 'd): ' + formatarMoedaBR(saldoSalario) +
    ' | 13º Proporcional (' + meses + '/12): ' + formatarMoedaBR(decimoProp) +
    ' | Férias Prop. + 1/3: ' + formatarMoedaBR(feriasProp) +
    ' | Multa FGTS: ' + formatarMoedaBR(multaFgts) +
    ' | - Desconto INSS: ' + formatarMoedaBR(inss);
  box.classList.add('active');
};

// 3. Calculadora de 13º Salário CLT
window.calcularDecimoCLT = function () {
  var salario = parseFloat(document.getElementById('dec-salario').value) || 0;
  var meses = parseInt(document.getElementById('dec-meses').value, 10) || 12;

  var bruto = (salario / 12) * meses;
  var primeiraParcela = bruto / 2;
  var inss = calcularDescontoINSS(bruto);
  var segundaParcela = bruto - primeiraParcela - inss;
  var totalLiquido = primeiraParcela + segundaParcela;

  var box = document.getElementById('resultado-decimo');
  document.getElementById('dec-valor-total').textContent = formatarMoedaBR(totalLiquido);
  document.getElementById('dec-detalhes').innerHTML =
    '<strong>1ª Parcela (até 28/Nov sem descontos):</strong> ' + formatarMoedaBR(primeiraParcela) +
    ' | <strong>2ª Parcela (até 20/Dez com desconto INSS):</strong> ' + formatarMoedaBR(segundaParcela) +
    ' | Desconto INSS: ' + formatarMoedaBR(inss);
  box.classList.add('active');
};

// 4. Calculadora de Seguro-Desemprego (Regras MTE / Codefat)
window.calcularSeguroDesemprego = function () {
  var s1 = parseFloat(document.getElementById('sd-sal1').value) || 0;
  var s2 = parseFloat(document.getElementById('sd-sal2').value) || 0;
  var s3 = parseFloat(document.getElementById('sd-sal3').value) || 0;
  var meses = parseInt(document.getElementById('sd-meses').value, 10) || 12;
  var vez = parseInt(document.getElementById('sd-vez').value, 10) || 1;

  var media = (s1 + s2 + s3) / 3;
  var pisoMinimo = 1518.00;
  var tetoMaximo = 2424.11;
  var valorParcela = 0;

  if (media <= 2138.76) {
    valorParcela = media * 0.80;
  } else if (media <= 3564.96) {
    valorParcela = 1711.01 + ((media - 2138.76) * 0.50);
  } else {
    valorParcela = tetoMaximo;
  }

  if (valorParcela < pisoMinimo) {
    valorParcela = pisoMinimo;
  }

  var qtdParcelas = 0;
  var aviso = '';
  if (vez === 1) {
    if (meses < 12) {
      aviso = 'Para a 1ª solicitação, a lei exige no mínimo 12 meses trabalhados nos últimos 18 meses.';
    } else if (meses < 24) {
      qtdParcelas = 4;
    } else {
      qtdParcelas = 5;
    }
  } else if (vez === 2) {
    if (meses < 9) {
      aviso = 'Para a 2ª solicitação, a lei exige no mínimo 9 meses trabalhados nos últimos 12 meses.';
    } else if (meses < 12) {
      qtdParcelas = 3;
    } else if (meses < 24) {
      qtdParcelas = 4;
    } else {
      qtdParcelas = 5;
    }
  } else {
    if (meses < 6) {
      aviso = 'Para a 3ª solicitação em diante, a lei exige no mínimo 6 meses trabalhados.';
    } else if (meses < 12) {
      qtdParcelas = 3;
    } else if (meses < 24) {
      qtdParcelas = 4;
    } else {
      qtdParcelas = 5;
    }
  }

  var box = document.getElementById('resultado-sd');
  if (qtdParcelas === 0) {
    document.getElementById('sd-valor-parcela').textContent = 'Tempo insuficiente';
    document.getElementById('sd-detalhes').innerHTML = '<strong>Atenção:</strong> ' + aviso;
  } else {
    var totalBeneficio = valorParcela * qtdParcelas;
    document.getElementById('sd-valor-parcela').textContent = qtdParcelas + 'x de ' + formatarMoedaBR(valorParcela);
    document.getElementById('sd-detalhes').innerHTML =
      '<strong>Média Salarial dos últimos 3 meses:</strong> ' + formatarMoedaBR(media) +
      ' | <strong>Total acumulado no período:</strong> ' + formatarMoedaBR(totalBeneficio) +
      ' (Solicitação pelo app Carteira de Trabalho Digital ou portal Gov.br).';
  }
  box.classList.add('active');
};

// 5. Calculadora de Imposto de Renda Retido na Fonte (IRPF / Salário Líquido)
window.calcularIRPFMensal = function () {
  var salarioBruto = parseFloat(document.getElementById('irpf-salario').value) || 0;
  var dependentes = parseInt(document.getElementById('irpf-dependentes').value, 10) || 0;

  var inss = calcularDescontoINSS(salarioBruto);
  var deducaoDependentes = dependentes * 189.59;
  var deducaoLegal = inss + deducaoDependentes;
  var descontoSimplificado = 564.80;

  // Receita Federal aplica automaticamente o desconto mais vantajoso ao trabalhador
  var maiorDeducao = Math.max(deducaoLegal, descontoSimplificado);
  var metodoUsado = descontoSimplificado > deducaoLegal ? 'Desconto Simplificado (R$ 564,80)' : 'Deduções Legais (INSS + Dependentes)';
  var baseCalculo = Math.max(0, salarioBruto - maiorDeducao);

  var irrf = 0;
  var faixa = 'Isento (0%)';

  if (baseCalculo <= 2259.20) {
    irrf = 0;
    faixa = 'Isento (0%)';
  } else if (baseCalculo <= 2826.65) {
    irrf = (baseCalculo * 0.075) - 169.44;
    faixa = '7,5%';
  } else if (baseCalculo <= 3751.05) {
    irrf = (baseCalculo * 0.15) - 381.44;
    faixa = '15,0%';
  } else if (baseCalculo <= 4664.68) {
    irrf = (baseCalculo * 0.225) - 662.77;
    faixa = '22,5%';
  } else {
    irrf = (baseCalculo * 0.275) - 896.00;
    faixa = '27,5%';
  }

  irrf = Math.max(0, irrf);
  var salarioLiquido = salarioBruto - inss - irrf;
  var aliquotaEfetiva = salarioBruto > 0 ? ((irrf / salarioBruto) * 100).toFixed(2) : '0.00';

  var box = document.getElementById('resultado-irpf');
  document.getElementById('irpf-valor-imposto').textContent =
    irrf === 0 ? 'ISENTO (R$ 0,00 de IRPF)' : formatarMoedaBR(irrf) + ' / mês';
  document.getElementById('irpf-detalhes').innerHTML =
    '<strong>Salário Líquido Final:</strong> ' + formatarMoedaBR(salarioLiquido) +
    ' | <strong>Desconto INSS:</strong> ' + formatarMoedaBR(inss) +
    ' | <strong>Faixa IRPF:</strong> ' + faixa + ' (Alíquota efetiva: ' + aliquotaEfetiva + '%)' +
    '<br><small>Método mais vantajoso aplicado: ' + metodoUsado + ' (Base de cálculo: ' + formatarMoedaBR(baseCalculo) + ')</small>';
  box.classList.add('active');
};
