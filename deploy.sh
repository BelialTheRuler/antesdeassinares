#!/usr/bin/env bash
# ============================================================
# Deploy para GitHub Pages — domínio grátis: USER.github.io/REPO
# ------------------------------------------------------------
# Passo 1 (no browser): criar o repo em github.com (público)
#    Nome sugerido: ferramentasia   (ou SEU_USER.github.io
#    para servir na raiz sem pasta)
# Passo 2 (aqui): ./deploy.sh SEU_USER [NOME_DO_REPO]
# ============================================================
set -e

USER="$1"
REPO="${2:-ferramentasia}"

if [ -z "$USER" ]; then
  echo "Uso: ./deploy.sh SEU_USER [NOME_DO_REPO]"
  echo "Ex.: ./deploy.sh joaosilva ferramentasia"
  exit 1
fi

cd "$(dirname "$0")"

if [ ! -d .git ]; then
  git init
fi

git add .
git commit -m "Site ferramentas-ia v1" 2>/dev/null || echo "Nada novo para commitar."

git branch -M main

if ! git remote | grep -q origin; then
  git remote add origin "https://github.com/$USER/$REPO.git"
fi

git push -u origin main

echo ""
echo "============================================"
echo " Feito! O site fica em:"
echo "   https://$USER.github.io/$REPO/"
echo ""
echo " Falta 1 passo no browser:"
echo "   GitHub → Repo → Settings → Pages"
echo "   Source: main  /  pasta: / (root)  → Save"
echo "============================================"
echo ""
echo "Depois, atualiza o siteUrl em assets/affiliate-config.js:"
echo "   siteUrl: \"https://$USER.github.io/$REPO\""
echo "e corre: node build.js  (regenera canonical/hreflang/og com o URL certo)"
