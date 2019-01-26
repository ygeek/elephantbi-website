FROM node:8.11.3-alpine

# install nginx
RUN apk --update add nginx

# Yarn Install
COPY package.json /root/webapp/
COPY yarn.lock /root/webapp/
WORKDIR /root/webapp
RUN yarn config set registry 'https://registry.npm.taobao.org' && yarn install

# Copy file
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY container_start.sh /start.sh
COPY . /root/webapp/

# Build Dist
RUN NODE_ENV=production yarn run build && \
    mkdir -p /run/nginx && \
    rm -f /etc/nginx/sites-enabled/* && \
    mkdir -p /usr/share/nginx/logs && \
    touch /usr/share/nginx/logs/error.log && \
    touch /usr/share/nginx/logs/access.log && \
    mkdir -p /usr/share/nginx/html && \
    mkdir -p /usr/share/nginx/html/en && \
    mkdir -p /usr/share/nginx/html/hk && \
    cp -r dist/* /usr/share/nginx/html && \
    cp -r dist/* /usr/share/nginx/html/en && \
    cp -r dist/* /usr/share/nginx/html/hk && \
    cp src/elephantbi.mp4 /usr/share/nginx/html && \
    cp src/elephantbi.mp4 /usr/share/nginx/html/en && \
    cp src/elephantbi.mp4 /usr/share/nginx/html/hk && \
    cp -r root_pc/* /usr/share/nginx/html

EXPOSE 80

# Start Script
CMD /bin/sh /start.sh
