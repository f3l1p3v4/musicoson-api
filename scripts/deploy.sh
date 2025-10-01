#!/bin/bash
set -e

# Diretório do projeto
cd /home/musicoson-api

# 1. Derruba e constrói as imagens
docker compose down || true
docker compose build --no-cache

# 2. Sobe APENAS o banco de dados e aguarda.
# O '-d' sobe o serviço em background.
echo "Garantindo que o banco de dados esteja online..."
docker compose up -d postgres

# 3. Aguarda o PostgreSQL ficar acessível na rede Docker usando netcat.
# Este é o passo crítico. 'musicoson-pg' é o container_name do banco.
until nc -z musicoson-pg 5432; do
  echo "Aguardando o PostgreSQL ficar pronto... (musicoson-pg:5432)"
  sleep 1
done

# 4. Executa as migrações do Prisma no container temporário
echo "Executando migrações do Prisma..."
# O comando 'run' usa a imagem 'musicoson-api' e tem acesso à DATABASE_URL via 'environment'
docker compose run --rm backend npx prisma migrate deploy

# 5. Sobe a aplicação (o backend já tem o 'command' para garantir a conexão)
echo "Subindo o serviço da API..."
docker compose up -d

# Limpa imagens antigas (opcional)
docker image prune -f

echo "Deploy concluído em $(date)" >> /home/musicoson-api/deploy.log