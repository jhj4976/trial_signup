docker build -f ./docker/development/Dockerfile -t nextjs-docker .
docker run -p 3000:3000 nextjs-docker