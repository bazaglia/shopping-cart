FROM node:10.16-alpine
WORKDIR /usr/app

RUN apk --no-cache add \
      bash \
      g++ \
      ca-certificates \
      lz4-dev \
      musl-dev \
      cyrus-sasl-dev \
      openssl-dev \
      make \
      python \
      git

RUN apk add --no-cache --virtual .build-deps gcc zlib-dev libc-dev bsd-compat-headers py-setuptools bash

COPY package.json package-lock.json tsconfig.json ./
RUN npm install

COPY config ./config
COPY src ./src

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start"]