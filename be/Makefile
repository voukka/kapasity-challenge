.PHONY: build-development
build-development: ## Build the development docker image.
	docker compose -f docker/development/compose.yaml build

.PHONY: start-development
start-development: ## Start the development docker container.
	docker compose -f docker/development/compose.yaml up -d

.PHONY: start-dev-db
start-dev-db: ## Only start the development db container.
	docker compose -f docker/development/compose.yaml up -d db db_admin_ui

.PHONY: migrate-dev-db
migrate-dev-db: ## Apply migrations to dev db
	export $(cat .env.development) && yarn run migrate:up

.PHONY: migrate-dev-db-down
migrate-dev-db-down: ## Apply migrations to dev db
	export $(cat .env.development) && yarn run migrate:down

.PHONY: stop-development
stop-development: ## Stop the development docker container.
	docker compose -f docker/development/compose.yaml down

.PHONY: build-production
build-production: ## Build the production docker image.
	docker compose -f docker/production/compose.yaml build

.PHONY: start-production
start-production: ## Start the production docker container.
	docker compose -f docker/production/compose.yaml up -d

.PHONY: stop-production
stop-production: ## Stop the production docker container.
	docker compose -f docker/production/compose.yaml down
