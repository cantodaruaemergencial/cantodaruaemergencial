# Dockerfile

# base image
FROM node:alpine
ARG NEXT_PUBLIC_STRAPI_API_URL

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# install dependencies
RUN npm install

# start app
RUN npm run build
EXPOSE 3000
CMD npm run start