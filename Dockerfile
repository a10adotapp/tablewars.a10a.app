FROM node:20-bookworm AS base

#
# deps
#
FROM base AS deps

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

#
# builder
#
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

#
# runner
#
FROM gcr.io/distroless/nodejs20-debian12 AS runner

WORKDIR /app

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nonroot:nonroot /app/.next/standalone ./
COPY --from=builder --chown=nonroot:nonroot /app/.next/static ./.next/static

USER nonroot

ENV NODE_ENV production
ENV HOSTNAME 0.0.0.0
ENV PORT 3000

EXPOSE 3000

CMD ["server.js"]
