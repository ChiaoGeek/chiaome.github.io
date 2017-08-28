---
layout:     post
title:      "Tutorial: Using Django's Multiple Database Support"
subtitle:   ""
date:       2016-04-06
author:     "Zhao Chang"
header-img: "img/post-bg-unix-linux.jpg"
tags:
    - Django
    - Python
---

### 本例测试环境

>操作系统: &nbsp;&nbsp;&nbsp;Mac os X 10.95<br />
>Python: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.7<br />
>Django: &nbsp;&nbsp;&nbsp;&nbsp;1.9.4<br />
>数据库:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mysql

最近这几天一直在做可视化相关的项目，把我们科研组的数据采集平台所采集的数据结果通过WEB平台展示出来。正常来说这点任务应该不算什么，在开发的过程中也应该不会遇到什么坑。毕竟做WEB已经3年了，虽然没做过太大的项目但是小的WEB平台也做过20个左右了。以往开发都是用php作为服务器端脚本语言，从没有改变过。但是这段时间由于在学python爬虫，所以就想用python来开发。然后就选择了比较有名的Django作为开发框架，先花了一上午时间看了一下Document,便开始写代码了。有之前thinkphp开发的经验，Django开发起来还是比较容易上手，一切都很顺利。但是在接入数据的时候出了些问题。因为有很多采集平台，数据来源不止一个数据库，这就要求在同一个APP上配置和连接多个数据库。通过查看官方文档，找到了以下解决方案。

### 首先定义你的数据库
在Django中使用多个数据库的第一步是告诉Django你将要使用哪些数据库。这一步骤通过修改`settings.py`文件来实现。

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'database1',
        'USER': 'username',
        'PASSWORD': 'password',
        'HOST': '192.168.120.90',
        'PORT':'3306',
    },
    'alias1': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'database2',
        'USER': 'username',
        'PASSWORD': 'password',
        'HOST': '192.168.120.90',
        'PORT':'3306',
    }
}
```
**说明**：数据库可以有很多别名。但是别名`default`有特殊的重要性。若没有其他数据选择的时候Django将会使用`defalut`数据库。所以这个数据库别名必须保留，如果没有实际功能的话可以使参数保留为空。

```python
DATABASES = {
    'default': {},
    'alias1': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'database1',
        'USER': 'username',
        'PASSWORD': 'password',
        'HOST': '192.168.120.90',
        'PORT':'3306',
    },
    'alias2': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'database2',
        'USER': 'username',
        'PASSWORD': 'password',
        'HOST': '192.168.120.90',
        'PORT':'3306',
    }
}
```

### 整合已有数据库并生成模型
`inspectdb`命令一次只生成一个数据库模型，默认的是生成`defalut`数据库，
但是通过`--database`可选项，你可以告诉Django你想要整合哪一个数据库。

```shell
$ ./manage.py inspectdb > models.py
$ ./manage.py migrate --database=alias1 > models.py
```





### 在视图中使用

配置了多个数据库之后，当我们在查询数据库的时候就要指定具体的数据库了。Django提供`using()`方法用来选择数据库。`using()`方法只有一个参数：数据库的别名。
例如：

```python
>>> # 选择默认数据库
>>> Author.objects.all()

>>> # 选择默认数据库
>>> Author.objects.using('default').all()

>>> # 选择别名为alias1的数据库
>>> Author.objects.using('alias1').all()

```
