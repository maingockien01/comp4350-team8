default: help
.PHONY: help
help: # Show help for each of the Makefile recipes.
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

.PHONY: packages
packages: # Build the shared packages
	docker-compose exec apps-dev sh -c " \
	yarn workspace @team8/constants build \
	&& yarn workspace @team8/types build \
	&& yarn workspace @team8/utils build \
	"

.PHONY: lint
lint: # Lint all workspaces
	docker-compose exec apps-dev sh -c "./scripts/dev/lint.sh"

.PHONY: bash
bash: # Start a bash session in the apps container
	docker-compose exec apps-dev sh

.PHONY: dev
dev: # Start the apps in development mode
	docker-compose up apps-dev --build -d \
	&& docker-compose logs -f apps-dev
