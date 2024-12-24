# Base stage for local development
FROM node:22-alpine AS local

# Argument for environment variable
ARG NODE_ENV=local
ENV NODE_ENV=${NODE_ENV}

# Set working directory
WORKDIR /usr/src/app

# Copy only package files for dependency installation
COPY package*.json ./

# Clean npm cache and install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

#################### DEVELOPMENT IMAGE ##############################
FROM node:22-alpine AS develop

# Argument for environment variable
ARG NODE_ENV=dev
ENV NODE_ENV=${NODE_ENV}

# Set working directory
WORKDIR /usr/src/app

# Copy only package files for dependency installation
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy application files
COPY . .

# Copy built application from local stage
COPY --from=local /usr/src/app/dist ./dist

# Install PM2 globally
RUN npm install -g pm2

# Start the application with PM2
CMD ["pm2-runtime", "start", "pm2.json", "--env", "dev"]

#################### PRODUCTION IMAGE ##############################
FROM node:22-alpine AS production

# Argument for environment variable
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set working directory
WORKDIR /usr/src/app

# Copy only package files for dependency installation
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy application files
COPY . .

# Copy built application from local stage
COPY --from=local /usr/src/app/dist ./dist

# Install PM2 globally
RUN npm install -g pm2

# Start the application with PM2
CMD ["pm2-runtime", "start", "pm2.json", "--env", "production"]
