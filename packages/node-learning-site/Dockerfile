FROM node:lts-alpine

WORKDIR /app
COPY dist/packages/node-learning-site/* .
RUN yarn
RUN yarn add tslib class-transformer
COPY ./packages/node-learning-site/schema.prisma ./prisma/
RUN npx prisma@4.2.1 generate
RUN yarn prisma db push --force-reset --schema prisma/schema.prisma
CMD node main.js
EXPOSE 3030

# RUN yarn prisma generate --schema apps/node-learning-site/schema.prisma
# RUN yarn node-learning-site:build:production
# EXPOSE 3030

# CMD nx run node-learning-site:serve