
import React from 'react';
import ReactEcharts from './index.js';

const option = {
    title : {
            text: '柱线组合图',       
            x:'center'
        },
    tooltip : {
        trigger: 'axis'
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    legend: {
        orient: 'horizontal', // 'vertical'
        x: 'center', // 'center' | 'left' | {number},
        y: 'bottom', // 'center' | 'bottom' | {number}
        data:['蒸发量','平均温度']
    },
    xAxis : [
        {
            type : 'category',
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        }
    ],
    yAxis : [
        {
            type : 'value',
            name : '水量',
            axisLabel : {
                formatter: '{value} ml'
            }
        },
        {
            type : 'value',
            name : '温度',
            axisLabel : {
                formatter: '{value} °C'
            }
        }
    ],
    series : [

        {
            name:'蒸发量',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name:'平均温度',
            type:'line',
            yAxisIndex: 1,
            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
    ]
};

const EchartsColumnLine = () => (
    <ReactEcharts
        option={option}
        style={{height: '300px', width: '100%'}}
        className={'react_for_echarts'}
    />
);

export default EchartsColumnLine;