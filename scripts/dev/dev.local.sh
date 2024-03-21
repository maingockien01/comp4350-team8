yarn install
yarn workspace @team8/constants build
yarn workspace @team8/types build
yarn workspace @team8/utils build
concurrently "yarn workspace @team8/frontend build:dev" "yarn workspace @team8/backend start:dev"