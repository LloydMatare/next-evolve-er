#!/bin/bash
set -e

echo "=== Fixing PostgreSQL auth for evolve_er ==="

# 1. Change ident -> scram-sha-256 in pg_hba.conf
echo "[1/3] Updating pg_hba.conf..."
sed -i 's/ident/scram-sha-256/g' /var/lib/pgsql/data/pg_hba.conf

# 2. Reload PostgreSQL config
echo "[2/3] Reloading PostgreSQL..."
su - postgres -c "/usr/bin/pg_ctl -D /var/lib/pgsql/data reload"

# 3. Create role + database if missing
echo "[3/3] Ensuring evolve role and database exist..."
su - postgres -c "psql -c \"SELECT 1 FROM pg_roles WHERE rolname='evolve'\" | grep -q 1 || psql -c \"CREATE ROLE evolve WITH LOGIN PASSWORD 'evolve123';\"" 
su - postgres -c "psql -c \"SELECT 1 FROM pg_database WHERE datname='evolve_er'\" | grep -q 1 || psql -c \"CREATE DATABASE evolve_er OWNER evolve;\""

echo "=== Done! Test with: PGPASSWORD=evolve123 psql -U evolve -h localhost -d evolve_er -c 'SELECT 1' ==="
