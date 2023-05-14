FROM node:18-alpine AS builder

ARG WORKDIR /usr/src/app
WORKDIR ${WOKRDIR}

COPY package.json yarn.lock ./

RUN yarn

COPY src src
COPY tsconfig.json tsconfig.build.json ./

RUN yarn build

FROM builder AS prod

ARG WORKDIR /usr/src/app
WORKDIR ${WOKRDIR}

COPY --from=builder ${WOKRDIR}/dist ./dist
COPY --from=builder ${WOKRDIR}/node_modules ./node_modules
COPY --from=builder ${WOKRDIR}/yarn.lock ./yarn.lock
COPY --from=builder ${WOKRDIR}/package.json ./package.json

EXPOSE ${PORT}
CMD ["yarn", "start:prod"]
