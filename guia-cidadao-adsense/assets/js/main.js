/**
 * Guia do Cidadão Pro - Script Ultra-Leve (Sem jQuery)
 * Inclui: Banner LGPD, Menu Mobile e Calculadoras Trabalhistas CLT (Férias, Rescisão, 13º Salário)
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Controle do Banner de Cookies LGPD (Exigido pelo Google AdSense)
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

  // 2. Menu Mobile
  var menuBtn = document.getElementById('mobile-menu-btn');
  var navBar = document.querySelector('.category-nav-bar');
  if (menuBtn && navBar) {
    menuBtn.addEventListener('click', function () {
      navBar.style.display = navBar.style.display === 'none' ? 'block' : '';
    });
  }
});

// Formatação em Real Brasileiro (R$)
function formatarMoedaBR(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Estimativa progressiva simplificada de desconto INSS CLT
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
