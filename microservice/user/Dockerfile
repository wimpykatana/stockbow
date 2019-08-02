FROM node:latest

# Bundle app source
COPY . /app/user

# Create app directory
WORKDIR /app/user

# install nodemon for dev
RUN npm install nodemon -g

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent

# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 1337

# CMD npm start
# CMD npm run dev