FROM node:18-alpine

# Install typescript
RUN yarn global add typescript @nestjs/cli

WORKDIR /app

ADD . .

# Build
RUN yarn install

RUN yarn workspace @team8/constants build --incremental false
RUN yarn workspace @team8/types build --incremental false
RUN yarn workspace @team8/utils build --incremental false

RUN yarn workspace @team8/frontend build

RUN yarn workspace @team8/backend build

CMD ["yarn", "workspace", "@team8/backend", "start:prod"]

EXPOSE 3000