# check=skip=SecretsUsedInArgOrEnv

FROM node:22-trixie AS builder

ENV DOCKER_BUILD=1
ENV NEXT_PUBLIC_REALTIME_URL=https://rtss.crackncode.org
ENV NEXT_PUBLIC_AWS_URL=https://prginth01.sgp1.cdn.digitaloceanspaces.com

ENV GITHUB_ID=mockvalue
ENV GITHUB_SECRET=mockvalue
ENV GOOGLE_CLIENT_ID=mockvalue
ENV GOOGLE_CLIENT_SECRET=mockvalue

ENV BUCKET_NAME=mockvalue
ENV BUCKET_KEY_ID=mockvalue
ENV BUCKET_KEY_SECRET=mockvalue
ENV BUCKET_ENDPOINT=mockvalue
ENV BUCKET_REGION=mockvalue

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY prisma ./prisma
RUN pnpm prisma generate

COPY next.config.mjs postcss.config.js tailwind.config.js tsconfig.json ./

COPY src ./src
COPY public ./public

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN pnpm build

FROM node:22-trixie AS runner

WORKDIR /app

LABEL name="programming.in.th"

USER node
ENV NODE_ENV=production

COPY package.json ./

COPY --chown=node:node --from=builder /app/.next/standalone ./
COPY --chown=node:node --from=builder /app/.next/static ./.next/static
COPY --chown=node:node --from=builder /app/public ./public

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000
CMD ["node", "server.js"]
