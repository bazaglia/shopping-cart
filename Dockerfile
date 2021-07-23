FROM node:14-alpine
WORKDIR /usr/app

COPY src ./src
COPY package.json package-lock.json tsconfig.json ./

RUN npm install && \
    npm run build

EXPOSE 3000

CMD ["npm", "start"]