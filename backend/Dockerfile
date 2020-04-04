FROM kehuo/contos8_conda:nginx as builder

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

CMD ["/project/start.sh"]