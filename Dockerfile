# Use an official Node.js runtime as the base image
FROM node:20-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

ARG DISCORD_TOKEN
ENV DISCORD_TOKEN=$DISCORD_TOKEN

ARG SERVER_ID
ENV SERVER_ID=$SERVER_ID

ARG CHANNEL_ID
ENV CHANNEL_ID=$CHANNEL_ID

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Install dependencies
RUN pnpm install

# Bundle app source
COPY --chown=node:node . .

# Build the Next.js app
RUN pnpm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

USER node

# Expose the port that Next.js runs on
EXPOSE 3000

# Run the Next.js app
CMD [ "node", "dist/main.js" ]