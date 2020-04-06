FROM kehuo/centos8_conda_npm_nginx:v1

WORKDIR /data/project
# https://registry.npm.taobao.org
# https://registry.npmjs.org
ADD ./package.json ./
# 运行 npm install 会报错, 暂时就先服务器上 npm install , 然后 ADD ./ ./ 的方式, 直接把 node_modules 文件夹复制到docker 镜像中.
RUN npm config set registry https://registry.npm.taobao.org && npm install --update-binary && npm cache clean -f && npm -g install gulp@3.9.1  && npm install
COPY ./resource/nginx.conf /etc/nginx/
COPY ./resource/default.conf /etc/nginx/conf.d/

ADD ./ ./
RUN npm run build && \
    mkdir -p /etc/nginx/data/run/ && mkdir -p /usr/share/nginx/data/project && \
    mv dist/* /usr/share/nginx/data/project && \
    rm -rf /data/project
    
WORKDIR /usr/share/nginx/data/project


# 复制 ssl 证书文件到 docker容器中.
COPY ./ssl_files/kevinhuo_cool.pem /etc/nginx/cert/kevinhuo_cool.pem
COPY ./ssl_files/kevinhuo_cool.key /etc/nginx/cert/kevinhuo_cool.key

# 再做收尾工作
RUN mkdir -p /data/config; \
    mkdir -p /data/logs; \
    rm -rf /var/log/nginx; \
    mv ./js/apiUrl.js /data/config/; \
    ln -s /data/config/apiUrl.js ./js/apiUrl.js; \
    ln -s /data/logs /var/log/nginx; 
    
RUN rm -rf /data/project

# 最后手动启动前端和nginx:
# 1 先 docker run:
# docker run -it -d -p 80:80 -p 443:443 --name web_front web_front:v1
# 2 在进入:
# docker exec -it web_front /bin/bash

# 3 启动 nginx, 不需要 npm run start, 因为docker里是已经打包好的 dist 文件.
# /usr/sbin/nginx

# 4 退出 docker 即可
# exit