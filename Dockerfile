FROM node:8-alpine

WORKDIR /sentinel

COPY package*.json ./

RUN apk add --update --no-cache --virtual .gyp \
        python \
        make \
        g++ \
        git \
    && npm install \
    && npm cache clean --force \
    && apk add --no-cache gettext \
    && apk del .gyp

COPY . ./

RUN mv docker-entrypoint /usr/local/bin/ \
    && chmod +x /usr/local/bin/docker-entrypoint

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint"]