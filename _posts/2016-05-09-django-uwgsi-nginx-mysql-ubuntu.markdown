---
layout:     post
title:      "Tutorial: Setting up Django and your web server with uWSGI and nginx"
subtitle:   ""
date:       2016-05-09
author:     "Zhao Chang"
header-img: "img/post-bg-unix-linux.jpg"
tags:
    - Django
    - Python
    - Nginx
---

### 本例测试环境

>操作系统: &nbsp;&nbsp;&nbsp;ubtuntu 12.04 LTS<br />
>Python: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.7<br />
>Django: &nbsp;&nbsp;&nbsp;&nbsp;1.9.4<br />
>数据库:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mysql/14.14<br />
>服务器: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nginx/1.1.19<br />
>uwsgi: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.0.12

Django虽然有自己的server，但是其并发性、安全性都比较差，不能应对大规模的访问。在这里引用其官网的一句话来说明自带server的目的－－It’s intended only for use while developing. (We’re in the business of making Web frameworks, not Web servers.)。所以在生产环境中必须要把Django部署到性能较好的服务器上。Django的部署可以有很多方式，采用Nginx+uwsgi的方式是其中比较常见的一种方式。本篇博客主要讲解此部署方法。

### 基本概念和原理
Web服务器面对外面的世界只能提供来自文件系统内部的文件服务，例如对客户端请求的静态文件(HTML、images、css等)进行响应。但是它不能和Django这样的应用程序进行对话。如果要想进行对话就需要某种协议作为桥梁。WSGI(Web服务网关接口)就可以承担这项任务，它是一种Python的编程协议。然而协议只是一个概念，具体的实现还需要依靠实实在在的软件。uWSGI 是WSGI的一个具体实现，通过它可以让Web服务器和Django进行通话。在这篇博客中我们将搭建uWSGI，以便用它创建了一个Unix socket,通过WSGI协议对web服务器提供响应。最后，把这几个组件连接起来就可以实现Django的部署了。示意图如下：
`Web客户端<---Http--->Web服务端<---socket--->uwsgi<------>Django`
接下来就开始具体实现。


### 安装pip
pip 是一个安装和管理 Python 包的工具 , 是 easy_install 的一个替换品。


```shell
apt-get install python-pip
```


### 安装Django
Django的安装有很多方法，既然我们前面已经安装了pip,那么本例就使用pip安装。

```shell
pip install django==1.9.4 -i http://pypi.douban.com/simple
```
**说明**：由于国内已经把pypi.python.org网站屏蔽了，所以就需要使用其他镜像，本例使用豆瓣的镜像。


### 安装Mysql服务器和客户端

```shell
apt-get install mysql-server mysql-client  libmysqlclient-dev
```


**说明**：如果不安装libmysqlclient-dev的话，接下来安装 mysql-python 可能会报错。


### 安装mysql-python

安装mysql-python 是在使python 拥有操作mysql数据库的接口。


```shell
pip install mysql-python -i http://pypi.douban.com/simple
```

### 安装Nginx

```shell
apt-get install Nginx
```
**说明**：Nginx启动/停止/重启 `/etc/init.d/Nginx start/stop/restart`


### 安装uwsgi

```shell
pip install uwsgi -i http://pypi.douban.com/simple
```

### 测试uwsgi
创建test.py文件，在文件中添加以下代码：

```python
def application(env, start_response):

    start_response('200 OK', [('Content-Type','text/html')])

    return ["Hello World"] # python2

    #return [b"Hello World"] # python3
```

运行`uwsgi --http :8000 --wsgi-file test.py`，然后打开浏览器输入网址`http://localhost:8000`。如果页面显示hello world则测试通过，则说明下面3个环节是畅通的：`the web client <-> uWSGI <-> Python`。然后进入下一步。


### 测试Django项目是否正常

```shell
python manage.py runserver 0.0.0.0:8000
```

### 使用uWSGI连接Django项目

在项目的根目录建立mysite_uwsgi.ini 文件，文件内容如下：


```shell
# myweb_uwsgi.ini file
[uwsgi]

# Django-related settings

socket = 127.0.0.1:8000

# the base directory (full path)
chdir           = /home/chiao/Desktop/djangotest/

# Django s wsgi file
module          = djangotest.wsgi

# process-related settings
# master
master          = true

# maximum number of worker processes
processes       = 4

# ... with appropriate permissions - may be needed
# chmod-socket    = 664
# clear environment on exit
vacuum          = true

#plugin = python

```
使用 `uwsgi --ini mysite_uwsg.ini` 命令可以启动uwsgi服务。

**说明**：如果project能够正常被拉起，说明以下环节是通的：`the web client <-> uWSGI <-> Django`


### 配置Nginx

`vim /etc/Nginx/sites-available/default`编辑该文件，并按照以下代码进行配置：


```shell
server {
	listen   80; ## listen for ipv4; this line is default and implied
	#listen   [::]:80 default ipv6only=on; ## listen for ipv6

	#root /usr/share/Nginx/www;
	#index index.html index.htm;

	# Make site accessible from http://localhost/
	server_name 127.0.0.1;

	location / {
		#include /etc/Nginx/uwsgi_params;
		include uwsgi_params;
		uwsgi_pass 127.0.0.1:8000;
		uwsgi_read_timeout 60;
		# First attempt to serve request as file, then
		# as directory, then fall back to index.html
		#try_files $uri $uri/ /index.html;
		# Uncomment to enable naxsi on this location
		# include /etc/Nginx/naxsi.rules
	}

	location /statics{
		expires 30d;
		autoindex on;
		add_header Cache-Control private;
		alias /home/chiao/Desktop/djangotest/statics/;
	}

```

### 在django 中收集静态文件

```shell
python manage.py collectstatic
```

### 重启Nginx

```shell
/etc/init.d/nginx reload

/etc/init.d/nginx restart
```

### 开启uWSGI

```shell
 uwsgi --ini mysite_uwsg.ini
```
**说明**：如果不开启则会出现502 Bad GateWay


***

以上就是整个部署过程，由于整理仓促，可能存在一些错误，欢迎各位朋友在下方留言板提出问题。
