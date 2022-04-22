FROM node:16-alpine

WORKDIR /srv

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=2020

ENV API_SERVICE_URL=http://localhost:2010/

ENV AUTH_SERVICE_URL=http://localhost:2000/

EXPOSE 2020

CMD ["npm", "start"]