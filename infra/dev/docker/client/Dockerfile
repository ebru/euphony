FROM node:12.7

WORKDIR /var/www/

COPY client/package.json .

RUN yarn install

COPY client/ .

EXPOSE 3000

CMD ["yarn", "start"]