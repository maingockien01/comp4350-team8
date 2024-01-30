FROM node:21.1.0 as base

WORKDIR /usr/src/app

# Install typescript
RUN yarn global add typescript @nestjs/cli

FROM base as dependencies

# Copy packages package.json
COPY packages/constants/package.json ./packages/constants/

# Copy apps package.json
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/

# Copy global package.json and yarn.lock
COPY package*.json ./
COPY yarn.lock ./

# Copy global files
COPY tsconfig.json ./
COPY .eslintrc.js ./
COPY .prettierrc.js ./

RUN yarn install

FROM dependencies as build

COPY apps/backend ./apps/backend
COPY apps/frontend ./apps/frontend

COPY packages/constants ./packages/constants
COPY packages/types ./packages/types
COPY packages/utils ./packages/utils
COPY packages/eslint-config-team8 ./packages/eslint-config-team8

# Build
RUN yarn workspace @team8/constants build

RUN yarn workspace @team8/frontend build

RUN yarn workspace @team8/backend build

CMD ["node", "apps/backend/dist/src/main.js"]

EXPOSE 3000