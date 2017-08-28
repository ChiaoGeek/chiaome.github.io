---
layout:     post
title:      "The birth of my blog"
subtitle:   "treat writing as a habit"
date:       2016-03-23
author:     "Zhao Chang"
header-img: "img/post-bg-unix-linux.jpg"
tags:
    - talks

---

### 一般喜欢写博客的人都会经历三个阶段。

>第一阶段：刚刚接触blog，觉得很新鲜，试着选择一个免费空间来写。
>第二个阶段：发现免费空间限制太多，就自己购买域名和空间，搭建独立博客。
>第三阶段：觉得独立博客管理太过于麻烦，最好在保留控制权的情况下让别人来管，自己只负责写文章。

---

### 然而到现在为止我并没有真正的经历前两个阶段。


其实我最初想写东西是在2013年，那时刚刚接触计算机编程，由于当时处于自学阶段，所以需要经常去梳理知识。但是没有想过注册别人的空间去写博客，觉得那样麻烦，干脆就写在了笔记本上。2013年到2014一直在学习web开发，于是便有了想自己动手搭建博客的想法，便每月花上5刀在[Digitalocean](http://www.digitalocean.com){:target="_blank"}上租了一台VPS，同时注册了[zhaochang.org](http://zhaochang.org){:target="_blank"}域名准备建立自己的小站。但是爱追求完美的我，总想做一个功能强大UI漂亮的个人博客，所以一直不满意自己设计。就这样改来改去时间一长加上自己喜欢拖延它就一直没有发布。直到最近写博客的欲望变的强烈起来，于是趁着这想法还没死掉就立刻开始行动。但是实在不想继续完善之前的工作，加之又听师兄说最近几年静态博客比较火。于是便想去体验一下，就花了两天功夫系统的研究了一下，便在[github](https://github.com/chiaogeek){:target="_blank"}上fork了一位大神的项目开始开发自己的博客。整个时间花了三天，虽然这三天很多事情都没有做，但是换来了一块真正属于自己的“网络空间”觉得也是值得的。在开发的过程中其他事情都比较顺利，唯独有一件事特别让我卵疼。在这里我就和大家分享一下这奇葩之事，以免遇到相同的情况。


---

### 详述奇葩之事情

由于我的静态博客是托管在[github](https://github.com/chiaogeek){:target="_blank"}上的，一般来说在[github](https://github.com/chiaogeek){:target="_blank"}上建立一个username.github.io的仓库，然后把网页文件push上去就可以直接通过username.github.io这个域名访问了。但是因为我有自己的域名，所以就想使用自己的域名去访问。正好github也提供这样的接口。只要在网页文件的根目录下建立一个CNAME文件，然后添加自己的域名。并把自己的域名CNAME到username.github.io域名上就可以实现个人域名绑定了。于是我按照github官方的说法去做，把[chiao.me](http://chiao.me){:target="_blank"}这个主域名绑定到了username.github.io上。但是当我访问[chiao.me](http://chiao.me){:target="_blank"}的时候，网页跳转到了别人的博客上。我重新检查了我的每一步操作，确定没有问题。然后我就将我的域名解析做了如下测试：


| 域名           | 解析类型       | 映射地址				|解析状态		 |
| chiao.me      | CNAME 		 | chiaogeek.github.io   |跳转到jessechiao.github.io			|
| chiao.me      | CNAME          | chiaogeek.github.io   |成功跳转			|
| chiao.me      | A     		|  45.33.124.14 		 |成功跳转		|
|www.chiao.me   | CNAME			|	chiaogeek.github.io  |跳转到jessechiao.github.io			|
|blog.chiao.me	| CNAME			|	chiaogeek.github.io	 |成功跳转			|


这个实验可以说明我的域名服务商肯定没有问题，问题应该出在guthub对[chiao.me](http://chiao.me){:target="_blank"} 和 [www.chiao.me](http://chiao.me){:target="_blank"}两个域名的解析上。于是我浏览了[jessechiao.github.io](http://jessechiao.github.io){:target="_blank"}这个仓库发现有一个CNAME文件，然后点进去是[chiao.me](http://chiao.me){:target="_blank"}这个域名。我瞬间就明白了这个域名原来是属于一个叫Jesse Chiao的哥们。但是觉得即使它的CNAME文件中是[chiao.me](http://chiao.me){:target="_blank"}这个域名，也不应该跳到他的博客上，因为我解析的明明是[chiaogeek.github.io](http://chiaogeek.github.io)。所以去了[github](https://github.com/chiaogeek){:target="_blank"}官网求解决方案。找到了如下说明。

### 真相大白

原来一个域名只能对应一个文件，既然知道了原因就可以解决了。由于我没有权限删除别人的文件，所以就主动联系了[github](https://github.com/chiaogeek){:target="_blank"}的帮助中心说明了我的遭遇。我按照他们的要求做了一个TXT记录，证明这个域名现在确实属于我，然后他们帮我移除了。这件奇葩之事便解决了。
