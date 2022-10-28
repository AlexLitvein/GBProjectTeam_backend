FROM node:14 AS builder
ENV APP_NAME=GBProjectTeam_backend
WORKDIR /opt/$APP_NAME
ENV PATH ./node_modules/.bin:$PATH
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:14-alpine AS production
ENV APP_NAME=GBProjectTeam_backend
ENV NODE_ENV=production
WORKDIR /opt/$APP_NAME
# COPY package.json ./
COPY --from=builder /opt/$APP_NAME/node_modules /opt/$APP_NAME/node_modules
COPY --from=builder /opt/$APP_NAME/dist/  /opt/$APP_NAME/

CMD ["node", "./main.js"]
