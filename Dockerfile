FROM node:8.11-alpine
MAINTAINER Roi Avidan <roiavidan@gmail.com>

ENV APP_DIR /app
WORKDIR $APP_DIR

ADD package*.json $APP_DIR/
RUN npm install

ADD . $APP_DIR
