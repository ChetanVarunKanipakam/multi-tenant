# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port used by webpack-dev-server
EXPOSE 3002

# Start the dev server
CMD ["npm", "start"]
