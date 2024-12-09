# Build stage
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage
FROM node:20 AS serve
WORKDIR /app
COPY --from=build /app/dist /app
RUN npm install -g serve
EXPOSE 80
CMD ["serve", "-s", ".", "-l", "80"]
