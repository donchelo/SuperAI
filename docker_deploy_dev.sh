# !bin/bash

# This script is used to deploy the application with docker

# Start the server
echo "Removing existing containers..."
docker compose -f docker-compose.yml --env-file dev.env down --volumes --rmi all -t 0

echo "Starting the containers..."
docker compose -f docker-compose.yml --env-file dev.env up -d --build --force-recreate

echo "Application deployed successfully!"
