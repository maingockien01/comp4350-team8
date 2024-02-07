yarn install
yarn workspace @team8/constants build
concurrently "yarn workspace @team8/frontend build:dev" "yarn workspace @team8/backend start:dev"