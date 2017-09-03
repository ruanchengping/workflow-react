import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import joint,{_,g,V} from 'jointjs';
// import _ from 'lodash';
import $ from 'jquery'; 
import Backbone from 'backbone';
import '../joint.css';
import './css/routing.css';

export default class Routing extends React.Component {
  render() {
    return (
    	<div>
    		<div>
	            <button className="router-switch" data-connector="normal">Normal /<br/> None</button>
	            <button className="router-switch" data-connector="rounded">Rounded /<br/> None</button>
	            <button className="router-switch" data-connector="smooth">Smooth /<br/> None</button>
	            <button className="router-switch" data-router="orthogonal" data-connector="normal">Normal /<br/> Orthogonal</button>
	            <button className="router-switch" data-router="orthogonal" data-connector="rounded">Rounded /<br/> Orthogonal</button>
	            <button className="router-switch" data-router="manhattan" data-connector="normal">Normal /<br/> Manhattan</button>
	            <button className="router-switch" data-router="manhattan" data-connector="rounded">Rounded /<br/> Manhattan</button>
	            <button className="router-switch" data-router="metro" data-connector="normal">Normal /<br/> Metro</button>
	            <button className="router-switch" data-router="metro" data-connector="rounded">Rounded /<br/> Metro</button>
	        </div>

	        <div id="routing"></div>

    	</div>
    )
  }
  componentDidMount(){
  	var graph = new joint.dia.Graph();

var paper = new joint.dia.Paper({
    el: $('#routing'),
    width: 1000,
    height: 600,
    gridSize: 10,
    model: graph
});


var source = new joint.shapes.basic.Rect({
    position: { x: 50, y: 50 },
    size: { width: 140, height: 70 },
    attrs: {
        rect: {
            fill: {
                type: 'linearGradient',
                stops: [
                    { offset: '0%', color: '#f7a07b' },
                    { offset: '100%', color: '#fe8550' }
                ],
                attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
            },
            stroke: '#ed8661',
            'stroke-width': 2
        },
        text: {
            text: 'Source',
            fill: '#f0f0f0',
            'font-size': 18,
            'font-weight': 'lighter',
            'font-variant': 'small-caps'
        }
    }
});

var target = source.clone().translate(750, 400).attr('text/text', 'Target');

var link = new joint.dia.Link({
    source: { id: source.id },
    target: { id: target.id },
    router: { name: 'manhattan' },
    connector: { name: 'rounded' },
    attrs: {
        '.connection': {
            stroke: '#333333',
            'stroke-width': 3
        },
        '.marker-target': {
            fill: '#333333',
            d: 'M 10 0 L 0 5 L 10 10 z'
        }
    }
});

var obstacle = source.clone().translate(300, 100).attr({
    text: {
        text: 'Obstacle',
        fill: '#eee'
    },
    rect: {
        fill: {
            stops: [{ color: '#b5acf9' }, { color: '#9687fe' }]
        },
        stroke: '#8e89e5',
        'stroke-width': 2
    }
});

var obstacles = [
    obstacle,
    obstacle.clone().translate(200, 100),
    obstacle.clone().translate(-200, 150)
];

graph.addCells(obstacles).addCells([source, target, link]);

link.toBack();

graph.on('change:position', function(cell) {

    // has an obstacle been moved? Then reroute the link.
    // if (_.contains(obstacles, cell)) paper.findViewByModel(link).update();
});

$('.router-switch').on('click', function(evt) {

    var router = $(evt.target).data('router');
    var connector = $(evt.target).data('connector');

    if (router) {
        link.set('router', { name: router });
    } else {
        link.unset('router');
    }

    link.set('connector', { name: connector });
});
  }
}