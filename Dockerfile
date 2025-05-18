FROM node:22.12.0-alpine

WORKDIR /app

COPY package.json ./

# Install system dependencies for canvas
RUN apk update && \
    apk add --no-cache \
      build-base \
      g++ \
      cairo-dev \
      pango-dev \
      giflib-dev \
      py-setuptools

# Install pnpm globally
RUN npm install

# Copy the rest of your code
COPY . .

CMD ["node", "index.js"]