# install && build && purne
FROM node:lts-alpine as install-target
ENV PATH $PATH:/app/node_modules/.bin
WORKDIR /app
COPY src ./src
COPY public ./public
COPY scripts ./scripts
COPY config ./config
COPY .babelrc package.json package-lock.json tsconfig.json ./
RUN npm install
RUN npm run build
RUN npm prune --production


# App
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types

WORKDIR /var/www/app

COPY --from=install-target /app/build .
