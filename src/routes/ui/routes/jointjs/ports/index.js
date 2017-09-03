import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import joint,{g,V} from 'jointjs';
import _ from 'lodash';
import $ from 'jquery'; 
import Backbone from 'backbone';

import '../joint.css';

export default class PortDefault extends React.Component {
  render() {
    return (
    	<div>
    		<div id="paper1" style={{width:'100%',border:'1px solid #ccc'}}></div>
			<div id="paper2" style={{width:'100%',border:'1px solid #ccc'}}></div>
			<div id="paper3" style={{width:'100%',border:'1px solid #ccc'}}></div>
			<div id="paper4" style={{width:'100%',border:'1px solid #ccc'}}></div>
			<div id="paper5" style={{width:'100%',border:'1px solid #ccc'}}></div>
			<div id="paper6" style={{width:'100%',border:'1px solid #ccc'}}></div>
			<div id="paper7" style={{width:'800px',height: '100px',border:'1px solid #ccc'}}></div>
	
		</div>    			
    )
  }
  componentDidMount(){
  	function createPaper(val) {
        var graph = new joint.dia.Graph;

        return new joint.dia.Paper({
            el: $('#'+val),
            width: 800,
            height: 400,
            gridSize: 1,
            perpendicularLinks: false,
            model: graph,
            linkView: joint.dia.LinkView.extend({
                options: _.extend({}, joint.dia.LinkView.prototype.options, {
                    doubleLinkTools: true,
                    linkToolsOffset: 40,
                    doubleLinkToolsOffset: 60
                })
            })
        });
    }

var graph1 = createPaper('paper1').model;

var g1 = new joint.shapes.basic.Rect({
    position: { x: 130, y: 30 },
    size: { width: 100, height: 150 },
    attrs: {
        rect: { stroke: '#31d0c6', 'stroke-width': 2 }
    }
});
graph1.addCell(g1);
g1.addPort({ attrs: { circle: { magnet: true, stroke: '#31d0c6', 'stroke-width': 2, fill: '#ffffff' } } });
g1.addPort({ attrs: { circle: { magnet: true, stroke: '#31d0c6', 'stroke-width': 2, fill: '#ffffff' } } });
g1.addPort({ attrs: { circle: { magnet: true, stroke: '#31d0c6', 'stroke-width': 2, fill: '#ffffff' } } });
new joint.shapes.basic.Circle({
    position: { x: 20, y: 150 },
    id: 'target',
    attrs: {
        circle: { cx: 8, cy: 8, r: 8 },
        text: { text: 'test' }
    }
}).addTo(graph1);

new joint.dia.Link({ source: { id: 'target' }, target: { id: g1.id, port: g1.getPorts()[0].id } }).addTo(graph1);
new joint.dia.Link({ source: { id: 'target' }, target: { id: g1.id, port: g1.getPorts()[1].id } }).addTo(graph1);
new joint.dia.Link({ source: { id: 'target' }, target: { id: g1.id, port: g1.getPorts()[2].id } }).addTo(graph1);

var paper2 = createPaper('paper2');
var g2Rect = new joint.shapes.basic.Rect({
    position: { x: 90, y: 100 },
    size: { width: 300, height: 150 },
    attrs: {
        text: { text: 'left', fill: '#6a6c8a' },
        rect: { stroke: '#31d0c6', 'stroke-width': 2 }
    },
    // portMarkup: '<rect width="20" height="20" fill="black"/>',
    ports: {
        groups: {
            'blacks': {
                attrs: {
                    circle: { fill: '#ffffff', stroke: '#31d0c6', 'stroke-width': 2, r: 12, magnet: true }
                }
            },
            'reds': {
                position: function(ports, elBBox, opt) {
                    return _.map(ports, function(port, index) {
                        var step = -Math.PI / 8;

                        var y = Math.sin(index * step) * 50;

                        return g.point({ x: index * 12, y: y + elBBox.height });
                    });
                },
                label: { position: { name: 'manual', args: { attrs: { '.': { y: 40, 'text-anchor': 'middle' } } } } },

                attrs: {
                    rect: { fill: '#fe854f', width: 11 },
                    text: { fill: '#fe854f' },
                    circle: { fill: '#fe854f', r: 5, magnet: true }
                }
            },
            'greens': {
                attrs: {
                    circle: { fill: 'transparent', stroke: '#31d0c6', 'stroke-width': 3, r: 10, magnet: true },
                    rect: { fill: '#31d0c6' },
                    text: { fill: '#31d0c6' }
                },
                position: 'absolute',

                label: {
                    position: {
                        name: 'manual',
                        args: {
                            y: 20,
                            attrs: {
                                text: { 'text-anchor': 'middle' }
                            }
                        }
                    },
                    markup: '<g><text>absolute</text><text class="layout-value"/></g>'
                }
            }
        }
    }
});

var g2Circle = new joint.shapes.basic.Circle({
    position: { x: 500, y: 50 },
    size: { width: 200, height: 100 },
    ellipse: { rx: 150, ry: 100, cx: 150, cy: 100 },
    attrs: {
        text: { text: 'ellipse', fill: '#6a6c8a' },
        circle: { stroke: '#31d0c6', 'stroke-width': 2 }
    },
    ports: {
        groups: {
            'blacks': {
                position: 'ellipse',
                attrs: {
                    circle: { fill: '#ffffff', stroke: '#31d0c6', 'stroke-width': 2, r: 12, magnet: true }
                }
            }
        }
    }
});

_.times(4, function() {
    g2Rect.addPort({ group: 'blacks' });
});
_.times(24, function() {
    g2Rect.addPort({ group: 'reds' });
});
g2Rect.addPort({ group: 'reds', attrs: { text: { text: 'fn: sin(x)' } } });

g2Rect.addPort({
    group: 'greens',
    attrs: {
        '.layout-value': { text: 'x:80% y:20%' }
    },
    args: {
        x: '80%', y: '20%'
    }
});

_.times(8, function() {
    g2Circle.addPort({ group: 'blacks' });
});

paper2.model.addCell(g2Circle);
paper2.model.addCell(g2Rect);

var portPosition = {
    'basic.Rect': 1,
    'basic.Circle': 1
};

paper2.on('cell:pointerclick', function(cellView, e) {

    if (cellView.model.isLink() || !cellView.model.hasPorts()) {
        return;
    }

    var positions;
    var type = cellView.model.get('type');

    if (type === 'basic.Rect') {
        positions = ['left', 'right', 'top', 'bottom', 'line'];
    }

    if (type === 'basic.Circle') {
        positions = [
            'ellipse',
            'ellipseSpread',
            {
                name: 'ellipseSpread',
                args: {
                    step: 20,
                    startAngle: 90
                },
                toString: function() {
                    return 'ellipseSpread\n step: 20, startAngle: 90';
                }
            },
            {
                name: 'ellipse',
                args: {
                    step: 20,
                    startAngle: 90
                },
                toString: function() {
                    return 'ellipse\n step: 20, startAngle: 90';
                }
            }
        ];
    }

    var pos = positions[(portPosition[type]) % positions.length];

    if (pos !== 'fn') {
        cellView.model.prop('ports/groups/blacks/position', pos);
    }
    cellView.model.prop('attrs/text/text', pos.toString());
    portPosition[type]++;
});

var paper3 = createPaper('paper3');
var g3 = new joint.shapes.basic.Circle({
    position: { x: 80, y: 210 },
    size: { width: 200, height: 100 },
    attrs: {
        text: { text: 'outsideOriented', fill: '#6a6c8a' },
        circle: { stroke: '#31d0c6', 'stroke-width': 2 }
    },
    ports: {
        groups: {
            'a': {
                position: {
                    name: 'ellipseSpread',
                    args: {
                        dr: 0,
                        dx: 0,
                        dy: 0,
                        compensateRotation: true,
                        // step: 20,
                        startAngle: 90
                    }
                },
                label: {
                    position: {
                        name: 'outsideOriented',
                        args: {
                            // offset: 15,
                            // x: 0,
                            // y: 0,
                            attrs: {}
                        }
                    }
                },
                attrs: {
                    circle: { fill: '#ffffff', stroke: '#31d0c6', 'stroke-width': 2, r: 10, magnet: true },
                    text: { fill: '#6a6c8a' }
                }
            }
        }
    }
});


_.times(10, function(index) {
    g3.addPort({ attrs: { text: { text: 'L ' + index } }, group: 'a' });
});

g3.addPort({
    group: 'a',
    attrs: {
        circle: { stroke: '#fe854f', 'stroke-width': 2, magnet: true },
        '.label-rect': { stroke: '#fe854f', fill: '#fe854f', width: 100, height: 20 },
        '.label-text': { x: '0.5em', y: '0.9em' },
        'text': { x: '0.5em', text: 'custom label', y: '0.9em', 'text-anchor': 'start', fill: '#ffffff' }
    },
    label: {
        position: {
            name: 'right',
            args: { angle: 30, offset: 22 }
        },
        markup: '<g><rect class="label-rect"/><text class="label-text"/></g>'
    }
});

var g33 = new joint.shapes.basic.Rect({
    position: { x: 425, y: 60 },
    size: { width: 200, height: 100 },
    attrs: {
        text: { text: 'left', fill: '#6a6c8a' },
        rect: { stroke: '#31d0c6', 'stroke-width': 2 }
    },
    ports: {
        groups: {
            'a': {
                position: {
                    name: 'top',
                    args: { dr: 0, dx: 0, dy: -9 }
                },
                label: { position: { name: 'left', args: { offset: 12 } } },
                attrs: {
                    circle: { fill: '#ffffff', stroke: '#31d0c6', 'stroke-width': 2, r: 10 },
                    text: { fill: '#6a6c8a' }
                }
            }
        }
    }
});

_.times(3, function(index) {
    g33.addPort({ attrs: { text: { text: 'L' + index }, circle: { magnet: true } }, group: 'a' });
});

g33.addPort({
    group: 'a',
    attrs: {
        circle: { stroke: '#fe854f', 'stroke-width': 2, magnet: true },
        '.label-rect': { stroke: '#fe854f', fill: '#fe854f', width: 150, height: 20 },
        '.label-text': { x: '0.5em', y: '0.9em' },
        'text': { x: '0.5em', text: 'custom label - manual', y: '0.9em', 'text-anchor': 'start', fill: '#ffffff' }
    },
    label: {
        position: {
            name: 'left',
            args: {
                angle: 10,
                x: 15,
                y: -10
                // this works as well, overrides .label-rect, .label-text attrs for current port
                // attrs: {
                // text: { y: '0.9em', x: '0.5em', 'text-anchor': 'start' },
                // rect: { fill: 'blue' }
                // }
            }
        },
        markup: '<g><rect class="label-rect"/><text class="label-text"/></g>'
    }
});

paper3.model.addCell(g3);
paper3.model.addCell(g33);

var labelPos = {
    'basic.Rect': 0,
    'basic.Circle': 0
};

paper3.on('cell:pointerclick', function(cellView, e) {

    if (cellView.model.isLink() || !cellView.model.hasPorts()) {
        return;
    }

    var positions;
    var type = cellView.model.get('type');

    if (type === 'basic.Rect') {
        positions = ['left', 'right', 'top', 'bottom', 'outsideOriented', 'outside', 'insideOriented', 'inside'];
    }

    if (type === 'basic.Circle') {
        positions = ['outsideOriented', 'outside', 'radial', 'radialOriented'];

    }

    var pos = positions[(labelPos[type]) % positions.length];

    cellView.model.prop('attrs/text/text', pos);

    cellView.model.prop('ports/groups/a/label/position/name', pos);
    labelPos[type]++;
});
var paper4 = createPaper('paper4');
paper4.options.validateMagnet = function() {
    return false;
};

var g4 = new joint.shapes.basic.Rect({
    markup: '<g class="rotatable"><g class="scalable"><rect class="main"/></g><rect class="inner"/></g>',

    position: { x: 130, y: 30 },
    size: { width: 80, height: 150 },
    attrs: {
        '.main': {
            width: 80, height: 150,
            stroke: '#31d0c6', 'stroke-width': 2
        },
        '.inner': {
            width: 60, height: 130, 'ref-x': 10, 'ref-y': 10,
            stroke: '#31d0c6', 'stroke-width': 2, fill: '#7c68fc'
        }
    }
});

var portIndex = 0;
var addPort = function(z) {
    var color = '#' + Number(0xe00eee + (portIndex++ * 1000)).toString(16);

    g4.addPort({
        z: z,
        id: portIndex + '',
        attrs: {
            circle: {
                r: 20,
                magnet: false,
                fill: color,
                stroke: '#31d0c6',
                'stroke-width': 2
            },
            text: { text: ' z:' + z + '   ', fill: '#6a6c8a' }
        }
    });
};

addPort('auto');
addPort(0);
addPort(1);
addPort(2);
addPort(3);

paper4.model.addCell(g4);

paper4.on('cell:pointerclick cell:contextmenu', function(cellView, e) {

    if (cellView.model.isLink() || !cellView.model.hasPorts()) {
        return;
    }

    var portId = $(e.target).attr('port');

    if (portId) {
        var portIndex = cellView.model.getPortIndex(portId);
        var z = parseInt(cellView.model.prop('ports/items/' + portIndex + '/z'), 10) || 0;


        z = e.type === 'contextmenu' ? Math.max(0, --z) : ++z;
        cellView.model.prop('ports/items/' + portIndex + '/z', z);
        cellView.model.prop('ports/items/' + portIndex + '/attrs/text/text', 'z:' + z + '   ');
    }
});

var paper5 = createPaper('paper5');
var g5 = new joint.shapes.basic.Rect({
    position: { x: 130, y: 100 },
    size: { width: 450, height: 50 },
    ports: {
        groups: {

            'a': {
                position: function(ports, elBBox, opt) {
                    return _.map(ports, function(port, index) {
                        return {
                            x: index * 100,
                            y: -20,
                            angle: index * 50 + 10,
                            attrs: { '.': { x: '0.8em', y: '0.9em' }, /*rect: { x: -10, y: -10 }*/ }
                        };
                    });
                },
                attrs: {
                    rect: {
                        stroke: '#000000',
                        width: 20,
                        height: 20
                    },
                    '.dot': {
                        fill: '#ff0000',
                        r: 3
                    },
                    text: {
                        fill: '#000000'
                    }
                },
                markup: '<g><rect/><circle class="dot"/></g>'
            }
        }
    }
});

_.times(5, function(index) {
    g5.addPort({ group: 'a', id: index + '', attrs: { text: { text: 'L' + (index + 1) } } });
});

paper5.model.addCell(g5);
var labelPos5 = 0;
paper5.on('element:pointerdown', function(cellView, e) {

    if (cellView.model.isLink() || !cellView.model.hasPorts()) {
        return;
    }

    var positions = _.keys(joint.layout.PortLabel);
    var pos = positions[(labelPos5) % positions.length];

    cellView.model.prop('attrs/text/text', pos);

    g5.prop('ports/groups/a/label/position', pos);
    labelPos5++;
});

var paper6 = createPaper('paper6');

var g6 = new joint.shapes.basic.Circle({
    position: { x: 50, y: 50 },
    size: { width: 500, height: 300 },
    attrs: {
        text: { text: 'compensateRotation: true', fill: '#6a6c8a' },
        circle: { stroke: '#31d0c6', 'stroke-width': 2 }
    },
    ports: {
        groups: {
            'a': {
                position: {
                    name: 'ellipseSpread',
                    args: { startAngle: 0, dr: 0, compensateRotation: true }
                },
                label: {
                    position: 'radial'
                },
                attrs: {
                    rect: {
                        stroke: '#31d0c6',
                        'stroke-width': 2,
                        width: 20,
                        height: 20,
                        x: -10,
                        y: -10
                    },
                    '.dot': {
                        fill: '#fe854f',
                        r: 2
                    },
                    text: {
                        fill: '#6a6c8a'
                    }
                },
                markup: '<g><rect/><circle class="dot"/></g>'
            }
        }
    }
});

_.times(36, function(index) {
    g6.addPort({ group: 'a', id: index + '', attrs: { text: { text: index } } });
});

paper6.model.addCell(g6);
paper6.on('cell:pointerclick', function(cellView, e) {

    if (cellView.model.isLink() || !cellView.model.hasPorts()) {
        return;
    }

    var current = cellView.model.prop('ports/groups/a/position/args/compensateRotation');
    cellView.model.prop('attrs/text/text', 'compensateRotation: ' + !current);
    cellView.model.prop('ports/groups/a/position/args/compensateRotation', !current);
});

$('<b/>').text('在矩形区域内单击实现站点旋转切换').appendTo($('#paper7'));
$('<br/>').appendTo($('#paper7'));

$('<button/>').text('-').appendTo($('#paper7')).on('click', function() {
    var size = g6.get('size');
    g6.resize(Math.max(50, size.width - 50), size.height);
});
$('<button/>').text('+').appendTo($('#paper7')).on('click', function() {
    var size = g6.get('size');
    g6.resize(size.width + 50, size.height);
});
$('<b/>').text(' 适应宽度 ').appendTo($('#paper7'));
$('<br/>').appendTo($('#paper7'));

$('<button/>').text('-').appendTo($('#paper7')).on('click', function() {
    var size = g6.get('size');
    g6.resize(size.width, Math.max(50, size.height - 50));
});
$('<button/>').text('+').appendTo($('#paper7')).on('click', function() {
    var size = g6.get('size');
    g6.resize(size.width, size.height + 50);
});
$('<b/>').text(' 适应高度 ').appendTo($('#paper7'));
$('<div/>').html('&nbsp;').appendTo($('#paper7'));


  }

}