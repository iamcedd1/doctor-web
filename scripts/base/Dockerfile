# base image
FROM node:12.13

# set working directory
RUN mkdir -p  /usr/src/app
WORKDIR /usr/src/app

# install and cache app dependencies
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts -g --silent
COPY . /usr/src/app
COPY /src/semantic-ui/theme.config /usr/src/app/node_modules/semantic-ui-less/