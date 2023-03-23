FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
COPY .production.env .env
RUN yarn build

FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist/apps/zenit ./dist
COPY --from=builder /app/.env ./


EXPOSE 8000
CMD [ "yarn", "start:prod" ]
