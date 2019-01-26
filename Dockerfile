#
# stage 0: build the application using webpack
#
FROM node:10-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
# copy only what is really needed for webpack
COPY src src
COPY test test
COPY webpack webpack
COPY postcss.config.js .
COPY .babelrc .
# run webpack
RUN npm run build

#
# state 1: nginx as a server over static files
#
FROM nginx:alpine
WORKDIR /app
COPY --from=build-stage /app/out /app
COPY docker.nginx.conf /etc/nginx/conf.d/default.conf
# save commithash
ARG COMMITHASH=undefined
RUN echo "{\"hash\":\"$COMMITHASH\"}" > ./version.json