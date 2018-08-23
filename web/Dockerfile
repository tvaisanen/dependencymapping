FROM alpine
RUN apk add vim
FROM node:latest
WORKDIR /usr/webapp/src
VOLUME ["/usr/webapp/src"]
COPY ./package*.json ./
COPY . .
# if run with compose use docker-entrypoint.sh
# to install node_modules
RUN npm install
COPY docker-entrypoint.sh .
EXPOSE 3000
CMD ["npm", "start"] 
