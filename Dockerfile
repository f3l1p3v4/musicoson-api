# Etapa 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Instala netcat para verificação de porta
RUN apk add --no-cache netcat-openbsd

# Copiar arquivos de dependências primeiro
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
FROM node:20-alpine

WORKDIR /app

# Copiar apenas o necessário
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist ./dist

# Usuário não-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3333

CMD ["node", "dist/index.js"]