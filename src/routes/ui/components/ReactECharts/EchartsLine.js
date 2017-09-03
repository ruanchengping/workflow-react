
import React from 'react';
import ReactEcharts from './index.js';

const option = {
    title: {
        text: '未来一周气温变化',
        x:'center'
        // subtext: '纯属虚构'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        orient: 'horizontal', // 'vertical'
        x: 'center', // 'center' | 'left' | {number},
        y: 'bottom', // 'center' | 'bottom' | {number}
        data:['最高气温']
    },
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} °C'
        }
    },
    series: [
        {
            name:'最高气温',
            type:'line',
            data:[11, 9, 16, 15, 12, 13, 10],
        }
    ]
};


const EchartsLine = () => (
    <ReactEcharts
        option={option}
        style={{height: '300px', width: '100%'}}
        className={'react_for_echarts'}
    />
);

export default EchartsLine;