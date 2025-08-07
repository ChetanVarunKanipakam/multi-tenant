# Use an official Node.js image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire source code
COPY . .

# Start the app
CMD ["npm", "start"]

# Expose port React app runs on
EXPOSE 3000
