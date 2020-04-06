FROM kehuo/centos8_conda_npm_nginx:v1

WORKDIR /data/project
# https://registry.npm.taobao.org
# https://registry.npmjs.org
# ADD ./package.json ./
# RUN npm config set registry https://registry.npm.taobao.org && npm install --update-binary && npm cache clean -f && npm -g install gulp@3.9.1  && npm install
# COPY ./resource/nginx.conf /etc/nginx/
# COPY ./resource/default.conf /etc/nginx/conf.d/

ADD ./ ./
# RUN npm run build && \
#     mkdir -p /etc/nginx/data/run/ && mkdir -p /usr/share/nginx/data/project && \
#     mv dist/* /usr/share/nginx/data/project && \
#     rm -rf /data/project
    
# WORKDIR /usr/share/nginx/data/project

# RUN mkdir -p /data/config; \
#     mkdir -p /data/logs; \
#     rm -rf /var/log/nginx; \
#     mv ./js/apiUrl.js /data/config/; \
#     ln -s /data/config/apiUrl.js ./js/apiUrl.js; \
#     ln -s /data/logs /var/log/nginx; 
    
# RUN rm -rf /data/project