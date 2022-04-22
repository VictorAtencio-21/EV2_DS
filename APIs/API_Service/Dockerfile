FROM node:16-alpine

WORKDIR /srv

COPY package*.json ./

RUN npm install 

COPY . .

ENV PORT=2010

EXPOSE 2010

CMD ["npm", "start"]
