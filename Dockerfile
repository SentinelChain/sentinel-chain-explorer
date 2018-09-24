FROM node:8-alpine

WORKDIR /sentinel

RUN apk add --no-cache \
    build-base \
    python \
    gettext \
    git

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . ./

RUN mv docker-entrypoint /usr/local/bin/ \
    && chmod +x /usr/local/bin/docker-entrypoint

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint"]