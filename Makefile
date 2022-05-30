run-ci: lint test build

run-prod:	## Run APP in prod mode
	@npm run seeding 
	@npm run start:prod

run-dev: make-migrations ## Run APP in dev mode
	@npm run seeding 
	@npm run start:dev

run-debug: make-migrations ## Run APP in debug mode
	@npm run seeding
	@npm run start:debug

build: ## Build APP
	@npm run build

run-migrations: ## Run migrations APP
	@npx mikro-orm migration:up

undo-migrations: ## Undo APP migrations
	@npx mikro-orm migration:down

deps: ## Install the APP dependencies
	@npm i

create-test-db:
	@rm -f testDb.db
	@npm run create-test-db

devDeps: ## Install only dev dependencies
	@npm i -D

lint: devDeps ## Run lint
	@npm run lint

tests: create-test-db ## Run tests
	@npm run test
	
help: ## Display available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

