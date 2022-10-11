FROM node

# Create app directory
WORKDIR ~/serv
ENV PATH ./node_modules/.bin:$PATH

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install

# Bundle app source
COPY . .
CMD npm build
CMD npm start
#CMD node /~/serv/dist/main.js
