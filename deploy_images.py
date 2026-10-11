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

GEN_PHP = r"""<?php
require_once '/var/www/nucleovip_wp/wp-load.php';

$posts = get_posts(array(
    'numberposts' => 100,
    'post_status' => 'publish',
    'post_type'   => 'post',
));

$count = 0;
foreach ($posts as $p) {
    delete_post_thumbnail($p->ID);
    guia_cidadao_generate_post_thumbnail($p->ID);
    if (has_post_thumbnail($p->ID)) {
        $count++;
    }
}
echo "GENERATED_THUMBNAILS: $count / " . count($posts) . "\n";
"""

def main():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(VPS_HOST, port=22, username=VPS_USER, password=VPS_PASS, timeout=20)

    sftp = ssh.open_sftp()
    sftp.put(LOCAL_ZIP, '/tmp/guia-cidadao-adsense.zip')
    with sftp.file('/tmp/gen_thumbs.php', 'w') as f:
        f.write(GEN_PHP)
    sftp.close()

    cmd = """
    unzip -o /tmp/guia-cidadao-adsense.zip -d /var/www/nucleovip_wp/wp-content/themes/
    php /tmp/gen_thumbs.php
    rm -f /tmp/gen_thumbs.php /tmp/guia-cidadao-adsense.zip
    chown -R www-data:www-data /var/www/nucleovip_wp
    """
    _, out, err = ssh.exec_command(cmd)
    print(out.read().decode('utf-8', errors='ignore'))
    print(err.read().decode('utf-8', errors='ignore'))
    ssh.close()

if __name__ == '__main__':
    main()
