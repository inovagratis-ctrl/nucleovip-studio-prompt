/**
 * Guia do Cidadão Pro - Script Oficial v2.1.0 (Zero jQuery)
 * Base Normativa 2026:
 * - Portaria Interministerial MPS/MF nº 13, de 9 de janeiro de 2026 (Salário Mínimo R$ 1.621,00 e Faixas INSS/Seguro-Desemprego)
 * - Lei nº 15.270/2025 (Isenção de IRPF/IRRF para rendimentos e 13º salário até R$ 5.000,00 e redução gradual até R$ 7.350,00)
 * - Lei nº 4.749, de 12 de agosto de 1965 e Manual do eSocial (Prazos do 13º Salário)
 */

document.addEventListener('DOMContentLoaded', function () {
  var lgpdBanner = document.getElementById('lgpd-banner');
  var btnAcceptAll = document.getElementById('lgpd-accept-btn');
  var btnReject = document.getElementById('lgpd-reject-btn');
  var btnPrefs = document.getElementById('lgpd-prefs-btn');
  var btnSavePrefs = document.getElementById('lgpd-save-prefs-btn');
  var prefsPanel = document.getElementById('lgpd-prefs-panel');
  var reopenLink = document.getElementById('lgpd-reopen-link');

  function salvarConsentimento(tipo) {
    localStorage.setItem('guia_lgpd_consent', JSON.stringify({
      status: tipo,
      analytics: tipo === 'all' || (document.getElementById('chk-cookie-analytics') && document.getElementById('chk-cookie-analytics').checked),
      ads: tipo === 'all' || (document.getElementById('chk-cookie-ads') && document.getElementById('chk-cookie-ads').checked),
      updatedAt: new Date().toISOString()
    }));
    if (lgpdBanner) {
      lgpdBanner.classList.add('hidden');
    }
  }

  if (lgpdBanner && !localStorage.getItem('guia_lgpd_consent')) {
    lgpdBanner.classList.remove('hidden');
  }

  if (btnAcceptAll) {
    btnAcceptAll.addEventListener('click', function () {
      salvarConsentimento('all');
    });
  }

  if (btnReject) {
    btnReject.addEventListener('click', function () {
      if (document.getElementById('chk-cookie-analytics')) document.getElementById('chk-cookie-analytics').checked = false;
      if (document.getElementById('chk-cookie-ads')) document.getElementById('chk-cookie-ads').checked = false;
      salvarConsentimento('essential_only');
    });
  }

  if (btnPrefs && prefsPanel) {
    btnPrefs.addEventListener('click', function () {
      prefsPanel.style.display = prefsPanel.style.display === 'none' ? 'block' : 'none';
    });
  }

  if (btnSavePrefs) {
    btnSavePrefs.addEventListener('click', function () {
      salvarConsentimento('custom');
    });
  }

  if (reopenLink && lgpdBanner) {
    reopenLink.addEventListener('click', function (e) {
      e.preventDefault();
      lgpdBanner.classList.remove('hidden');
    });
  }

  var menuBtn = document.getElementById('mobile-menu-btn');
  var navBar = document.querySelector('.category-nav-bar');
  if (menuBtn && navBar) {
    menuBtn.addEventListener('click', function () {
      navBar.style.display = navBar.style.display === 'none' ? 'block' : '';
    
  // ==========================================
  // SISTEMA DE BUSCA ESTÁTICA INSTANTÂNEA
  // ==========================================
  var searchForms = document.querySelectorAll('.search-form');
  var urlParams = new URLSearchParams(window.location.search);
  var searchQuery = urlParams.get('s');

  function normalizarTexto(txt) {
    return (txt || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

  function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function executarBusca(query) {
    if (!query) return;
    var postsGrid = document.querySelector('.posts-grid');
    var sectionTitle = document.querySelector('.section-title');
    if (!postsGrid) {
      window.location.href = '/?s=' + encodeURIComponent(query);
      return;
    }

    fetch('/search-index.json')
      .then(function(res) { return res.json(); })
      .then(function(items) {
        var qNorm = normalizarTexto(query);
        var termos = qNorm.split(/\s+/).filter(Boolean);
        var resultados = items.filter(function(item) {
          var haystack = normalizarTexto(item.title + ' ' + item.desc + ' ' + item.category + ' ' + item.slug);
          return termos.every(function(t) { return haystack.indexOf(t) !== -1; });
        });

        if (sectionTitle) {
          sectionTitle.innerHTML = 'Resultados da busca por: <em>"' + escapeHtml(query) + '"</em> <span style="font-size:0.9rem; font-weight:normal; color:#64748b;">(' + resultados.length + ' encontrados)</span>';
        }

        var heroSection = document.querySelector('.tools-spotlight-section');
        if (heroSection) heroSection.style.display = 'none';

        if (resultados.length === 0) {
          postsGrid.innerHTML = '<div style="grid-column:1/-1; padding:2.5rem; background:#f8fafc; border-radius:12px; border:1px solid #e2e8f0; text-align:center;">' +
            '<h3 style="color:#1e293b; margin-bottom:0.5rem;">🔍 Nenhum guia encontrado</h3>' +
            '<p style="color:#64748b; margin-bottom:1.5rem;">Não encontramos nenhum artigo correspondente a <strong>"' + escapeHtml(query) + '"</strong>. Tente buscar por termos como: <em>fgts, inss, irpf, cadunico, cnh, mei ou 13º</em>.</p>' +
            '<a href="/" class="hero-btn-primary" style="display:inline-block;">← Ver Todos os Guias</a>' +
            '</div>';
          return;
        }

        var html = '';
        resultados.forEach(function(item) {
          html += '<article class="post-card">' +
            '<a href="' + item.url + '" class="post-card-thumb">' +
            '<img src="' + item.thumb + '" alt="' + escapeHtml(item.title) + '" loading="lazy" style="width:100%; height:200px; object-fit:cover;">' +
            '</a>' +
            '<div class="post-card-body">' +
            '<div><span class="post-category-badge">' + escapeHtml(item.category) + '</span></div>' +
            '<h3 class="post-card-title"><a href="' + item.url + '">' + escapeHtml(item.title) + '</a></h3>' +
            '<p class="post-card-excerpt">' + escapeHtml(item.desc) + '</p>' +
            '<div class="post-card-meta"><a href="' + item.url + '" class="post-card-cta">Ler Guia Completo &rarr;</a></div>' +
            '</div></article>';
        });
        postsGrid.innerHTML = html;

        var existingClear = document.getElementById('btn-limpar-busca');
        if (!existingClear && sectionTitle) {
          var clearBtn = document.createElement('a');
          clearBtn.id = 'btn-limpar-busca';
          clearBtn.href = '/';
          clearBtn.textContent = '✕ Limpar busca e voltar à Home';
          clearBtn.style.cssText = 'display:inline-block; font-size:0.85rem; color:#178b4b; margin-top:0.5rem; text-decoration:none; font-weight:600;';
          sectionTitle.parentNode.appendChild(clearBtn);
        }
      });
  }

  searchForms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var input = form.querySelector('input[name="s"]');
      var q = input ? input.value.trim() : '';
      if (q) {
        if (window.location.pathname === '/' || window.location.pathname === '') {
          history.pushState(null, '', '/?s=' + encodeURIComponent(q));
          executarBusca(q);
        } else {
          window.location.href = '/?s=' + encodeURIComponent(q);
        }
      }
    });
  });

  if (searchQuery) {
    var searchInput = document.querySelector('input[name="s"]');
    if (searchInput) searchInput.value = searchQuery;
    executarBusca(searchQuery);
  }

});
  }
});

function formatarMoedaBR(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/**
 * TABELA PROGRESSIVA OFICIAL DO INSS 2026
 * Base Legal: Portaria Interministerial MPS/MF nº 13, de 9 de janeiro de 2026
 * - Até R$ 1.621,00: 7,5%
 * - De R$ 1.621,01 até R$ 2.902,84: 9,0%
 * - De R$ 2.902,85 até R$ 4.354,27: 12,0%
 * - De R$ 4.354,28 até R$ 8.708,55 (Teto 2026): 14,0%
 * Exemplo conferido: R$ 3.000,00 -> R$ 248,60
 */
function calcularDescontoINSS(base) {
  if (base <= 0) return 0;
  var f1 = 1621.00;
  var f2 = 2902.84;
  var f3 = 4354.27;
  var teto = 8708.55;

  var salario = Math.min(base, teto);
  var desconto = 0;

  if (salario <= f1) {
    desconto = salario * 0.075;
  } else if (salario <= f2) {
    desconto = (f1 * 0.075) + ((salario - f1) * 0.09);
  } else if (salario <= f3) {
    desconto = (f1 * 0.075) + ((f2 - f1) * 0.09) + ((salario - f2) * 0.12);
  } else {
    desconto = (f1 * 0.075) + ((f2 - f1) * 0.09) + ((f3 - f2) * 0.12) + ((salario - f3) * 0.14);
  }

  return Math.round(desconto * 100) / 100;
}

/**
 * CÁLCULO DE IRRF 2026 (Lei nº 15.270/2025 — aplicável ao salário mensal e ao 13º salário)
 * - Isenção integral para rendimentos brutos de até R$ 5.000,00 (Redutor de até R$ 312,89 da Lei nº 15.270/2025)
 * - Redução gradual entre R$ 5.000,01 e R$ 7.350,00: Redutor = 978,62 - (0,133145 * bruto)
 * - Compara automaticamente Desconto Simplificado Mensal (R$ 607,20) vs Deduções Legais (INSS + R$ 189,59 por dependente)
 */
function calcularIRRF(bruto, inss, dependentes) {
  if (bruto <= 0) {
    return { irrf: 0, base: 0, metodo: 'Isento (Lei nº 15.270/2025)', faixa: 'Isento (0%)', redutorLei: 0 };
  }

  var deducaoDep = (dependentes || 0) * 189.59;
  var deducaoLegal = inss + deducaoDep;
  var descontoSimplificado = 607.20;

  var maiorDeducao = Math.max(deducaoLegal, descontoSimplificado);
  var metodo = descontoSimplificado > deducaoLegal
    ? 'Desconto Simplificado (R$ 607,20)'
    : 'Deduções Legais (INSS + Dependentes)';
  var base = Math.max(0, bruto - maiorDeducao);

  var impostoTabela = 0;
  var faixa = 'Isento (0%)';

  if (base <= 2428.80) {
    impostoTabela = 0;
    faixa = 'Isento (0%)';
  } else if (base <= 2826.65) {
    impostoTabela = (base * 0.075) - 182.16;
    faixa = '7,5%';
  } else if (base <= 3751.05) {
    impostoTabela = (base * 0.15) - 394.16;
    faixa = '15,0%';
  } else if (base <= 4664.68) {
    impostoTabela = (base * 0.225) - 675.49;
    faixa = '22,5%';
  } else {
    impostoTabela = (base * 0.275) - 908.73;
    faixa = '27,5%';
  }

  impostoTabela = Math.max(0, impostoTabela);

  // Aplicação do Redutor da Lei nº 15.270/2025 (Isenção até R$ 5.000,00 e redução gradual até R$ 7.350,00)
  var redutorLei = 0;
  if (bruto <= 5000.00) {
    redutorLei = Math.min(impostoTabela, 312.89);
    impostoTabela = 0;
    faixa = 'Isento (0% — Lei nº 15.270/2025)';
    metodo = 'Isenção até R$ 5.000,00 (Lei nº 15.270/2025)';
  } else if (bruto <= 7350.00) {
    redutorLei = Math.max(0, 978.62 - (0.133145 * bruto));
    redutorLei = Math.min(impostoTabela, redutorLei);
    impostoTabela = Math.max(0, impostoTabela - redutorLei);
    metodo += ' + Redutor Lei nº 15.270/2025 (' + formatarMoedaBR(redutorLei) + ')';
  }

  var irrfFinal = Math.max(0, Math.round(impostoTabela * 100) / 100);
  return {
    irrf: irrfFinal,
    base: base,
    metodo: metodo,
    faixa: faixa,
    redutorLei: Math.round(redutorLei * 100) / 100
  };
}

function obterPrazosDecimoTerceiro() {
  var ano = new Date().getFullYear();
  var diasSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  var nov30 = new Date(ano, 10, 30);
  var dia1 = 30;
  var dSemana1 = nov30.getDay();
  if (dSemana1 === 6) { dia1 = 28; dSemana1 = 5; }
  if (dSemana1 === 0) { dia1 = 29; dSemana1 = 5; }

  var dez20 = new Date(ano, 11, 20);
  var dia2 = 20;
  var dSemana2 = dez20.getDay();
  if (dSemana2 === 6) { dia2 = 19; dSemana2 = 5; }
  if (dSemana2 === 0) { dia2 = 18; dSemana2 = 5; }

  return {
    ano: ano,
    prazo1: dia1 + '/11/' + ano + ' (' + diasSemana[dSemana1] + ')',
    prazo2: dia2 + '/12/' + ano + ' (' + diasSemana[dSemana2] + ')'
  };
}

// 1. Calculadora de Férias CLT (2026)
window.calcularFeriasCLT = function () {
  var salario = parseFloat(document.getElementById('ferias-salario').value) || 0;
  var dias = parseInt(document.getElementById('ferias-dias').value, 10) || 30;
  var depEl = document.getElementById('ferias-dependentes');
  var dependentes = depEl ? (parseInt(depEl.value, 10) || 0) : 0;

  var valorProporcional = (salario / 30) * dias;
  var tercoConstitucional = valorProporcional / 3;
  var abonoPecuniario = dias === 20 ? ((salario / 30) * 10) * (4 / 3) : 0;

  var brutoTributavel = valorProporcional + tercoConstitucional;
  var inss = calcularDescontoINSS(brutoTributavel);
  var irObj = calcularIRRF(brutoTributavel, inss, dependentes);
  var liquido = brutoTributavel - inss - irObj.irrf + abonoPecuniario;

  var box = document.getElementById('resultado-ferias');
  document.getElementById('ferias-valor-liquido').textContent = formatarMoedaBR(liquido);
  document.getElementById('ferias-detalhes').innerHTML =
    '<strong>Memória de Cálculo Estimada (Tabelas 2026):</strong><br>' +
    '• Férias Brutas (' + dias + ' dias): ' + formatarMoedaBR(valorProporcional) + '<br>' +
    '• + Adicional de 1/3 Constitucional: ' + formatarMoedaBR(tercoConstitucional) + '<br>' +
    (abonoPecuniario > 0 ? '• + Abono Pecuniário (10 dias vendidos — isento de INSS/IRRF): ' + formatarMoedaBR(abonoPecuniario) + '<br>' : '') +
    '• - Desconto INSS (Portaria MPS/MF nº 13/2026): <strong>' + formatarMoedaBR(inss) + '</strong><br>' +
    '• - Desconto IRRF (' + irObj.metodo + '): <strong>' + formatarMoedaBR(irObj.irrf) + '</strong><br>' +
    '<small><em>Nota: Estimativa para salário fixo. Médias de horas extras, adicional noturno, insalubridade ou pensão alimentícia podem alterar o valor final.</em></small>';
  box.classList.add('active');
};

// 2. Calculadora de Rescisão Trabalhista CLT (2026)
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

  var inssSaldo = calcularDescontoINSS(saldoSalario);
  var inss13 = calcularDescontoINSS(decimoProp);
  var irSaldo = calcularIRRF(saldoSalario, inssSaldo, 0).irrf;
  var ir13 = calcularIRRF(decimoProp, inss13, 0).irrf;
  var totalDescontos = inssSaldo + inss13 + irSaldo + ir13;

  var total = saldoSalario + decimoProp + feriasProp + multaFgts - totalDescontos;

  var box = document.getElementById('resultado-rescisao');
  document.getElementById('resc-valor-total').textContent = formatarMoedaBR(total);
  document.getElementById('resc-detalhes').innerHTML =
    '<strong>Memória de Cálculo Estimada (Tabelas 2026):</strong><br>' +
    '• Saldo de Salário (' + dias + ' dias): ' + formatarMoedaBR(saldoSalario) + '<br>' +
    '• 13º Salário Proporcional (' + meses + '/12 avos): ' + formatarMoedaBR(decimoProp) + '<br>' +
    '• Férias Proporcionais + 1/3 (indenizadas — isentas de INSS/IRRF): ' + formatarMoedaBR(feriasProp) + '<br>' +
    '• Multa Rescisória sobre FGTS estimado do período: ' + formatarMoedaBR(multaFgts) + '<br>' +
    '• - INSS sobre Saldo de Salário: ' + formatarMoedaBR(inssSaldo) + ' | - INSS sobre 13º: ' + formatarMoedaBR(inss13) + '<br>' +
    '• - IRRF estimado (Lei nº 15.270/2025): ' + formatarMoedaBR(irSaldo + ir13) + '<br>' +
    '<small><em>Nota: Estimativa básica. Não inclui férias vencidas de períodos anteriores, aviso prévio indenizado específico por tempo de casa (Lei nº 12.506/2011) ou saldo anterior de FGTS.</em></small>';
  box.classList.add('active');
};

// 3. Calculadora de 13º Salário CLT (Portaria MPS/MF nº 13/2026 + Lei nº 15.270/2025 + Lei nº 4.749/1965)
window.calcularDecimoCLT = function () {
  var salario = parseFloat(document.getElementById('dec-salario').value) || 0;
  var meses = parseInt(document.getElementById('dec-meses').value, 10) || 12;
  var depEl = document.getElementById('dec-dependentes');
  var dependentes = depEl ? (parseInt(depEl.value, 10) || 0) : 0;

  var bruto = (salario / 12) * meses;
  var primeiraParcela = Math.round((bruto / 2) * 100) / 100;
  var inss = calcularDescontoINSS(bruto);
  var irObj = calcularIRRF(bruto, inss, dependentes);
  var irrf = irObj.irrf;

  var segundaParcela = Math.round((bruto - primeiraParcela - inss - irrf) * 100) / 100;
  var totalLiquido = Math.round((primeiraParcela + segundaParcela) * 100) / 100;
  var prazos = obterPrazosDecimoTerceiro();

  var box = document.getElementById('resultado-decimo');
  document.getElementById('dec-valor-total').textContent = formatarMoedaBR(totalLiquido);
  document.getElementById('dec-detalhes').innerHTML =
    '<strong>Memória de Cálculo Estimada (Vigência ' + prazos.ano + ' — Portaria MPS/MF nº 13/2026 e Lei nº 15.270/2025):</strong><br>' +
    '• <strong>13º Bruto Proporcional (' + meses + '/12 avos):</strong> ' + formatarMoedaBR(bruto) + '<br>' +
    '• <strong>1ª Parcela (Prazo legal até ' + prazos.prazo1 + ' — sem descontos):</strong> ' + formatarMoedaBR(primeiraParcela) + '<br>' +
    '• <strong>2ª Parcela (Prazo legal até ' + prazos.prazo2 + ' — com descontos):</strong> ' + formatarMoedaBR(segundaParcela) + '<br>' +
    '• <strong>Desconto de INSS (Progressivo 2026):</strong> ' + formatarMoedaBR(inss) + '<br>' +
    '• <strong>Desconto de IRRF (' + irObj.metodo + '):</strong> ' + formatarMoedaBR(irrf) + '<br>' +
    '<small><em>Observação técnica: Cálculo estimativo para remuneração fixa mensal. Caso receba horas extras, comissões ou adicionais variáveis, a média anual dessas verbas integra a base de cálculo conforme Súmula 45 do TST e Manual do eSocial.</em></small>';
  box.classList.add('active');
};

// 4. Calculadora de Seguro-Desemprego 2026 (Portaria MPS/MF nº 13/2026)
window.calcularSeguroDesemprego = function () {
  var s1 = parseFloat(document.getElementById('sd-sal1').value) || 0;
  var s2 = parseFloat(document.getElementById('sd-sal2').value) || 0;
  var s3 = parseFloat(document.getElementById('sd-sal3').value) || 0;
  var meses = parseInt(document.getElementById('sd-meses').value, 10) || 12;
  var vez = parseInt(document.getElementById('sd-vez').value, 10) || 1;

  var media = (s1 + s2 + s3) / 3;
  var pisoMinimo = 1621.00;
  var faixa1Limite = 2283.72;
  var faixa2Limite = 3806.59;
  var tetoMaximo = 2588.41;
  var valorParcela = 0;

  if (media <= faixa1Limite) {
    valorParcela = media * 0.80;
  } else if (media <= faixa2Limite) {
    valorParcela = (faixa1Limite * 0.80) + ((media - faixa1Limite) * 0.50);
  } else {
    valorParcela = tetoMaximo;
  }

  if (valorParcela < pisoMinimo) {
    valorParcela = pisoMinimo;
  }
  valorParcela = Math.round(valorParcela * 100) / 100;

  var qtdParcelas = 0;
  var aviso = '';
  if (vez === 1) {
    if (meses < 12) {
      aviso = 'Para a 1ª solicitação, a Lei nº 7.998/1990 exige no mínimo 12 meses trabalhados nos últimos 18 meses.';
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
    document.getElementById('sd-valor-parcela').textContent = qtdParcelas + ' parcelas de ' + formatarMoedaBR(valorParcela);
    document.getElementById('sd-detalhes').innerHTML =
      '<strong>Média Salarial dos últimos 3 meses:</strong> ' + formatarMoedaBR(media) +
      ' | <strong>Total estimado no período:</strong> ' + formatarMoedaBR(totalBeneficio) +
      '<br><small><em>Vigência 2026: Piso de R$ 1.621,00 (Salário Mínimo Nacional) e Teto de R$ 2.588,41 conforme Portaria Interministerial MPS/MF nº 13/2026.</em></small>';
  }
  box.classList.add('active');
};

// 5. Calculadora de Imposto de Renda Retido na Fonte (IRPF / Salário Líquido 2026 — Lei nº 15.270/2025)
window.calcularIRPFMensal = function () {
  var salarioBruto = parseFloat(document.getElementById('irpf-salario').value) || 0;
  var dependentes = parseInt(document.getElementById('irpf-dependentes').value, 10) || 0;

  var inss = calcularDescontoINSS(salarioBruto);
  var irObj = calcularIRRF(salarioBruto, inss, dependentes);
  var irrf = irObj.irrf;
  var salarioLiquido = salarioBruto - inss - irrf;
  var aliquotaEfetiva = salarioBruto > 0 ? ((irrf / salarioBruto) * 100).toFixed(2) : '0.00';

  var box = document.getElementById('resultado-irpf');
  document.getElementById('irpf-valor-imposto').textContent =
    irrf === 0 ? 'ISENTO (R$ 0,00 — Lei nº 15.270/2025)' : formatarMoedaBR(irrf) + ' / mês';
  document.getElementById('irpf-detalhes').innerHTML =
    '<strong>Salário Líquido Estimado:</strong> ' + formatarMoedaBR(salarioLiquido) +
    ' | <strong>Desconto INSS (Tabela 2026):</strong> ' + formatarMoedaBR(inss) +
    ' | <strong>Faixa IRPF:</strong> ' + irObj.faixa + ' (Alíquota efetiva: ' + aliquotaEfetiva + '%)' +
    '<br><small>Regra aplicada: ' + irObj.metodo + '</small>';
  box.classList.add('active');
};
