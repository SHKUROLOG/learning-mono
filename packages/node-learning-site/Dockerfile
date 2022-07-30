FROM node:lts-alpine

VOLUME /app
WORKDIR /app
RUN npm i -g nx
RUN yarn
RUN yarn prisma generate --schema apps/node-learning-site/schema.prisma

CMD nx run node-learning-site:serve