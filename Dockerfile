FROM node:14

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

ENV PORT=3000

EXPOSE $PORT

CMD ["npx", "serve", "-s", "build"]