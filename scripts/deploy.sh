#!/bin/bash
set -e  # Encerra o script se qualquer comando falhar

# Diretório do projeto
cd /home/musicoson-api

# Atualiza imagens Docker
docker compose down || true  # Ignora erros se o container não existir
docker compose build --no-cache

# Executa as migrações do banco de dados antes de subir a aplicação
echo "Executando migrações do Prisma..."
docker compose run --rm musicoson-api npx prisma migrate deploy

# Inicia os containers em background
docker compose up -d

# Limpa imagens antigas (opcional) - teste
docker image prune -f

echo "Deploy concluído em $(date)" >> /home/musicoson-api/deploy.log