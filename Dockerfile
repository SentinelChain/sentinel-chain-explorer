FROM node:8-alpine

WORKDIR /sentinel-explorer

RUN apk add --no-cache \
    build-base \
    python \
    git

COPY package.json ./

RUN npm install && npm cache clean --force

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]