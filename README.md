# Ingenico2DBarcode — Frontend

Aplicação Angular para consulta e gerenciamento de produtos do Ingenico Barcode.

## Aplicação publicada

- [Abrir a aplicação](https://ingenico-barcode.vercel.app)
- [Abrir diretamente o leitor de QR Code](https://ingenico-barcode.vercel.app/leitor-qrcode)
- API: `https://ingenico-barcode-api.onrender.com`

## Como funciona

- **Leitor de QR Code:** tela pública de consulta, acessível diretamente pela rota `/leitor-qrcode`. Foi pensada para permanecer aberta em um dispositivo ou totem de supermercado; não há necessidade de navegar pela tela de login para usá-la.
- **Área administrativa:** a tela de login é destinada aos usuários autorizados a operar o catálogo. Após entrar, o operador acessa a área de produtos para consultar e cadastrar informações como marca, lote, validade, categorias, tags e imagens.

As credenciais da conta inicial são configuradas no backend. Por segurança, não publique senhas ou tokens neste README; solicite credenciais de demonstração ao responsável pelo projeto.

> **Nota de segurança:** o frontend restringe algumas telas com autenticação, mas isso não substitui a autorização no servidor. No estado atual do backend, as rotas do controller de produtos não exigem JWT. Não considere as operações de escrita protegidas até que a autorização esteja habilitada e validada na API.

## Configuração da URL da API

A URL base do backend fica na propriedade `apiUrl`:

- Produção/build publicado: `src/environments/environment.ts`
- Desenvolvimento: `src/environments/environment.development.ts`

Para apontar o frontend para outro backend, altere o `apiUrl` no environment correspondente. Para o deploy de produção, use, por exemplo:

```ts
export const environment = {
  production: true,
  apiUrl: 'https://ingenico-barcode-api.onrender.com'
};
```

O `environment.development.ts` substitui o arquivo de produção quando a aplicação é executada em configuração de desenvolvimento. Depois de alterar a URL, reinicie o servidor local ou gere um novo build/deploy do frontend.

## Executar localmente

Requer Node.js e npm instalados. Instale dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm start
```

Abra `http://localhost:4200/`. O servidor recarrega a aplicação quando os arquivos são alterados.

## Build e testes

```bash
npm run build
npm test
```

## Deploy

O frontend é publicado no Vercel. Pushes para a branch de produção configurada no projeto iniciam um novo deploy. A API precisa permitir a origem do site em sua configuração CORS. Endereços de Preview do Vercel são origens diferentes do domínio de produção e precisam ser adicionados separadamente no backend se forem usados para teste.

Não armazene senhas, tokens, chaves JWT ou outras credenciais no frontend: qualquer valor incluído em um bundle público pode ser inspecionado no navegador.
