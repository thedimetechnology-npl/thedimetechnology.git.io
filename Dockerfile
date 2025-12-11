# Use NodeJS for build stage
FROM node:22.21.1-alpine3.21 AS builder

RUN apk add --no-cache \
    supervisor \
    # nginx \
    rm -rf /var/cache/apk/*

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy source code and .env
COPY . .
ARG NODE_ENV
ARG VITE_API_URL
# Add more ARGs as needed for build-time env
RUN echo "NODE_ENV=$NODE_ENV" > .env \
    && echo "VITE_API_URL=$VITE_API_URL" >> .env

# Build static files
RUN npm run build

# Copy custom Nginx configuration
# COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/supervisord.conf /etc/supervisord.conf

#delete the site-enabled 
# RUN rm -rf /etc/nginx/sites-enabled/*


EXPOSE 80

CMD ["/bin/sh", "-c", "rm -f /run/supervisord.sock && /usr/bin/supervisord -n -c /etc/supervisord.conf"]