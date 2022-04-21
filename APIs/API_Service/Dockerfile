FROM node:16
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 2010
CMD ["node", "apiserv.js"]
