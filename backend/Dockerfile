FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Verify build output
RUN ls -la dist/

EXPOSE 3001

CMD ["npm", "start"]