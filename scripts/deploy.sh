#!/bin/bash
set -e

# Diretório do projeto
cd /home/musicoson-api

# 1. Derruba e constrói as imagens
docker compose down || true
docker compose build --no-cache

# 2. Sobe APENAS o banco de dados e aguarda.
echo "Garantindo que o banco de dados esteja online..."
# O serviço se chama 'postgres' no docker-compose.yml
docker compose up -d postgres

# 3. Aguarda o PostgreSQL ficar acessível na rede Docker usando netcat.
# O nome do container é 'musicoson-pg' e o nome da network é 'postgres'
until nc -z postgres 5432; do
  echo "Aguardando o PostgreSQL ficar pronto... (postgres:5432)"
  sleep 1
done

# 4. Executa as migrações do Prisma no container temporário
echo "Executando migrações do Prisma..."
# O serviço se chama 'backend' no docker-compose.yml
docker compose run --rm backend npx prisma migrate deploy

# 5. Sobe a aplicação
echo "Subindo o serviço da API..."
docker compose up -d

# Limpa imagens antigas (opcional)
docker image prune -f

echo "Deploy concluído em $(date)" >> /home/musicoson-api/deploy.log