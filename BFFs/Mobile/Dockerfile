FROM node:16-alpine

ENV AUTH=http://localhost:2020/auth/

ENV API=http://localhost:2020/cars/

WORKDIR /srv

COPY package*.json ./

RUN npm install 

COPY . .

ENV PORT=2040

EXPOSE 2040

CMD ["npm", "start"]