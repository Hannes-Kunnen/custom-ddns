ARG NODE_VERSION=18.20.4
FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn workspace ddns-container-executor build

FROM node:${NODE_VERSION}-alpine AS production

ENV NODE_ENV="production"
ENV CONFIG_FILE="/config.yaml"
ENV PORT=5100
ENV HOST=0.0.0.0

WORKDIR /app

COPY --from=build /app/src/typescript/executors/container/dist/server.cjs ./dist/server.cjs

EXPOSE ${PORT}/tcp

CMD ["node", "dist/server.cjs"]


