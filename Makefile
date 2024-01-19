default: help
.PHONY: help
help: # Show help for each of the Makefile recipes.
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

.PHONY: dev
containers: # Start the development environment
	docker-compose up -d --build

.PHONY: stop
stop: # Stop the development environment
	docker-compose stop

.PHONY: down
down: # Stop and remove the development environment
	docker-compose down