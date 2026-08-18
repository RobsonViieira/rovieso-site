# Rovieso — Site institucional

Site em Next.js 14, com 3 idiomas (PT-BR, PT-PT, ES) e chatbot com IA
conectado ao backend FastAPI já existente no seu EC2.

## 1. Rodar localmente (antes de subir)

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000` — já redireciona pra `/pt-BR` automaticamente.
Troca pra `/pt-PT` ou `/es` na URL pra testar os outros idiomas.

## 2. Backend (EC2) — 2 passos

1. Abre o arquivo `backend-endpoints.py` deste projeto — ele tem os
   dois endpoints novos (`/chat` e `/contato`) prontos pra colar no
   seu `main.py` do FastAPI que já roda no EC2.
2. Cola o conteúdo do `rovieso-ia-system-prompt.md` (que já geramos)
   dentro da variável `SYSTEM_PROMPT`.
3. No EC2, garante que a variável de ambiente `ANTHROPIC_API_KEY`
   está configurada.
4. Reinicia o processo (PM2): `pm2 restart nome-do-processo`

## 3. Subir pro GitHub

```bash
git init
git add .
git commit -m "Site inicial da Rovieso"
git remote add origin https://github.com/RobsonViieira/rovieso-site.git
git push -u origin main
```

## 4. Deploy na Vercel

1. Entra em vercel.com, conecta sua conta GitHub
2. "Add New Project" → seleciona o repositório `rovieso-site`
3. Framework Preset: Next.js (detecta sozinho)
4. Em **Environment Variables**, adiciona:
   - `NEXT_PUBLIC_API_URL` → `https://api.rovieso.com.br` (sem barra no final)
   - `NEXT_PUBLIC_GA_ID` → seu ID do Google Analytics (formato `G-XXXXXXXXXX`).
     Pega em analytics.google.com → Admin → Fluxos de dados → cria um fluxo
     para `rovieso.com.br` → copia o "ID de métrica".
     Se não configurar essa variável, o site funciona normalmente, só não
     coleta estatística.
5. Deploy — a Vercel builda e publica automaticamente

## 5. Domínio próprio

Depois de registrar `rovieso.com.br` no registro.br:
1. No projeto da Vercel → Settings → Domains → adiciona `rovieso.com.br`
2. A Vercel mostra os registros DNS (geralmente um CNAME ou A record)
3. Adiciona esses registros no painel do registro.br
4. Propaga em algumas horas, HTTPS é automático

## Estrutura do projeto

```
app/[locale]/       → páginas por idioma (roteamento automático)
components/         → Hero, Services, Cases, About, Contact, ChatWidget...
messages/            → textos em pt-BR.json, pt-PT.json, es.json
i18n/                → configuração de idiomas
backend-endpoints.py → código pra colar no FastAPI do EC2
```

## Editando textos

Todo o texto do site vem dos arquivos em `messages/`. Pra mudar
qualquer frase, edita o `.json` do idioma correspondente — não
precisa mexer em componente nenhum.

## Editando o WhatsApp de contato

No arquivo `components/Contact.tsx`, troca `55SEUNUMERO` pelo seu
número real (com DDI e DDD, só números).
