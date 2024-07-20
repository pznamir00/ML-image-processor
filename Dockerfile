FROM node:16

WORKDIR /app
COPY package*.json ./
RUN npm install --no-optional
COPY . .
EXPOSE 3000
