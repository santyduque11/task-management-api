FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY prisma ./prisma

COPY . .

ENV DATABASE_URL="postgresql://postgres:postgres@postgres:5432/task_management?schema=public"

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]