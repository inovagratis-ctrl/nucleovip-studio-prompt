import os
import glob

adsense_tag = '\t<!-- Google AdSense -->\n\t<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3922432751903141" crossorigin="anonymous"></script>\n</head>'

html_files = glob.glob('public/**/*.html', recursive=True)
count = 0

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'ca-pub-3922432751903141' not in content:
        if '</head>' in content:
            new_content = content.replace('</head>', adsense_tag, 1)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1

print(f"Sucesso: AdSense adicionado em {count} arquivos HTML.")
