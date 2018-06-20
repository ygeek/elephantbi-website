FROM ubuntu:xenial

# Install NodeJS
RUN apt-get update && apt-get -y install git build-essential curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs

# Increse node.js memory limit
RUN mv /usr/bin/node /usr/bin/node_origin
ADD ./node_without_memory_limit.sh /usr/bin/node

# Install Nginx
RUN apt-get update
RUN apt-get -y install nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install yarn

# Build dist
ADD . /root/webapp
WORKDIR /root/webapp
RUN yarn install
RUN NODE_ENV=production yarn run build

# Copy dist
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -f /etc/nginx/sites-enabled/* && cp -r dist/* /usr/share/nginx/html
COPY public/WW_verify_ko8aIKtaEWNkftlc.txt /usr/share/nginx/html
COPY public/WW_verify_yBicWIaJMdytA5qf.txt /usr/share/nginx/html

EXPOSE 80

# Start Script
ADD container_start.sh /start.sh
CMD /bin/bash /start.sh
