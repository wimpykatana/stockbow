FROM node:latest

# Bundle app source
COPY . /app/web

# Create app directory
WORKDIR /app/web


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN if [ "$NODE_ENV" = "development" ]; \
	then npm install;  \
	else npm install --only=production; \

CMD if [ "$NODE_ENV" = "development" ]; \
	then npm start;  \
	else npm run build; \

CMD if [ "$NODE_ENV" = "production" ]; \
  then npm run deploy; \
# comment it if in dev mode
#RUN npm run build

# If you are building your code for production
#RUN npm ci --only=production

EXPOSE 5000

#CMD npm run deploy
#CMD npm start
