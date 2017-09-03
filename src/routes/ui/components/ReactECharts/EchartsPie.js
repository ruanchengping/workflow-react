
import React from 'react';
import ReactEcharts from './index.js';

const option = {
        title : {
            text: '自愿离职分析',       
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        legend: {
            // top:'8%',
            orient: 'horizontal', // 'vertical'
            x: 'center', // 'center' | 'left' | {number},
            y: 'bottom', // 'center' | 'bottom' | {number}
            data: ['工作压力','薪资福利','职业发展','个人原因','外部环境']
        },
        
        series : [
            {
                name: '自愿离职分析',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:3.1, name:'工作压力'},
                    {value:3.2, name:'薪资福利'},
                    {value:3.3, name:'职业发展'},
                    {value:3.4, name:'个人原因'},
                    {value:1, name:'外部环境'}
                ],
                itemStyle : {
                   normal : {
                         label : {
                           show:true,
                           formatter:"{b}: {c}({d}%)"
                         },
                         labelLine : {
                             show : true
                         }
                     },
                     emphasis : {
                         label : {
                             show : false
                         }
                     }
                }
            }
        ]
    };

const EchartsPie = () => (
    <ReactEcharts
        option={option}
        style={{height: '300px', width: '100%'}}
        className={'react_for_echarts'}
    />
);

export default EchartsPie;