---
layout:     post
title:      "The Real-time Statistics System of Data Collection"
subtitle:   ""
date:       2016-07-09
author:     "Zhao Chang"
header-img: "img/post-bg-unix-linux.jpg"
tags:
    - statistics
    - system
    - visualization
---
### Development environment

>OS: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mac os X 10.95<br />
>Python: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.7<br />
>Django: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.9.4<br />
>Database:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mysql<br />
>Bootstrap:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.3.0<br />
>Jquery: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.0.0<br />
>Highcharts: &nbsp;&nbsp;&nbsp;&nbsp;5.0.2<br />

### Introduction

In recent project, we need collect academic information from online academic databases. We developed an distributed web crawler. In order to real-time monitor the quantity and the trend of the data collected, I made an webpage to display these informations.
<a href="/img/statistic/index.jpg" target="\_blank" title="Click to see the big picture ">
<img src='/img/statistic/index.jpg'/>
</a>
<center><b>Fig. 1.</b>The Real-time Statistics System of Data Collection</center>
<a href="/img/statistic/index2.jpg" target="\_blank" title="Click to see the big picture ">
<img src='/img/statistic/index2.jpg'/>
</a>

<center><b>Fig. 2.</b>The Real-time Statistics System of Data Collection</center>

### System description

To ensure intuitiveness, comparability and  real time, I adopt the following strategies:

*    each kind of crawling task is placed in one line chart; x-axis represents the quantity of data collected; y-axis represents date;
*    line chart will be popped up when mouse hovers on the appropriate icon;   
*    every hovering will trigger an AJAX request, which ensures the data is the latest.

<a href="/img/statistic/chart.jpg" target="\_blank" title="Click to see the big picture ">
<img src='/img/statistic/chart.jpg'/>
</a>

<center><b>Fig. 3.</b>line chart</center>

### Limitation

As shown in the Fig. 4, when there are too many categories in the line chart, the chart will be very cluttered.
<a href="/img/statistic/more-line.jpg" target="\_blank" title="Click to see the big picture ">
<img src='/img/statistic/more-line.jpg'/>
</a>
<center><b>Fig. 4.</b>Too many categories <sup><a href="#ref1" >[1]</a></sup></center>
There is one solution that we can use **Small Multiples Time Chart**.
<a href="/img/statistic/multiples.jpg" target="\_blank" title="Click to see the big picture ">
<img src='/img/statistic/multiples.jpg'/>
</a>


<center><b>Fig. 5.</b> Small Multiples Time Chart <sup><a href="#ref1" >[1]</a></sup></center>


### References
1.<a id="ref1">[Course Diary #1: Basic Charts](http://fellinlovewithdata.com/course-diary/course-diary-1-basic-charts)</a>
