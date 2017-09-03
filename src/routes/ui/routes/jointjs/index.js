import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import joint from 'jointjs';
export default class JointjsDemo extends React.Component {
  render() {
   
    return <div ref="placeholder"></div>;
  }
  componentDidMount(){
        const graph = new joint.dia.Graph; 
    const paper = new joint.dia.Paper({  
            el: ReactDOM.findDOMNode(this.refs.placeholder),
            width: 1300, 
            height: 800,  
            model: graph, 
            gridSize: 1 
          });  
    const rect = new joint.shapes.basic.Rect({ 
                position: { 
                    x: 100, 
                    y: 30 
                }, 
                size: { 
                    width: 200, 
                    height: 30 
                }, 
                attrs: { 
                    //attr SVG attr      prop- custom data 
                    rect: { 
                        fill: 'rgb(238,244,247)', 
                        'stroke': 'rgb(47,152,223)', 
                        'stroke-width': '1px' 
                            //svg上色 fill stroke 
                    }, 
                    text: { 
                        text: '长方形', 
                        fill: 'black' 
                    } 
                } 
            }); 
    const ellipse = new joint.shapes.basic.Rect({ 
                position: { 
                    x: 100, 
                    y: 30 
                }, 
                size: { 
                    width: 200, 
                    height: 30 
                }, 
                attrs: { 
                    //attr SVG attr      prop- custom data 
                    rect: { 
                        fill: 'rgb(238,244,247)', 
                        'stroke': 'rgb(47,152,223)', 
                        'stroke-width': '1px', 
                        'rx': '10px', 
                        'ry': '30px' 
                            //svg上色 fill stroke 
                    }, 
                    text: { 
                        text: '椭圆', 
                        fill: 'pink' 
                    } 
                } 
            });  
    ellipse.translate(300); //两块的距离 
    const link = new joint.dia.Link({ 
              source: { 
                  id: rect.id 
              }, 
              target: { 
                  id: ellipse.id 
              } 
          }); 
    graph.addCells([rect, ellipse, link]);
  }
}
