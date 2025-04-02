# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and yarn files
COPY package.json .
COPY .yarnrc.yml* .
COPY yarn.lock* .
COPY .yarn ./.yarn

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM nginx:stable-alpine AS production

# Copy build output from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
