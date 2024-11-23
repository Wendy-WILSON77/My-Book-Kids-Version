FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN pnpm install

COPY . .

EXPOSE 5173
CMD ["pnpm", "start"]