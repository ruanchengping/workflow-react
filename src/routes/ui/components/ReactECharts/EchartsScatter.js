
import React from 'react';
import ReactEcharts from './index.js';

const option = {
    title : {
        text: '男性女性身高体重分布',
        x:'center'
        // subtext: '抽样调查来自: Heinz  2003'
    },
    tooltip : {
        trigger: 'axis',
        showDelay : 0,
        // formatter : function (params) {
        //     if (params.value.length > 1) {
        //         return params.seriesName + ' :<br/>'
        //            + params.value[0] + 'cm ' 
        //            + params.value[1] + 'kg ';
        //     }
        //     else {
        //         return params.seriesName + ' :<br/>'
        //            + params.name + ' : '
        //            + params.value + 'kg ';
        //     }
        // },  
        axisPointer:{
            show: true,
            type : 'cross',
            lineStyle: {
                type : 'dashed',
                width : 1
            }
        }
    },
    legend: {
        orient: 'horizontal', // 'vertical'
        x: 'center', // 'center' | 'left' | {number},
        y: 'bottom', // 'center' | 'bottom' | {number}
        data:['女性','男性']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataZoom : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    xAxis : [
        {
            type : 'value',
            scale:true,
            axisLabel : {
                formatter: '{value} cm'
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            scale:true,
            axisLabel : {
                formatter: '{value} kg'
            }
        }
    ],
    series : [
        {
            name:'女性',
            type:'scatter',
            data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],        
            ]
       
        },
        {
            name:'男性',
            type:'scatter',
            data: [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],               
            ]
        }
    ]
};
                    

const EchartsScatter = () => (
    <ReactEcharts
        option={option}
        style={{height: '300px', width: '100%'}}
        className={'react_for_echarts'}
    />
);

export default EchartsScatter;