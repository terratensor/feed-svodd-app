up: docker-up
down: docker-down
restart: down up
build:
	docker compose build
docker-up:
	docker compose up -d
docker-down:
	docker compose down --remove-orphans

docker-pull:
	docker compose pull

docker-build:
	docker compose build --pull

dev-docker-build:
	REGISTRY=localhost IMAGE_TAG=main-1 make docker-build

docker-build:
	DOCKER_BUILDKIT=1 docker --log-level=debug build --pull --build-arg BUILDKIT_INLINE_CACHE=1 \
		--target builder \
		--cache-from ${REGISTRY}/feed-app:cache-builderr \
		--tag ${REGISTRY}/feed-app:cache-builder \
		--file ./prod.Dockerfile .

	DOCKER_BUILDKIT=1 docker --log-level=debug build --pull --build-arg BUILDKIT_INLINE_CACHE=1 \
		--cache-from ${REGISTRY}/feed-app:cache-builder \
		--cache-from ${REGISTRY}/feed-app:cache \
		--tag ${REGISTRY}/feed-app:cache \
		--tag ${REGISTRY}/feed-app:${IMAGE_TAG} \
        --file ./prod.Dockerfile .

push-build-cache:
	docker push ${REGISTRY}/feed-app:cache-builder
	docker push ${REGISTRY}/feed-app:cache

push:
	docker push ${REGISTRY}/feed-app:${IMAGE_TAG}

deploy:
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'docker network create --driver=overlay traefik-public || true'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'docker network create --driver=overlay feed-parser-net || true'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'rm -rf feed-app_${BUILD_NUMBER} && mkdir feed-app_${BUILD_NUMBER}'

	envsubst < docker-compose-production.yml > docker-compose-production-env.yml
	scp -o StrictHostKeyChecking=no -P ${PORT} docker-compose-production-env.yml deploy@${HOST}:feed-app_${BUILD_NUMBER}/docker-compose.yml
	rm -f docker-compose-production-env.yml

	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd feed-app_${BUILD_NUMBER} && docker stack deploy --compose-file docker-compose.yml feed-app --with-registry-auth --prune'