import paramiko
import zipfile
import os

VPS_HOST = '216.22.13.236'
VPS_USER = 'root'
VPS_PASS = 'PgmgTVJ8ftewUCzp'

THEME_DIR = r"C:\Users\Eusimar\.gemini\antigravity\scratch\portal-utilidade-publica-wp\guia-cidadao-adsense"
LOCAL_ZIP = r"C:\Users\Eusimar\.gemini\antigravity\scratch\portal-utilidade-publica-wp\guia-cidadao-adsense.zip"

if os.path.exists(LOCAL_ZIP):
    os.remove(LOCAL_ZIP)

with zipfile.ZipFile(LOCAL_ZIP, 'w', zipfile.ZIP_DEFLATED) as z:
    for root, dirs, files in os.walk(THEME_DIR):
        for f in files:
            full = os.path.join(root, f)
            rel = os.path.relpath(full, os.path.dirname(THEME_DIR))
            z.write(full, rel)

UPDATE_POSTS_PHP = r"""<?php
require_once '/var/www/nucleovip_wp/wp-load.php';

// Remove qualquer mod antigo de placeholder no banco
remove_theme_mod('adsense_show_placeholders');

// Atualiza o artigo do Simulador de 13º Salário com a Tabela Oficial 2026 (Portaria MPS/MF nº 13/2026), prazos exatos de 2026 e exemplo conferido
$post_13 = get_page_by_path('simulador-decimo-terceiro-salario-1-e-2-parcela', OBJECT, 'post');
if ($post_13) {
    $new_content_13 = '<p>Informe abaixo seu salário bruto mensal fixo, a quantidade de meses trabalhados no ano e o número de dependentes para calcular a <strong>estimativa da 1ª parcela e da 2ª parcela do 13º Salário em 2026</strong>, com base nas faixas progressivas oficiais da <a href="https://www.gov.br/previdencia/pt-br/assuntos/rpps/documentos/PortariaInterministerialMPSMF13de9dejaneirode2026.pdf" target="_blank" rel="noopener nofollow">Portaria Interministerial MPS/MF nº 13, de 9 de janeiro de 2026</a>:</p>
[calculadora_decimo_terceiro]
<h2>Prazos Oficiais de Pagamento do 13º Salário em 2026 (Lei nº 4.749/1965 e eSocial)</h2>
<p>De acordo com a <a href="https://www.planalto.gov.br/ccivil_03/leis/l4749.htm" target="_blank" rel="noopener nofollow">Lei Federal nº 4.749, de 12 de agosto de 1965</a> e a orientação oficial do <a href="https://www.gov.br/esocial/pt-br/noticias/como-pagar-a-primeira-parcela-do-13o-salario" target="_blank" rel="noopener nofollow">Portal eSocial</a>, o pagamento da Gratificação de Natal é dividido em duas parcelas:</p>
<ul>
<li><strong>1ª Parcela (Adiantamento):</strong> Deve ser paga entre 1º de fevereiro e <strong>30 de novembro de 2026 (segunda-feira)</strong>. Corresponde a <strong>50% do salário bruto proporcional</strong>, sem incidência de desconto de INSS ou IRRF;</li>
<li><strong>2ª Parcela:</strong> O prazo legal encerra em 20 de dezembro (como 20/12/2026 cai num domingo, o pagamento deve ser antecipado para até <strong>18 de dezembro de 2026, sexta-feira</strong>). Nesta parcela são descontados o adiantamento da 1ª parcela, a contribuição previdenciária (INSS) sobre o valor total do 13º e, quando aplicável, o Imposto de Renda Retido na Fonte (IRRF).</li>
</ul>
<h2>Tabela Progressiva Oficial do INSS 2026 (Portaria Interministerial MPS/MF nº 13/2026)</h2>
<ul>
<li><strong>Faixa 1 (até R$ 1.621,00):</strong> alíquota de <strong>7,5%</strong>;</li>
<li><strong>Faixa 2 (de R$ 1.621,01 até R$ 2.902,84):</strong> alíquota progressiva de <strong>9,0%</strong>;</li>
<li><strong>Faixa 3 (de R$ 2.902,85 até R$ 4.354,27):</strong> alíquota progressiva de <strong>12,0%</strong>;</li>
<li><strong>Faixa 4 (de R$ 4.354,28 até o teto de R$ 8.708,55):</strong> alíquota progressiva de <strong>14,0%</strong>.</li>
</ul>
<h2>Exemplo Prático Conferido (Salário Bruto de R$ 3.000,00 e 12 meses trabalhados)</h2>
<div class="gov-callout">
<span class="gov-callout-title">📌 Demonstração Reproduzível do Cálculo (Vigência 2026):</span>
<ul>
<li><strong>1ª Parcela (até 30/11/2026):</strong> R$ 1.500,00 (50% do bruto, sem descontos);</li>
<li><strong>Cálculo progressivo do INSS sobre R$ 3.000,00:</strong>
  <br>1ª faixa: R$ 1.621,00 × 7,5% = R$ 121,575
  <br>2ª faixa: (R$ 2.902,84 − R$ 1.621,00) × 9% = R$ 115,3656
  <br>3ª faixa: (R$ 3.000,00 − R$ 2.902,84) × 12% = R$ 11,6592
  <br><strong>Total de INSS: R$ 248,60</strong>;</li>
<li><strong>IRRF sobre 13º (R$ 3.000,00):</strong> Base com desconto simplificado (R$ 3.000,00 − R$ 564,80 = R$ 2.435,20) &rarr; R$ 2.435,20 × 7,5% − R$ 169,44 = <strong>R$ 13,20</strong>;</li>
<li><strong>2ª Parcela Líquida:</strong> R$ 3.000,00 − R$ 1.500,00 (1ª parc.) − R$ 248,60 (INSS) − R$ 13,20 (IRRF) = <strong>R$ 1.238,20</strong>;</li>
<li><strong>Total Líquido Estimado (1ª + 2ª parcelas):</strong> <strong>R$ 2.738,20</strong>.</li>
</ul>
</div>
<p><em>Nota técnica sobre remuneração variável: Caso o trabalhador receba horas extras, comissões, adicional noturno ou insalubridade/periculosidade, a média anual dessas verbas deve ser somada ao salário fixo (Súmula 45 do TST), com ajuste definitivo das diferenças de dezembro até o dia 10 de janeiro do ano seguinte (Art. 2º do Decreto nº 57.155/1965).</em></p>
<p><em>Referências normativas oficiais: <a href="https://www.gov.br/previdencia/pt-br/assuntos/rpps/documentos/PortariaInterministerialMPSMF13de9dejaneirode2026.pdf" target="_blank" rel="noopener nofollow">Portaria Interministerial MPS/MF nº 13, de 9 de janeiro de 2026</a>, <a href="https://www.planalto.gov.br/ccivil_03/leis/l4749.htm" target="_blank" rel="noopener nofollow">Lei nº 4.749/1965</a> e <a href="https://www.gov.br/esocial/pt-br/noticias/como-pagar-a-primeira-parcela-do-13o-salario" target="_blank" rel="noopener nofollow">Portal eSocial</a>.</em></p>';

    wp_update_post(array(
        'ID'           => $post_13->ID,
        'post_title'   => 'Simulador de 13º Salário CLT 2026: Estimativa da 1ª e 2ª Parcela (Tabela INSS Portaria MPS/MF nº 13/2026)',
        'post_excerpt' => 'Calcule a estimativa da 1ª parcela (até 30/11/2026) e da 2ª parcela do 13º Salário com a tabela oficial do INSS 2026 (Portaria MPS/MF nº 13/2026) e IRRF.',
        'post_content' => $new_content_13,
    ));
}

echo "AUDIT_FIXES_APPLIED_OK\n";
"""

def main():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(VPS_HOST, port=22, username=VPS_USER, password=VPS_PASS, timeout=20)

    sftp = ssh.open_sftp()
    sftp.put(LOCAL_ZIP, '/tmp/guia-cidadao-adsense.zip')
    with sftp.file('/tmp/apply_audit_fixes.php', 'w') as f:
        f.write(UPDATE_POSTS_PHP)
    sftp.close()

    cmd = """
    unzip -o /tmp/guia-cidadao-adsense.zip -d /var/www/nucleovip_wp/wp-content/themes/
    php /tmp/apply_audit_fixes.php
    rm -f /tmp/apply_audit_fixes.php /tmp/guia-cidadao-adsense.zip
    chown -R www-data:www-data /var/www/nucleovip_wp
    """
    _, out, err = ssh.exec_command(cmd)
    print(out.read().decode('utf-8', errors='ignore'))
    print(err.read().decode('utf-8', errors='ignore'))
    ssh.close()

if __name__ == '__main__':
    main()
