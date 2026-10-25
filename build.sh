#!/usr/bin/env bash
set -e

echo "Installing frontend dependencies..."
cd client
npm ci
npm run build

echo "Installing backend dependencies..."
cd ../server
npm ci

echo "Generating Prisma Client for PostgreSQL..."
npx prisma generate --schema=prisma/schema.postgres.prisma

echo "Building NestJS..."
npm run build

echo "Build completed successfully."