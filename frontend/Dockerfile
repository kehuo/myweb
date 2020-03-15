# 1 docker build -t myweb_frontend:v1 .
# 2 docker run -d- it -p 8000:3000 myweb_frontend:v1
# 3 Open browser and access to http://localhost:8000/

FROM kehuo/centos8_npm:v1

WORKDIR /data/project

ADD ./ ./
RUN npm install

CMD ["npm", "start"]