FROM node:lts-alpine as build
WORKDIR /app
COPY . .
ARG CLIENT_URL
RUN echo "CLIENT_URL=$CLIENT_URL" >> .env 
RUN echo "DATABASE_URL=$DATABASE_URL" >> .env 
RUN yarn
COPY ./packages/backend/prisma/schema.prisma dist/packages/backend
RUN yarn nx build backend
RUN yarn prisma migrate deploy --schema packages/backend/prisma/schema.prisma

FROM node:lts-alpine
WORKDIR /app
COPY --from=build app/dist/packages/backend/* .
RUN yarn
RUN yarn add tslib class-transformer
COPY --from=build app/node_modules/.prisma/client/* node_modules/.prisma/client/
CMD ["node", "main.js"]
