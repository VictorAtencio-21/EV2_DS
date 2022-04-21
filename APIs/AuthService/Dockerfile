FROM node:16
ENV NODE_ENV=production
ENV MONGO_URI=mongodb+srv://admin:admin@cluster0.gbu7b.mongodb.net/Dist2db?retryWrites=true&w=majority
ENV SECRET='sekreto'
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 2000
CMD ["node", "apiauth.js"]