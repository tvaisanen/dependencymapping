FROM alpine
FROM node:latest
WORKDIR /usr/webapp/src
VOLUME ["/usr/webapp/src"]
COPY ./package*.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "start"] 
