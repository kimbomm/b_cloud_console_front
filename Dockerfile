FROM node:18
MAINTAINER ive@freeive.com

WORKDIR /APP
COPY . /APP

RUN npm install yarn
RUN yarn global add @quasar/cli
RUN yarn
RUN yarn build:spa

EXPOSE 8088

CMD ["quasar","serve","./dist/spa","-p8088"]

