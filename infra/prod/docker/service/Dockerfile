FROM node:12.7

WORKDIR /usr/src/service

COPY service/package.json .

RUN yarn install

COPY service/ .

EXPOSE 5000

CMD ["yarn", "start"]