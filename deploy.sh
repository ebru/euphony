docker-compose -f docker-compose-prod.yml up -d --build
docker tag euphony_nginx ebrukaya/euphony_nginx
docker tag euphony_client ebrukaya/euphony_client
docker tag euphony_service ebrukaya/euphony_service
docker push ebrukaya/euphony_nginx
docker push ebrukaya/euphony_service
docker push ebrukaya/euphony_client
eb deploy
docker-compose -f docker-compose-prod.yml down