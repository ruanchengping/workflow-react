import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import joint,{g,V} from 'jointjs';
import _ from 'lodash';
import $ from 'jquery'; 
import Backbone from 'backbone';
import './joint.css';

export default class RouteOrth extends React.Component {
  render() {
   
    return <div id="paper" style={{width:'100%',border:'1px solid #ccc'}}></div>;
  }
  componentDidMount(){
    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#paper'),
        width: 800,
        height: 800,
        gridSize: 10,
        model: graph
    });

    var r1 = new joint.shapes.basic.Rect({
        position: { x: 100, y: 200 },
        size: { width: 80, height: 40 },
        attrs: { rect: { fill: 'blue' }}
    });
    var r2 = r1.clone().translate(200, 50);
    var r3 = r1.clone().translate(30, 230).resize(300,50);

    r1.attr('rect/fill', 'yellow').resize(400,300);

    var l1 = new joint.dia.Link({
        source: { id: r2.id },
        target: { id: r1.id },
        router: { name: 'orthogonal' },
        connector: { name: 'rounded' },
        attrs: {
            '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' },
            '.connection': {
                stroke: 'black'
            }
        }
    });

    var l2 = l1.clone().set({
        source: { id: r1.id },
        target: { id: r3.id }
    });

    var l3 = l1.clone().set({
        source: { id: r3.id },
        target: { id: r2.id }
    });

    graph.addCell([r1, r2, r3, l1, l2, l3]);
  }
}

