FROM node:latest
WORKDIR /usr/src/
COPY package*.json ./
COPY ./src ./src
EXPOSE 3001
RUN npm install
CMD ["npm", "start"]
