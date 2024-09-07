# ? -------------------------
# ? Base: Including OS Lib Dependencies and environment variable for build
# ? -------------------------

FROM node:20-alpine AS base

ENV DOCKER_BUILD 1
ENV NEXT_PUBLIC_REALTIME_URL https://rtss.crackncode.org
ENV NEXT_PUBLIC_AWS_URL https://prginth01.sgp1.cdn.digitaloceanspaces.com

ENV GITHUB_ID mockvalue
ENV GITHUB_SECRET mockvalue
ENV GOOGLE_CLIENT_ID mockvalue
ENV GOOGLE_CLIENT_SECRET mockvalue

ENV BUCKET_NAME mockvalue
ENV BUCKET_KEY_ID mockvalue
ENV BUCKET_KEY_SECRET mockvalue
ENV BUCKET_ENDPOINT mockvalue
ENV BUCKET_REGION mockvalue

# ? -------------------------
# ? Builder: Build production Next.js application to .next
# ? -------------------------

FROM base AS builder

RUN apk add python3 make gcc g++

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY src ./src
COPY public ./public
COPY next.config.mjs postcss.config.js tailwind.config.js tsconfig.json ./

COPY prisma ./prisma
RUN pnpm prisma generate

RUN pnpm build

# ? -------------------------
# ? Runner: Final Image for Production
# ? -------------------------

FROM base AS runner

WORKDIR /app

LABEL name "programming.in.th"

USER node
ENV NODE_ENV production

COPY package.json ./

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --chown=node:node --from=builder /app/.next/standalone ./
COPY --chown=node:node --from=builder /app/.next/static ./.next/static
COPY --chown=node:node --from=builder /app/public ./public

ENV PORT 3000
ENV HOST 0.0.0.0

EXPOSE 3000
CMD ["node", "server.js"]
