FROM node:20.11.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY src ./src
COPY prisma ./prisma
RUN npx prisma generate
EXPOSE 8080
CMD ["node", "src/server.js"]
