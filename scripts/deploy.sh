#!/bin/bash
set -e

# Diretório do projeto
cd /home/musicoson-api

# 1. Derruba e constrói as imagens
docker compose down || true
docker compose build --no-cache

# 2. Sobe APENAS o banco de dados e AGUARDA o healthcheck.
echo "Garantindo que o banco de dados esteja online e saudável..."
# Esta é a melhor forma de esperar o postgres
docker compose up -d postgres --wait

# 3. Executa as migrações do Prisma DENTRO da rede Docker
echo "Executando migrações do Prisma..."
# O comando 'run' inicia o container 'backend' DENTRO da rede docker-compose
# Não precisamos do nc aqui, pois o --wait já resolveu a espera.
docker compose run --rm backend npx prisma migrate deploy

# 4. Sobe a aplicação
echo "Subindo o serviço da API..."
docker compose up -d backend

# Limpa imagens antigas (opcional)
docker image prune -f

echo "Deploy concluído em $(date)" >> /home/musicoson-api/deploy.log