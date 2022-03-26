FROM node:16.14.0 AS build
COPY package.json ./app/
WORKDIR /app/
RUN npm install
COPY tsconfig.json .
COPY src .
RUN npm run build
FROM nginx 
COPY --from=build /app/ /usr/share/nginx/html