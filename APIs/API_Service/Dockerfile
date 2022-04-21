FROM node:16
ENV NODE_ENV=production
ENV MONGO_URI=mongodb+srv://admin:admin@cluster0.gbu7b.mongodb.net/Dist2APIdb?retryWrites=true&w=majority
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 2010
CMD ["node", "apiserv.js"]