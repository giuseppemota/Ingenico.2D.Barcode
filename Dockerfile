# ==========================================
# Estágio 1: Build da aplicação Angular
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de definição de dependências
COPY package*.json ./

# Instala todas as dependências (incluindo devDependencies necessárias para o build)
RUN npm ci

# Copia todo o código-fonte da aplicação
COPY . .

# Realiza o build de produção (Browser + SSR / Prerender)
RUN npm run build

# ==========================================
# Estágio 2: Execução com Node.js (SSR)
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

# Copia os arquivos de dependência e instala apenas pacotes de produção
COPY package*.json ./
RUN npm ci --omit=dev

# Copia os artefatos compilados do estágio anterior
COPY --from=builder /app/dist/ingenico.2-d.barcode ./dist/ingenico.2-d.barcode

# Expõe a porta do servidor SSR
EXPOSE 4000

# Inicia o servidor Node Express gerado pelo Angular SSR
CMD ["node", "dist/ingenico.2-d.barcode/server/server.mjs"]
