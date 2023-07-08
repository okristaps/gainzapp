FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 19000 19001

# Specify the command to start your Expo app with hot reloading
CMD ["npm", "start"]