# 3GM General Contracting Inc.

Demo de uma página em inglês americano, com Next.js App Router, TypeScript, Tailwind CSS, Framer Motion e fontes locais carregadas por next/font.

## Rodar localmente

```sh
npm ci
npm run dev
```

Abra http://localhost:3000. Para simular produção, rode npm run build e npm start.

## Deploy na Vercel

1. Envie o projeto e o lockfile a um repositório Git e importe esse repositório na Vercel.
2. Selecione Next.js como framework. Use a pasta que contém package.json como raiz e mantenha o comando padrão npm run build.
3. Se usar domínio próprio, defina SITE_URL com a URL HTTPS canônica e refaça o deploy para atualizar os metadados das imagens compartilhadas.

O formulário confirma o envio na tela. O ponto de integração está no handler submit em app/interactive.tsx. Para Formspree, use o endpoint do formulário. Para Resend, chame uma rota de servidor do Next.js e mantenha a chave da API em uma variável privada na Vercel. Exiba a confirmação após uma resposta de sucesso.

## Mídias e fontes

| Arquivo | Origem e uso |
| --- | --- |
| public/media/3gm-logo.jpg | [Foto de perfil da 3GM no Facebook](https://www.facebook.com/photo/?fbid=122098021275547588), 1024 × 1024. |
| public/media/favicon.png | Derivado da foto de perfil original da 3GM, 64 × 64. |
| public/media/spa-liberty-village-01.jpg | [Foto do spa no Facebook](https://www.facebook.com/photo/?fbid=122109576573547588), 1536 × 1536. |
| public/media/spa-liberty-village-01.webp | Conversão da foto acima para a galeria.
| public/media/spa-liberty-village-02.webp | [Montagem de obra em andamento](https://www.facebook.com/photo/?fbid=122109576567547588), reduzida de 4096 × 4096 para 1600 × 1600. |
| public/media/spa-liberty-village-03.webp | [Sala do spa com parede de pedra](https://www.facebook.com/photo/?fbid=122109576561547588), usada no hero, na galeria e no Open Graph. |
| public/media/spa-liberty-village-04.webp | [Sala do spa com ripas e luz indireta](https://www.facebook.com/photo/?fbid=122109576555547588), usada na galeria. | |

A [página pública da 3GM](https://www.facebook.com/profile.php?id=61596427650988) confirma os serviços, setores, experiência, e-mail e as descrições dos posts de Oakville. A legenda do spa segue a redação do briefing. As fontes Archivo e Manrope são distribuídas sob as licenças incluídas em public/fonts.

## Pendências do cliente

- Demais fotos originais do spa e fotos dos projetos de Oakville, com links ou legendas para confirmar a identificação. Adicione as versões WebP a public/media e cadastre o caminho e texto alternativo em app/work.json.
- Vídeo original do spa, se disponível. Coloque a versão sem som em public/media/spa-liberty-village-hero.mp4 antes do build. O topo usa a foto como poster e fallback.
- Telefone comercial e endereço físico, caso a empresa queira publicá-los. O contato disponível no site é o e-mail confirmado no Facebook.
- Endpoint do Formspree ou conta do Resend e destino dos envios para ativar o formulário.

## Verificação

Com a versão de produção rodando na porta 3000 e o Microsoft Edge instalado, rode npm run verify para testar 1440 px, 768 px e 390 px e atualizar as capturas. Rode npm run audit para atualizar o relatório Lighthouse móvel. Os resultados ficam em screenshots.


## GitHub Pages

O workflow em .github/workflows/pages.yml publica uma exportação estática. Em Settings > Pages, defina Source como GitHub Actions e execute Publish demo to GitHub Pages. Atualizações em main também disparam a publicação.

Para verificar a exportação localmente, defina GITHUB_PAGES_URL com a URL completa do site, incluindo o caminho do repositório, e rode npm run build. Os arquivos são gerados em out.
