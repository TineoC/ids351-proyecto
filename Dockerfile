FROM node:18-alpine

# Create directory that runs the app on docker
WORKDIR /app

# COPY package.json and package-lock.json files and prisma
COPY ["package.json", "package-lock.json", "./"]
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# Install package.json dependencies
RUN npm install

RUN npm i -g prisma
RUN npm i -g nodemon

RUN prisma generate

# COPY
COPY . .

# Generate prisma client
RUN prisma generate --schema ./prisma/schema.prisma

# Run and expose the server on port 3000
EXPOSE 3000

# A command to start the server
CMD ["npm", "run", "dev"]