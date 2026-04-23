#!/bin/bash
set -e

# Adiciona a linha de autenticação MD5 ao pg_hba.conf
echo "host all all 0.0.0.0/0 md5" >> /var/lib/postgresql/data/pg_hba.conf

# O docker-entrypoint.sh da imagem oficial do Postgres irá lidar com a recarga/reinicialização necessária.