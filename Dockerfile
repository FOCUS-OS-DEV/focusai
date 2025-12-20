FROM node:20-alpine AS base

# Install dependencies for sharp
RUN apk add --no-cache libc6-compat

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* .npmrc* ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy migration files
COPY --from=builder --chown=nextjs:nodejs /app/src/migrations ./src/migrations

# Copy startup script
COPY --chown=nextjs:nodejs start.sh ./start.sh
RUN chmod +x ./start.sh

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["./start.sh"]
