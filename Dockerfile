FROM node:20

WORKDIR /app

COPY package*.json ./
RUN rm -rf node_modules && npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]
