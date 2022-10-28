FROM node:14-alpine

# Create app directory
WORKDIR /~/serv
ENV PATH ./node_modules/.bin:$PATH

# используйте изменения в package.json, чтобы заставить Docker 
# не использовать кеш, когда мы меняем зависимости nodejs нашего приложения:
COPY package*.json /tmp
RUN cd /tmp && npm install
RUN cd /~/serv && cp -a /tmp/node_modules .

COPY . .
CMD npm start
