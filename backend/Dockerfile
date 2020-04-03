from kehuo/debian_nginx:conda_vim_listen_80

WORKDIR /project

ADD ./ ./

RUN source ~/.bash_profile \
    && conda activate myenv \
    && pip install --upgrade pip && pip install Cython && pip install path.py \
	&& pip install -r ./requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

