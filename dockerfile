FROM node:14.18.0

# Create app directory
WORKDIR ~/serv
ENV PATH ./node_modules/.bin:$PATH

# используйте изменения в package.json, чтобы заставить Docker 
# не использовать кеш, когда мы меняем зависимости nodejs нашего приложения:
ADD package.json /tmp/package*.json
RUN cd /tmp && npm install
# RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
RUN cd /~/serv && cp -a /tmp/node_modules .

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production
# RUN npm install

# Bundle app source
COPY . .
CMD npm build
CMD npm start
