# Publicação na Vercel

Domínio configurado: https://chaveiro-ws-rocha.vercel.app

Execute `node build.cjs` para gerar a pasta dist. O vercel.json configura esse comando e diretório de saída. Publique este projeto no projeto Vercel associado ao domínio informado. Os arquivos de manutenção não entram em dist.

A Vercel utiliza o 404.html do diretório de saída para URLs não encontradas: https://vercel.com/kb/guide/custom-404-page . Não adicione redirecionamento geral para index.html, pois isso esconderia erros 404.

O sitemap.xml inclui a página inicial e privacidade. Obrigado e erro usam noindex e ficam fora do sitemap. Canonicals, imagens sociais e dados do negócio usam o domínio informado. Para mudar de domínio, execute `node configurar-dominio.cjs https://NOVO-DOMINIO` e gere dist novamente.

A página obrigado.html abre na aba original após o clique normal no WhatsApp, que abre em outra aba. Isso indica interesse, não confirma envio de mensagem, atendimento ou venda. Não contabilize esse clique como serviço concluído.

## Conteúdo confirmado pelo proprietário

- Resposta pelo WhatsApp: 10 a 30 minutos. Esse prazo não é uma promessa de chegada.
- Cópia de chave no Taquaral, cópia de chave de carro no Cambuí e troca de fechaduras no Jardim Guanabara. Não foram acrescentadas fotos ou resultados não fornecidos.
- Três avaliações transcritas dos textos enviados, com links para os perfis fornecidos, sem notas ou datas inventadas.

## Após publicar

Confira links, mapa, ligação e WhatsApp no celular. Teste uma URL inexistente e seu status HTTP 404. Verifique a propriedade no Google Search Console e envie https://chaveiro-ws-rocha.vercel.app/sitemap.xml . A publicação e o sitemap não garantem indexação nem posicionamento.

Conferir a política de privacidade com as práticas efetivas de atendimento, retenção e hospedagem. Referência de transparência: https://www.gov.br/anpd/pt-br/acesso-a-informacao/aviso-de-privacidade

Não foi adicionada marcação de estrelas para avaliações do próprio negócio, conforme orientação do Google: https://developers.google.com/search/docs/appearance/structured-data/local-business
