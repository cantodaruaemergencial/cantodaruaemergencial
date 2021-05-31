FROM node:12-slim

WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY . ./
RUN npm install --only=production

RUN npm run build

CMD [ "npm", "start" ]
