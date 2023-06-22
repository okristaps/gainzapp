# Use the official Node.js 14 image as the base
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire frontend code to the working directory
COPY . .

# Expose the default Expo ports
EXPOSE 19000 19001

# Specify the command to start your Expo app with hot reloading
CMD ["npm", "start"]