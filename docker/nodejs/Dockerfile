FROM node:18-alpine

WORKDIR /app

# Install dependencies for NestJS
RUN yarn global add typescript @nestjs/cli
RUN yarn global add concurrently

ADD . .

EXPOSE 3000