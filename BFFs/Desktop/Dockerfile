FROM node:16-alpine

ENV AUTH=http://localhost:2020/auth/

ENV API=http://localhost:2020/cars/

WORKDIR /srv

COPY package*.json ./

RUN npm install 

COPY . .

ENV PORT=2030

EXPOSE 2030

CMD ["npm", "start"]