FROM node:12.7 as builder

WORKDIR /var/www/

COPY client/package.json .

RUN yarn install

COPY client/ .

RUN yarn run build

FROM nginx:1.17

EXPOSE 3000

COPY infra/prod/docker/client/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /var/www/build /usr/share/nginx/html