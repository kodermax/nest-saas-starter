FROM node:alpine AS builder
ARG project
WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
COPY .production.env .env
RUN yarn build $project

FROM node:18-alpine
ARG project
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./
COPY --from=builder /app/assets ./assets

EXPOSE 8000
CMD yarn start:$project

