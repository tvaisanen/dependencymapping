FROM node:latest
WORKDIR /usr/integration-tests/
COPY ./package*.json ./
COPY wdio.conf.js .

RUN mkdir test
WORKDIR test
COPY test .

RUN npm install

WORKDIR /usr/integration-tests/
CMD ["npm", "run", "test"]
