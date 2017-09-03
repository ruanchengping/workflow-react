
import React from 'react';
import ReactEcharts from './index.js';

const option ={
        title : {
            text: '人力资源预警',
            x:'center'
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false},
                saveAsImage : {show: true}
            }
        },        
        tooltip : {
            formatter: "{b} : {c}%"
        },       
        series: [
            {
                name: '',
                type: 'gauge',
                detail: {formatter:'{value}%'},
                data: [{value: 7.28, name: '离职率'}]
            }
        ]
    };

const EchartsGauge = () => (
    <ReactEcharts
        option={option}
        style={{height: '300px', width: '100%'}}
        className={'react_for_echarts'}
    />
);

export default EchartsGauge;