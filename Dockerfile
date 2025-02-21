ARG IMAGE_NAME=node:22.13.0-alpine
FROM ${IMAGE_NAME} as base
WORKDIR /app
ENV NODE_ENV production

FROM base as dependencies
ADD package.json package-lock.json ./
ADD .husky/install.mjs ./.husky/install.mjs
RUN npm install --include=dev

FROM base as production-dependencies
COPY --from=dependencies /app/node_modules /app/node_modules
ADD package.json package-lock.json ./
RUN npm prune

FROM base as build
COPY --from=dependencies /app/node_modules /app/node_modules
ADD . .
RUN npm run build

FROM base
COPY --from=production-dependencies /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/package.json /app/package.json
ENV HOST 0.0.0.0
ENV POST 3000
ENV TZ UTC
EXPOSE 3000
ENTRYPOINT ["npm", "start"]