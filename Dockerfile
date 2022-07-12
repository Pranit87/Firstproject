FROM node:14-alpine
WORKDIR /usr/src/app/vats_ui
COPY package*.json ./
RUN npm install
EXPOSE 4040
CMD ["npm", "start"]