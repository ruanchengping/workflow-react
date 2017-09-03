
import React from 'react';
import ReactEcharts from './index.js';

const option ={
    title: {
        text: '世界人口总量',
        x:'center'
        // subtext: '数据来自网络'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    toolbox: {
        show : true,
        feature : {
            dataView : {show: true, readOnly: false},
            saveAsImage : {show: true}
        }
    },
    legend: {
        orient: 'horizontal', // 'vertical'
        x: 'center', // 'center' | 'left' | {number},
        y: 'bottom', // 'center' | 'bottom' | {number}
        data: ['2011年']
    },
    
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
    },
    series: [
        {
            name: '2011年',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
        }
    ]
};


const EchartsBar = () => (
    <ReactEcharts
        option={option}
        style={{height: '300px', width: '100%'}}
        className={'react_for_echarts'}
    />
);

export default EchartsBar;