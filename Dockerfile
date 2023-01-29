FROM node:16.10.0-alpine3.13 AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start:prod"]
