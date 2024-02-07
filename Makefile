default: help
.PHONY: help
help: # Show help for each of the Makefile recipes.
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

.PHONY: start
start: # Start the apps from dist folder
	yarn workspace @team8/backend start:prod

.PHONY: packages
packages: # Build the shared packages
	yarn workspace @team8/constants build
	yarn workspace @team8/types build
	yarn workspace @team8/utils build

.PHONY: frontend
frontend: # Build frontend
	yarn workspace @team8/frontend build

.PHONY: backend
backend: # Build backend
	yarn workspace @team8/backend build

.PHONY: install
install: # Install packages
	yarn install

.PHONY: lint
lint: # Lint all workspaces
	sh ./scripts/dev/lint.sh