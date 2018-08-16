FROM alpine
FROM node:latest
WORKDIR /usr/webapp/src
COPY ./package*.json ./
RUN npm install
VOLUME ["/usr/webapp/src"]
EXPOSE 3000
CMD ["npm", "start"] 
