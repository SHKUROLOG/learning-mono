FROM node:lts-alpine as build
WORKDIR /app
COPY . .
ARG VITE_SERVER_URL
RUN echo "VITE_SERVER_URL=$VITE_SERVER_URL" >> .env
RUN yarn
RUN yarn nx build frontend


FROM nginx:alpine
COPY --from=build app/dist/packages/frontend /usr/share/nginx/html
COPY --from=build app/.env /app