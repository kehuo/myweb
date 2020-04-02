https://docs.microsoft.com/en-us/outlook/rest/python-tutorial#using-the-mail-api
https://docs.microsoft.com/en-us/graph/auth-v2-user#3-get-a-token

How to run
==========

Section 1 - Build your Docker image
------------------------------------
#1 Docker Pull centos:7

#2 Docker run -it -d centos:7 /bin/bash

#3 Docker ps

#4 When you run "Docker ps", you will get the running container ID, for example, aaabbb123, use it to run below command:
Docker exec -it aaabbb123 /bin/bash

#5 Run commadn to install wget:
yum install -y wget

#6 Run below to download miniconda3
wget https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/Miniconda3-latest-Linux-x86_64.sh

#7 When finished downloading, run below to install miniconda on the current docker container:
*** (Important!!! When it asked you if you want a conda init, select YES!!!) ***
bash Miniconda3-latest-Linux-x86_64.sh

#8 When finished, run below to check if installation succeed or not:
conda -V

#9 If it returs "Command not found", please select one of the options to fix this issue:
<1> Run "Bash", then run "conda -V" again.
<2> Run "source ~/.bashrc", then run "conda -V" again.

#10 Add some useful Conda mirror source:
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --set show_channel_urls yes

#11 Create your first conda env. For example, if you want to use "myenv" as the name, and you want to use Python 3.7.5:
conda create -y --name myenv python=3.7.5


Section 2 - Install Nginx on Centos 7
-------------------------------------
https://yq.aliyun.com/articles/699966