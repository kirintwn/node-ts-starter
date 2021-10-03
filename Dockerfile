FROM node:16.10.0-alpine3.14 AS base

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
RUN set -ex; \
  npm clean-install --only=production; \
  npm cache clean --force; \
  /usr/local/bin/node-prune;

FROM base AS app
RUN apk add --no-cache tini~=0.19
WORKDIR /opt/app
RUN chown -R node:node /opt/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=deps-builder /opt/app/node_modules ./node_modules/
COPY --chown=node:node --from=builder /opt/app/dist ./dist/
ENV NODE_ENV=production
USER node
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/main.js"]
