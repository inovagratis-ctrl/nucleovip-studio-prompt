import os
import io
import urllib.request
from PIL import Image, ImageDraw, ImageEnhance

OUT_DIR = r"C:\Users\Eusimar\.gemini\antigravity\scratch\portal-utilidade-publica-wp\cohesive_covers"
os.makedirs(OUT_DIR, exist_ok=True)

# Brand palette matching the 4 kit covers (mei-pequeno-negocio.webp & apostas-responsaveis.webp)
NAVY = (16, 43, 87, 255)          # #102b57
NAVY_DARK = (11, 31, 64, 255)     # #0b1f40
NAVY_SOFT = (28, 64, 118, 255)    # #1c4076
GREEN = (23, 139, 75, 255)        # #178b4b
GREEN_CHECK = (46, 133, 64, 255)  # #2e8540
SAGE = (143, 209, 117, 255)       # #8fd175
SAGE_LIGHT = (218, 242, 222, 255) # #daf2de
CREAM = (249, 245, 232, 255)      # #f9f5e8
WHITE = (255, 255, 255, 255)
SLATE_LINE = (130, 152, 178, 255)
GOLD_ACCENT = (235, 172, 78, 255)

POSTS_SPEC = [
    {
        "post_id": 119,
        "slug": "guia-pratico-cadunico-cras-documentos-onde-atualizar",
        "icon_type": "cras_checklist",
        "photo_url": "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1200&q=85",
        "title": "Guia Prático do CadÚnico e CRAS",
        "alt": "Ilustração editorial sobre atendimento no CRAS e checklist de documentos do CadÚnico",
    },
    {
        "post_id": 24,
        "slug": "bpc-loas-valor-requisitos-renda-familiar-como-solicitar",
        "icon_type": "bpc_shield",
        "photo_url": "https://images.unsplash.com/photo-1516733968668-dbdce39c4651?auto=format&fit=crop&w=1200&q=85",
        "title": "Guia do Benefício BPC LOAS",
        "alt": "Idoso sorrindo em ambiente residencial com ícone de proteção assistencial do benefício BPC LOAS",
    },
    {
        "post_id": 23,
        "slug": "abono-salarial-pis-pasep-calendario-quem-tem-direito-consultar",
        "icon_type": "pis_workcard",
        "photo_url": "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=85",
        "title": "Abono Salarial PIS PASEP",
        "alt": "Trabalhadores em ambiente profissional com ilustração da Carteira de Trabalho e abono PIS PASEP",
    },
    {
        "post_id": 22,
        "slug": "calculadora-imposto-de-renda-mensal-irpf-salario-liquido",
        "icon_type": "irpf_tax",
        "photo_url": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=85",
        "title": "Calculadora de IRPF Mensal e Salário Líquido",
        "alt": "Planejamento financeiro com calculadora e notebook ilustrando simulação de Imposto de Renda",
    },
    {
        "post_id": 21,
        "slug": "calculadora-seguro-desemprego-valor-quantidade-parcelas",
        "icon_type": "seguro_parcelas",
        "photo_url": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85",
        "title": "Calculadora de Seguro-Desemprego",
        "alt": "Trabalhador organizando planejamento no notebook com ilustração de parcelas do Seguro-Desemprego",
    },
    {
        "post_id": 20,
        "slug": "simulador-decimo-terceiro-salario-1-e-2-parcela",
        "icon_type": "decimo_calc",
        "photo_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
        "title": "Simulador de 13º Salário CLT",
        "alt": "Mesa de planejamento trabalhista com ilustração de calculadora e duas parcelas do 13º salário",
    },
    {
        "post_id": 19,
        "slug": "calculadora-de-ferias-clt-terco-constitucional-abono",
        "icon_type": "ferias_calendar",
        "photo_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
        "title": "Calculadora de Férias CLT",
        "alt": "Cenário de descanso planejado com ilustração de calendário de férias remuneradas",
    },
    {
        "post_id": 18,
        "slug": "calculadora-rescisao-trabalhista-clt-multa-fgts",
        "icon_type": "rescisao_contract",
        "photo_url": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85",
        "title": "Calculadora de Rescisão Trabalhista CLT",
        "alt": "Conferência de contrato de trabalho com ilustração de cálculo de verbas rescisórias CLT",
    },
    {
        "post_id": 17,
        "slug": "restituicao-imposto-de-renda-consultar-lotes-receber-pix",
        "icon_type": "restituicao_refund",
        "photo_url": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85",
        "title": "Restituição do Imposto de Renda",
        "alt": "Consulta financeira digital com ilustração de devolução de lote da restituição do Imposto de Renda",
    },
    {
        "post_id": 16,
        "slug": "tarifa-social-energia-eletrica-desconto-conta-luz-solicitar",
        "icon_type": "energia_bolt",
        "photo_url": "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=85",
        "title": "Tarifa Social de Energia Elétrica",
        "alt": "Infraestrutura de energia limpa com ilustração de desconto na fatura da Tarifa Social de Energia",
    },
    {
        "post_id": 15,
        "slug": "sistema-valores-a-receber-banco-central-dinheiro-esquecido",
        "icon_type": "svr_bank",
        "photo_url": "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=1200&q=85",
        "title": "Sistema Valores a Receber do Banco Central",
        "alt": "Operação bancária com ilustração de instituição financeira e resgate de Valores a Receber",
    },
    {
        "post_id": 14,
        "slug": "certidao-negativa-debitos-situacao-cadastral-cpf-receita",
        "icon_type": "cpf_certificate",
        "photo_url": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85",
        "title": "Situação Cadastral do CPF e Certidão Negativa",
        "alt": "Conferência de cadastro no computador com ilustração de certidão regular de CPF",
    },
    {
        "post_id": 13,
        "slug": "como-subir-conta-gov-br-nivel-prata-ou-ouro",
        "icon_type": "govbr_biometrics",
        "photo_url": "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=85",
        "title": "Conta Gov.br Nível Prata e Ouro",
        "alt": "Acesso digital seguro com ilustração de validação biométrica facial e escudo de proteção",
    },
    {
        "post_id": 12,
        "slug": "nova-carteira-de-identidade-nacional-cin-como-tirar",
        "icon_type": "cin_idcard",
        "photo_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85",
        "title": "Nova Carteira de Identidade Nacional (CIN)",
        "alt": "Cidadã sorrindo com ilustração da Nova Carteira de Identidade Nacional com QR Code",
    },
    {
        "post_id": 11,
        "slug": "bolsa-familia-e-cadastro-unico-cadunico-quem-tem-direito",
        "icon_type": "bolsa_familia",
        "photo_url": "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=85",
        "title": "Guia do Bolsa Família e CadÚnico",
        "alt": "Família reunida com ilustração de proteção social e programa Bolsa Família",
    },
    {
        "post_id": 10,
        "slug": "meu-inss-como-consultar-beneficios-cnis-pericia",
        "icon_type": "meu_inss",
        "photo_url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
        "title": "Guia do Portal e Aplicativo Meu INSS",
        "alt": "Consulta previdenciária no notebook com ilustração de extrato de benefícios e agendamentos",
    },
    {
        "post_id": 9,
        "slug": "como-consultar-fgts-pelo-cpf-saque-aniversario",
        "icon_type": "fgts_savings",
        "photo_url": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=85",
        "title": "Consulta do FGTS e Saque-Aniversário",
        "alt": "Planejamento financeiro do trabalhador com ilustração de saldo acumulado do FGTS",
    },
]

def draw_check_badge(draw, cx, cy, r):
    draw.ellipse((cx - r - 10, cy - r - 10, cx + r + 10, cy + r + 10), fill=WHITE)
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=GREEN_CHECK)
    pts = [
        (cx - int(r * 0.42), cy + int(r * 0.02)),
        (cx - int(r * 0.10), cy + int(r * 0.34)),
        (cx + int(r * 0.46), cy - int(r * 0.28)),
    ]
    draw.line(pts, fill=WHITE, width=int(r * 0.24), joint="curve")

def draw_shield_badge(draw, cx, cy, r):
    w = int(r * 1.15)
    h = int(r * 1.35)
    pts = [
        (cx, cy - h),
        (cx + w, cy - int(h * 0.65)),
        (cx + int(w * 0.88), cy + int(h * 0.25)),
        (cx, cy + h),
        (cx - int(w * 0.88), cy + int(h * 0.25)),
        (cx - w, cy - int(h * 0.65)),
    ]
    draw.polygon(pts, fill=NAVY, outline=WHITE, width=10)
    w2 = int(w * 0.78)
    h2 = int(h * 0.78)
    pts2 = [
        (cx, cy - h2),
        (cx + w2, cy - int(h2 * 0.65)),
        (cx + int(w2 * 0.88), cy + int(h2 * 0.25)),
        (cx, cy + h2),
        (cx - int(w2 * 0.88), cy + int(h2 * 0.25)),
        (cx - w2, cy - int(h2 * 0.65)),
    ]
    draw.polygon(pts2, outline=WHITE, width=6)
    c_pts = [
        (cx - int(r * 0.38), cy + int(r * 0.02)),
        (cx - int(r * 0.08), cy + int(r * 0.32)),
        (cx + int(r * 0.44), cy - int(r * 0.24)),
    ]
    draw.line(c_pts, fill=WHITE, width=int(r * 0.22), joint="curve")

def draw_topic_vector(draw, icon_type, cx, cy):
    if icon_type == "decimo_calc":
        draw.rounded_rectangle((cx - 210, cy - 220, cx + 90, cy + 190), radius=28, fill=WHITE, outline=NAVY, width=10)
        for i in range(3):
            y = cy - 140 + i * 55
            draw.rounded_rectangle((cx - 165, y, cx + 35, y + 22), radius=8, fill=SLATE_LINE)
        draw.rounded_rectangle((cx - 40, cy - 160, cx + 210, cy + 210), radius=32, fill=NAVY, outline=WHITE, width=8)
        draw.rounded_rectangle((cx - 5, cy - 120, cx + 175, cy - 35), radius=14, fill=SAGE_LIGHT)
        for row in range(3):
            for col in range(3):
                bx = cx - 5 + col * 64
                by = cy - 5 + row * 62
                b_col = GREEN if (row == 2 and col == 2) else WHITE
                draw.rounded_rectangle((bx, by, bx + 48, by + 44), radius=10, fill=b_col)

    elif icon_type == "rescisao_contract":
        draw.rounded_rectangle((cx - 190, cy - 230, cx + 140, cy + 210), radius=28, fill=WHITE, outline=NAVY, width=12)
        draw.rounded_rectangle((cx - 95, cy - 260, cx + 45, cy - 195), radius=16, fill=NAVY)
        for i in range(4):
            y = cy - 135 + i * 56
            w = 220 if i < 3 else 140
            draw.rounded_rectangle((cx - 135, y, cx - 135 + w, y + 22), radius=8, fill=NAVY if i == 0 else SLATE_LINE)
        draw.rounded_rectangle((cx - 135, cy + 105, cx + 75, cy + 145), radius=10, fill=SAGE_LIGHT)
        for i in range(3):
            cy_coin = cy + 160 - i * 42
            draw.ellipse((cx + 70, cy_coin - 25, cx + 220, cy_coin + 25), fill=GOLD_ACCENT, outline=NAVY, width=8)

    elif icon_type == "ferias_calendar":
        draw.rounded_rectangle((cx - 210, cy - 195, cx + 190, cy + 205), radius=32, fill=WHITE, outline=NAVY, width=12)
        draw.rounded_rectangle((cx - 210, cy - 195, cx + 190, cy - 85), radius=32, fill=NAVY)
        draw.rectangle((cx - 210, cy - 125, cx + 190, cy - 85), fill=NAVY)
        draw.rounded_rectangle((cx - 125, cy - 235, cx - 85, cy - 155), radius=12, fill=GREEN, outline=WHITE, width=6)
        draw.rounded_rectangle((cx + 65, cy - 235, cx + 105, cy - 155), radius=12, fill=GREEN, outline=WHITE, width=6)
        for r in range(3):
            for c in range(4):
                gx = cx - 155 + c * 82
                gy = cy - 45 + r * 72
                col = GREEN if (r == 1 and c in (1, 2, 3)) else SAGE_LIGHT if r == 1 else (226, 232, 240, 255)
                draw.rounded_rectangle((gx, gy, gx + 58, gy + 48), radius=10, fill=col)

    elif icon_type == "seguro_parcelas":
        draw.rounded_rectangle((cx - 205, cy - 215, cx + 175, cy + 205), radius=28, fill=WHITE, outline=NAVY, width=12)
        draw.rounded_rectangle((cx - 155, cy - 165, cx + 125, cy - 95), radius=14, fill=NAVY)
        for i in range(5):
            bx = cx - 150 + i * 58
            bh = 70 + i * 28
            by = cy + 150 - bh
            col = GREEN if i >= 2 else NAVY_SOFT
            draw.rounded_rectangle((bx, by, bx + 40, cy + 150), radius=8, fill=col)

    elif icon_type == "irpf_tax":
        draw.rounded_rectangle((cx - 195, cy - 225, cx + 155, cy + 210), radius=28, fill=WHITE, outline=NAVY, width=12)
        draw.rounded_rectangle((cx - 145, cy - 170, cx + 105, cy - 110), radius=12, fill=NAVY)
        for i in range(3):
            y = cy - 70 + i * 54
            draw.rounded_rectangle((cx - 145, y, cx + 20, y + 24), radius=8, fill=SLATE_LINE)
            draw.rounded_rectangle((cx + 45, y, cx + 105, y + 24), radius=8, fill=GREEN)
        draw.rounded_rectangle((cx - 145, cy + 105, cx + 105, cy + 160), radius=12, fill=SAGE_LIGHT, outline=GREEN, width=6)

    elif icon_type == "pis_workcard":
        draw.rounded_rectangle((cx - 185, cy - 225, cx + 155, cy + 210), radius=28, fill=NAVY, outline=WHITE, width=10)
        draw.ellipse((cx - 75, cy - 135, cx + 45, cy - 15), fill=GOLD_ACCENT)
        draw.rounded_rectangle((cx - 125, cy + 25, cx + 95, cy + 55), radius=10, fill=WHITE)
        draw.rounded_rectangle((cx - 95, cy + 80, cx + 65, cy + 106), radius=10, fill=SAGE_LIGHT)
        draw.rounded_rectangle((cx + 20, cy - 180, cx + 230, cy - 40), radius=18, fill=GREEN, outline=WHITE, width=8)
        draw.ellipse((cx + 95, cy - 140, cx + 155, cy - 80), fill=SAGE_LIGHT)

    elif icon_type == "bpc_shield":
        draw.rounded_rectangle((cx - 195, cy - 190, cx + 175, cy + 195), radius=32, fill=WHITE, outline=NAVY, width=12)
        draw.ellipse((cx - 110, cy - 115, cx + 5, cy - 5), fill=GREEN)
        draw.ellipse((cx - 25, cy - 115, cx + 90, cy - 5), fill=GREEN)
        draw.polygon([(cx - 112, cy - 45), (cx + 92, cy - 45), (cx - 10, cy + 85)], fill=GREEN)
        draw.rounded_rectangle((cx - 135, cy + 115, cx + 115, cy + 145), radius=10, fill=NAVY)

    elif icon_type == "cras_checklist":
        draw.rounded_rectangle((cx - 195, cy - 220, cx + 165, cy + 210), radius=28, fill=WHITE, outline=NAVY, width=12)
        draw.rounded_rectangle((cx - 195, cy - 220, cx + 165, cy - 130), radius=24, fill=NAVY)
        for i in range(3):
            y = cy - 80 + i * 82
            draw.ellipse((cx - 145, y - 8, cx - 95, y + 42), fill=GREEN)
            draw.line([(cx - 132, y + 16), (cx - 120, y + 28), (cx - 106, y + 8)], fill=WHITE, width=7)
            draw.rounded_rectangle((cx - 70, y + 4, cx + 115, y + 30), radius=8, fill=NAVY if i == 0 else SLATE_LINE)

    elif icon_type == "restituicao_refund":
        draw.rounded_rectangle((cx - 195, cy - 120, cx + 155, cy + 95), radius=22, fill=SAGE_LIGHT, outline=GREEN, width=10)
        draw.rounded_rectangle((cx - 165, cy - 90, cx + 125, cy + 65), radius=14, fill=WHITE, outline=GREEN, width=6)
        draw.ellipse((cx - 65, cy - 55, cx + 25, cy + 35), fill=GREEN)
        draw.arc((cx - 180, cy - 230, cx + 160, cy + 110), start=200, end=340, fill=NAVY, width=22)
        draw.polygon([(cx - 195, cy - 115), (cx - 125, cy - 165), (cx - 120, cy - 85)], fill=NAVY)

    elif icon_type == "energia_bolt":
        draw.rounded_rectangle((cx - 190, cy - 220, cx + 160, cy + 210), radius=28, fill=WHITE, outline=NAVY, width=12)
        bolt = [
            (cx + 15, cy - 165),
            (cx - 95, cy - 10),
            (cx - 10, cy - 10),
            (cx - 45, cy + 145),
            (cx + 85, cy - 25),
            (cx - 5, cy - 25),
        ]
        draw.polygon(bolt, fill=GOLD_ACCENT, outline=NAVY, width=8)

    elif icon_type == "svr_bank":
        draw.polygon([(cx - 200, cy - 95), (cx + 180, cy - 95), (cx - 10, cy - 215)], fill=NAVY)
        draw.rounded_rectangle((cx - 190, cy - 95, cx + 170, cy - 65), radius=8, fill=GREEN)
        for i in range(4):
            bx = cx - 155 + i * 86
            draw.rounded_rectangle((bx, cy - 65, bx + 38, cy + 125), radius=6, fill=WHITE, outline=NAVY, width=8)
        draw.rounded_rectangle((cx - 205, cy + 125, cx + 185, cy + 175), radius=10, fill=NAVY)

    elif icon_type == "cpf_certificate":
        draw.rounded_rectangle((cx - 215, cy - 155, cx + 185, cy + 135), radius=28, fill=WHITE, outline=NAVY, width=12)
        draw.rounded_rectangle((cx - 215, cy - 155, cx + 185, cy - 75), radius=24, fill=NAVY)
        draw.ellipse((cx - 165, cy - 35, cx - 65, cy + 65), fill=GREEN)
        draw.rounded_rectangle((cx - 35, cy - 25, cx + 135, cy + 4), radius=8, fill=NAVY)
        draw.rounded_rectangle((cx - 35, cy + 25, cx + 95, cy + 52), radius=8, fill=SLATE_LINE)

    elif icon_type == "govbr_biometrics":
        draw.rounded_rectangle((cx - 145, cy - 235, cx + 135, cy + 225), radius=38, fill=NAVY, outline=WHITE, width=10)
        draw.rounded_rectangle((cx - 115, cy - 185, cx + 105, cy + 175), radius=22, fill=WHITE)
        draw.ellipse((cx - 50, cy - 95, cx + 40, cy - 5), fill=GREEN)
        draw.pieslice((cx - 85, cy + 5, cx + 75, cy + 145), start=180, end=360, fill=GREEN)
        draw.line([(cx - 85, cy - 130), (cx - 45, cy - 130)], fill=NAVY, width=10)
        draw.line([(cx - 85, cy - 130), (cx - 85, cy - 90)], fill=NAVY, width=10)
        draw.line([(cx + 75, cy - 130), (cx + 35, cy - 130)], fill=NAVY, width=10)
        draw.line([(cx + 75, cy - 130), (cx + 75, cy - 90)], fill=NAVY, width=10)

    elif icon_type == "cin_idcard":
        draw.rounded_rectangle((cx - 220, cy - 155, cx + 190, cy + 145), radius=28, fill=WHITE, outline=NAVY, width=12)
        draw.rounded_rectangle((cx - 185, cy - 115, cx + 155, cy - 75), radius=10, fill=GREEN)
        draw.rounded_rectangle((cx - 180, cy - 45, cx - 60, cy + 95), radius=14, fill=SAGE_LIGHT, outline=NAVY, width=6)
        draw.ellipse((cx - 145, cy - 25, cx - 95, cy + 25), fill=NAVY)
        draw.rounded_rectangle((cx - 35, cy - 40, cx + 145, cy - 14), radius=6, fill=NAVY)
        draw.rounded_rectangle((cx - 35, cy + 4, cx + 75, cy + 28), radius=6, fill=SLATE_LINE)
        draw.rectangle((cx + 85, cy + 20, cx + 150, cy + 85), fill=NAVY)

    elif icon_type == "bolsa_familia":
        draw.polygon([(cx - 215, cy - 35), (cx + 195, cy - 35), (cx - 10, cy - 195)], fill=NAVY)
        draw.rounded_rectangle((cx - 165, cy - 35, cx + 145, cy + 175), radius=22, fill=WHITE, outline=NAVY, width=12)
        draw.ellipse((cx - 95, cy - 5, cx - 35, cy + 55), fill=GREEN)
        draw.pieslice((cx - 125, cy + 65, cx - 5, cy + 175), start=180, end=360, fill=GREEN)
        draw.ellipse((cx + 15, cy + 15, cx + 65, cy + 65), fill=GOLD_ACCENT)
        draw.pieslice((cx - 10, cy + 75, cx + 90, cy + 175), start=180, end=360, fill=GOLD_ACCENT)

    elif icon_type == "meu_inss":
        draw.rounded_rectangle((cx - 215, cy - 185, cx + 185, cy + 175), radius=28, fill=WHITE, outline=NAVY, width=12)
        draw.rounded_rectangle((cx - 215, cy - 185, cx + 185, cy - 105), radius=24, fill=NAVY)
        for i in range(3):
            draw.ellipse((cx - 175 + i * 32, cy - 155, cx - 155 + i * 32, cy - 135), fill=SAGE)
        for i in range(3):
            y = cy - 60 + i * 65
            draw.rounded_rectangle((cx - 165, y, cx + 55, y + 28), radius=8, fill=NAVY if i == 0 else SLATE_LINE)
            draw.rounded_rectangle((cx + 80, y, cx + 140, y + 28), radius=8, fill=GREEN)

    elif icon_type == "fgts_savings":
        draw.rounded_rectangle((cx - 205, cy - 205, cx + 175, cy + 195), radius=32, fill=WHITE, outline=NAVY, width=12)
        for i in range(4):
            bx = cx - 155 + i * 78
            bh = 65 + i * 38
            by = cy + 135 - bh
            draw.rounded_rectangle((bx, by, bx + 52, cy + 135), radius=10, fill=GREEN if i == 3 else NAVY)
        draw.line([(cx - 145, cy + 20), (cx - 45, cy - 55), (cx + 25, cy - 20), (cx + 115, cy - 125)], fill=GOLD_ACCENT, width=16)

def harmonize_photo(img, target_w=2400, target_h=1350):
    """
    Frames the photo into the left 64% (1536x1350) so the main subject is always centered
    around x=740 (left side) and never covered by the right-side emblem!
    """
    canvas = Image.new("RGBA", (target_w, target_h), NAVY_DARK)

    left_w = 1580
    src_w, src_h = img.size
    dst_ratio = left_w / float(target_h)
    src_ratio = src_w / float(src_h)

    if src_ratio > dst_ratio:
        crop_h = src_h
        crop_w = int(src_h * dst_ratio)
        crop_x = int((src_w - crop_w) * 0.5)
        crop_y = 0
    else:
        crop_w = src_w
        crop_h = int(src_w / dst_ratio)
        crop_x = 0
        # Top-biased crop (0.18) so heads are never cut off
        crop_y = int((src_h - crop_h) * 0.18)

    left_img = img.crop((crop_x, crop_y, crop_x + crop_w, crop_y + crop_h)).resize((left_w, target_h), Image.LANCZOS).convert("RGBA")
    left_img = ImageEnhance.Color(left_img).enhance(0.94)
    left_img = ImageEnhance.Contrast(left_img).enhance(1.05)
    warm_overlay = Image.new("RGBA", (left_w, target_h), (248, 236, 210, 28))
    left_img = Image.alpha_composite(left_img, warm_overlay)

    canvas.paste(left_img, (0, 0))

    # Smooth transition into the right-side architectural navy & green backdrop
    grad = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(grad)
    blend_start = 1120
    blend_end = 1580
    for x in range(blend_start, target_w):
        if x < blend_end:
            t = (x - blend_start) / float(blend_end - blend_start)
            alpha = int((t ** 0.85) * 255)
        else:
            alpha = 255
        gdraw.line([(x, 0), (x, target_h)], fill=(16, 43, 87, alpha))

    # Signature vertical green bar on the right panel (matching mei-pequeno-negocio.webp)
    gdraw.rectangle((int(target_w * 0.78), 0, int(target_w * 0.82), target_h), fill=(23, 139, 75, 215))
    return Image.alpha_composite(canvas, grad)

def render_cover(spec):
    W, H = 2400, 1350
    req = urllib.request.Request(spec["photo_url"], headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        raw = resp.read()
    src_img = Image.open(io.BytesIO(raw))

    canvas = harmonize_photo(src_img, W, H)
    draw = ImageDraw.Draw(canvas)

    # 1. Outer soft sage accent circle
    draw.ellipse((1290, 120, 1930, 760), fill=SAGE)
    # 2. Main warm cream circle
    cx, cy = 1730, 560
    r_main = 390
    draw.ellipse((cx - r_main, cy - r_main, cx + r_main, cy + r_main), fill=CREAM)

    # 3. Topic-specific crisp vector graphic
    draw_topic_vector(draw, spec["icon_type"], cx - 20, cy)

    # 4. Secondary verification badge
    if spec["post_id"] in (13, 14, 21, 24, 119):
        draw_shield_badge(draw, cx + 275, cy + 165, 125)
    else:
        draw_check_badge(draw, cx + 265, cy + 165, 130)

    final_img = canvas.convert("RGB").resize((1200, 675), Image.LANCZOS)
    out_path = os.path.join(OUT_DIR, f"cover-{spec['post_id']}-{spec['icon_type']}.webp")
    final_img.save(out_path, "WEBP", quality=86, method=6)
    print(f"Saved {out_path} ({os.path.getsize(out_path) // 1024} KB)")
    return out_path

if __name__ == "__main__":
    for item in POSTS_SPEC:
        render_cover(item)
