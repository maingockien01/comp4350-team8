FROM cypress/included:8.3.0

WORKDIR /app

ADD . .

RUN yarn install

ENTRYPOINT ["yarn", "workspace", "@team8/cypress", "run", "cypress:run"]

