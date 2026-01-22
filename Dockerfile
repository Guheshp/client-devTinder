# Stage 1: Build the React App
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# This creates the 'dist' folder
RUN npm run build 

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy the built files from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html
# Copy our custom nginx config (we will check this next)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]