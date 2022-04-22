FROM node:16-alpine

WORKDIR /srv

COPY package*.json ./

RUN npm install 

COPY . .

ENV PORT=2000

EXPOSE 2000

CMD ["npm", "start"]