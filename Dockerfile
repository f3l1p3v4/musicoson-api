# Etapa 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copiar arquivos de dependências primeiro (para cache de layers)
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Gerar cliente Prisma
RUN npx prisma generate

# Build da aplicação
RUN npm run build

# Etapa 2: Produção
FROM node:20-alpine AS production

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar apenas dependências de produção
RUN npm ci --omit=dev

# Gerar cliente Prisma para produção
RUN npx prisma generate

# Copiar arquivos buildados da etapa anterior
COPY --from=build /app/dist ./dist

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Dar permissões corretas
USER nodejs

# Expor porta
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["node", "dist/index.js"]