FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the app
COPY . .

# Expose port used by Vite
EXPOSE 7000

# Start the app
CMD ["npm", "run", "dev"]