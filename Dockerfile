FROM node:14.16.0-alpine3.13 AS base


FROM base AS builder

WORKDIR /opt/app
COPY package*.json ./
RUN npm clean-install
COPY tsconfig*.json ./
COPY src ./src/
RUN npm run build


FROM base AS deps-builder

RUN apk add --no-cache curl~=7
SHELL ["/bin/ash", "-eo", "pipefail", "-c"]
RUN curl -sfL https://gobinaries.com/tj/node-prune | PREFIX=/usr/local/bin sh
WORKDIR /opt/app
COPY package*.json ./
RUN npm clean-install --only=production && npm cache clean --force
RUN /usr/local/bin/node-prune


FROM base AS app

RUN apk add --no-cache tini~=0.19
WORKDIR /opt/app
RUN chown -R node:node /opt/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=deps-builder /opt/app/node_modules ./node_modules/
COPY --chown=node:node --from=builder /opt/app/build ./build/
ARG MAX_OLD_SPACE_SIZE=512
ENV NODE_OPTIONS=--max_old_space_size=${MAX_OLD_SPACE_SIZE}
ENV NODE_ENV=production
USER node

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "build/main.js"]
