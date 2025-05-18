IMAGE_NAME=easycv-pdf
CONTAINER_NAME=easycv-pdf
PORT=8080

.PHONY: up down build logs

build:
	docker build -t $(IMAGE_NAME) .

up: build
	docker run --rm -d --name $(CONTAINER_NAME) -p $(PORT):$(PORT) $(IMAGE_NAME)

down:
	docker stop $(CONTAINER_NAME) || true

logs:
	docker logs -f $(CONTAINER_NAME)