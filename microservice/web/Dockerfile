FROM node:latest

# Bundle app source
COPY . /app/web

# Create app directory
WORKDIR /app/web


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

RUN npm install
RUN npm run build

COPY --from=builder /app/web/build/ /usr/share/nginx/html

# If you are building your code for production
RUN npm ci --only=production

EXPOSE 5000

CMD npm run deploy