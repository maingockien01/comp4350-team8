yarn install
yarn workspace @team8/constants build --incremental false
yarn workspace @team8/types build --incremental false
yarn workspace @team8/utils build --incremental false
concurrently "yarn workspace @team8/frontend build:dev" "yarn workspace @team8/backend start:dev"