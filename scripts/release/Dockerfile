FROM asia.gcr.io/image-repository-235607/react-base AS base

RUN npm run build
RUN chmod +x ./scripts/release/serve.sh

FROM node:12.13

# set working directory
RUN mkdir -p /usr/src/app/build
WORKDIR /usr/src/app

COPY --from=base /usr/src/app/build build

RUN mkdir -p scripts/release
COPY --from=base /usr/src/app/scripts/release/serve.sh scripts/release

RUN npm install -g serve
