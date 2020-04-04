FROM kehuo/centos8_conda:nginx as builder

ENV PYTHONIOENCODING utf-8
ENV LANG en_US.UTF-8


WORKDIR /project

ADD ./resource/pip.conf /root/.pip/
ADD ./ ./

RUN source ~/.bashrc \
    && conda activate myenv \
    && pip install --upgrade pip && pip install Cython && pip install path.py \
	&& pip install -r ./requirements.txt

# RUN yum install -y nginx

COPY ./resource/default.conf /etc/nginx/conf.d/default.conf
COPY ./resource/nginx.conf /etc/nginx/nginx.conf
COPY ./ssl_files/kevinhuo_cool.pem /etc/nginx/cert/kevinhuo_cool.pem
COPY ./ssl_files/kevinhuo_cool.key /etc/nginx/cert/kevinhuo_cool.key

CMD ["/project/start.sh"]
