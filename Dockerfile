FROM node:16-alpine as dev

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./

RUN npm install --only=dev


FROM node:16-alpine as build

WORKDIR /app

COPY . .

COPY --from=dev /app/node_modules ./node_modules

RUN npm run build


FROM node:16-alpine as runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs

RUN adduser -S nextjs -u 1001

COPY --from=build /app/public ./public

COPY --from=build --chown=nextjs:nodejs /app/.next ./.next

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/package.json ./package.json

CMD ["node_modules/.bin/next", "start"]