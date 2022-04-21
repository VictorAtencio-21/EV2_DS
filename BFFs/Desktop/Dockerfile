FROM node:16
ENV NODE_ENV=production
ENV AUTH=http://localhost:2020/auth/
ENV API=http://localhost:2020/cars/
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 2030
CMD ["node", "bffdesk.js"]