import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Tabs,Table} from 'vdap-ui';
import joint,{g,V} from 'jointjs';
import _ from 'lodash';
import $ from 'jquery'; 
import Backbone from 'backbone';

class FlowChart extends React.Component{	
  render() {   
    return (	
    	<div id={"flowChart"} style={{margin:'5px 50px 5px 50px',border:'1px solid #ccc'}}></div>
  	)
  }

  componentDidMount(){ 	
  	var graph = new joint.dia.Graph();
	var paper = new joint.dia.Paper({
	    el: $('#flowChart'),
	    width: '80%',
	    height: 200,
	    gridSize: 1,
	    model: graph
	});
	var uml = joint.shapes.uml;
    joint.shapes.devs.MyImageModel = joint.shapes.basic.Rect.extend({
        markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><image/><text class="label"/></g>',
        defaults: _.defaultsDeep({
            type: 'devs.MyImageModel',
            size: { width: 80, height: 80 },
            attrs: {
                rect: {
                    stroke: '#d1d1d1',
                    fill: {
                        type: 'linearGradient',
                        stops: [{ offset: '0%', color: 'white' }, { offset: '50%', color: '#d1d1d1' }],
                        attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
                    }
                },
                '.label': { text: '审批任务', 'ref-y': -20 },
                image: {
                    'xlink:href': require('assets/images/ui/female.png'),
                    width: 30,
                    height: 30,
                    'ref-x': 0,
                    'ref-y': 0,
                    ref: 'rect',
                    'x-alignment': 'left',
                    'y-alignment': 'top'
                }
            }

        }, joint.shapes.devs.Model.prototype.defaults)
    });

    joint.shapes.devs.MyImageModelView = joint.shapes.devs.ModelView;

	var states = {

	    s0: new uml.StartState({
	        position: { x:20  , y: 60 },
	        size: { width: 30, height: 30 },
	        attrs: {
	            'circle': {
	                fill: '#4b4a67',
	                stroke: 'none',
	            },
	            // text: { text: '开始', 'font-size': 28 }
	            
	        }
	    }),

	    s1: new joint.shapes.devs.MyImageModel({
	        position: { x:100  , y: 60 },
	        size: { width: 100, height: 50 },
	        attrs: {
                '.label': { text: '审批任务1', 'ref-y': -20 },
            },
	    }),

	    s2: new joint.shapes.basic.Rhombus({
		    position: { x: 250, y: 60 },
		    size: { width: 30, height: 30 },
		    attrs: { text: { text: '×', 'font-size': 28 } }
		}),

		s3: new joint.shapes.devs.MyImageModel({
	        position: { x:320  , y: 40 },
	        size: { width: 100, height: 50 },
	        attrs: {
                '.label': { text: '审批任务2', 'ref-y': -20 },
            },
	    }),

	    s4: new joint.shapes.devs.MyImageModel({
	        position: { x:320  , y: 130 },
	        size: { width: 100, height: 50 },
	        attrs: {
                '.label': { text: '审批任务3', 'ref-y': -20 },
            },
	    }),

	    se: new uml.EndState({
	        position: { x:500  , y: 60 },
	        size: { width: 30, height: 30 },
	        attrs: {
	            '.outer': {
	                stroke: "#4b4a67",
	                'stroke-width': 2
	            },
	            '.inner': {
	                fill: '#4b4a67'
	            }
	        }
	    })

	};
	_.each(states, function(c) { graph.addCell(c); });

	var linkAttrs =  {
	    'fill': 'none',
	    'stroke-linejoin': 'round',
	    'stroke-width': '2',
	    'stroke': '#4b4a67'
	};

	var transitons = [
	    new uml.Transition({
	        source: { id: states.s0.id },
	        target: { id: states.s1.id },
	        attrs: {'.connection': linkAttrs }
	    }),
	    new uml.Transition({
	        source: { id: states.s1.id },
	        target: { id: states.s2.id },
	        attrs: {'.connection': linkAttrs }
	    }),
	    new uml.Transition({
	        source: { id: states.s2.id },
	        target: { id: states.s3.id },
	        attrs: {'.connection': linkAttrs }
	    }),
	    new uml.Transition({
	        source: { id: states.s2.id },
	        target: { id: states.s4.id },
	        attrs: {'.connection': linkAttrs }
	    }),
	    new uml.Transition({
	        source: { id: states.s3.id },
	        target: { id: states.se.id },
	        attrs: {'.connection': linkAttrs }
	    }),
	    new uml.Transition({
	        source: { id: states.s4.id },
	        target: { id: states.se.id },
	        attrs: {'.connection': linkAttrs }
	    })
	];

	graph.addCells(transitons);

  }
}

export default FlowChart;

