 $(document).ready(function(){
            $.ajax({
                type: "get",
                url: "data.json",
                dataType: "json",
                success: function (data) {
 						print1('main',data);
                        },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                  }
                 });



        });
function print1(div,data){
	        // 路径配置
        require.config({
            paths: {
                echarts: 'http://echarts.baidu.com/build/dist'
            }
        });

        // 使用
        require(
            [
                'echarts',
                'echarts/chart/map' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById(div));

	            var option = {
					    title : {
					        text: 'The employer\'s distribution',
					        subtext: 'NEDU',
					        x:'center'
					    },
					    tooltip : {
					        trigger: 'item'
					    },
					    legend: {
					        orient: 'vertical',
					        x:'left',
					        data:['省份']
					    },
					    dataRange: {
					        min: 0,
					        max: 200,
					        x: 'left',
					        y: 'bottom',
					        text:['HIGH','LOW'],           // 文本，默认为数值文本
					        calculable : true
					    },
					    toolbox: {
					        show: true,
					        orient : 'vertical',
					        x: 'right',
					        y: 'center',
					        feature : {
					            mark : {show: true},
					            dataView : {show: true, readOnly: false},
					            restore : {show: true},
					            saveAsImage : {show: true}
					        }
					    },
					    roamController: {
					        show: true,
					        x: 'right',
					        mapTypeControl: {
					            'china': true
					        }
					    },
					    series : [
					        {
					            name: '省份',
					            type: 'map',
					            mapType: 'china',
					            roam: false,
					            selectedMode: 'single',
					            itemStyle:{
					                normal:{label:{show:true}},
					                emphasis:{label:{show:true}}
					            },
					            data:[
					                {name: '北京',value: data.北京},
					                {name: '天津',value: data.天津},
					                {name: '上海',value: data.上海},
					                {name: '重庆',value: data.重庆},
					                {name: '河北',value: data.河北},
					                {name: '河南',value: data.河南},
					                {name: '云南',value: data.云南},
					                {name: '辽宁',value: data.辽宁},
					                {name: '黑龙江',value: data.黑龙江},
					                {name: '湖南',value: data.湖南},
					                {name: '安徽',value: data.安徽},
					                {name: '山东',value: data.山东},
					                {name: '新疆',value: data.新疆},
					                {name: '江苏',value: data.江苏},
					                {name: '浙江',value: data.浙江},
					                {name: '江西',value: data.江西},
					                {name: '湖北',value: data.湖北},
					                {name: '广西',value: data.广西},
					                {name: '甘肃',value: data.甘肃},
					                {name: '山西',value: data.山西},
					                {name: '内蒙古',value: data.内蒙古},
					                {name: '陕西',value: data.陕西},
					                {name: '吉林',value: data.吉林},
					                {name: '福建',value: data.福建},
					                {name: '贵州',value: data.贵州},
					                {name: '广东',value: data.广东},
					                {name: '青海',value: data.青海},
					                {name: '西藏',value: data.西藏},
					                {name: '四川',value: data.四川},
					                {name: '宁夏',value: data.宁夏},
					                {name: '海南',value: data.海南},
					                {name: '台湾',value: data.台湾},
					                {name: '香港',value: data.香港},
					                {name: '澳门',value: data.澳门}
					            ]
					        }
					    ]
					};
				           var ecConfig = require('echarts/config');
							myChart.on(ecConfig.EVENT.MAP_SELECTED, function (param){
							    var selected = param.selected;

							});//添加点击事件

                // 为echarts对象加载数据
                myChart.setOption(option);

////////////////
            }
        );
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function jump(name){
	switch (name)
	{
		case '新疆':
		  window.location.href = 'http://www.baidu.com';
		  break;
		case 1:
		  x="Today it's Monday";
		  break;
		case 2:
		  x="Today it's Tuesday";
		  break;
		case 3:
		  x="Today it's Wednesday";
		  break;
		case 4:
		  x="Today it's Thursday";
		  break;
		case 5:
		  x="Today it's Friday";
		  break;
		case 6:
		  x="Today it's Saturday";
		  break;
	}
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
