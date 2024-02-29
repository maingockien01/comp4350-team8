FROM node:18-alpine

RUN apk add make

# Install dependencies for NestJS
RUN yarn global add typescript @nestjs/cli
RUN yarn global add concurrently

WORKDIR /app

ADD . .

RUN yarn install

EXPOSE 3000