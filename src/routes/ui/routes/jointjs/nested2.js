import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import joint,{g,V} from 'jointjs';
import _ from 'lodash';
import $ from 'jquery'; 
import Backbone from 'backbone';
import './joint.css';

export default class Nested2 extends React.Component {
  render() {
    return (
        <div>
            <div id="easel" style={{width:'100%',border:'1px solid #ccc'}}></div>
            <button id="button">嵌入链接</button><br/>
            <p>使用以上按钮拖动父节点到嵌入连接线的前面和后面</p>     
        </div>
    )

  }
  componentDidMount(){
    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#easel'),
        width: 600,
        height: 200,
        gridSize: 1,
        model: graph
    });
    var parent = new joint.shapes.basic.Rect({
        position: {x: 100,y: 30},
        size: {width: 100,height: 30},
        attrs: {rect: {fill: 'blue'},
                text: {text: '父节点',fill: 'white'}}
    });
    var child = new joint.shapes.basic.Rect({
        position: {x: 70,y: 130},
        size: {width: 70,height: 30},
        attrs: {rect: {fill: 'lightgreen',rx: 5,ry: 5},
                text: {text: '子节点',fill: 'white'}}
    });
    var link = new joint.dia.Link({
        source: {id:parent.id},
        target: {id:child.id}})
    parent.embed(child);
    var child2 = child.clone().translate(100);
    var link2 = new joint.dia.Link({
        source: {id: parent.id},
        target: {id: child2.id},
        vertices: [{x: 210,y: 75}, {x: 190,y: 105}]
    });
    parent.embed(child2);

    $("#button").click(function () {
        switch ($("#button").text().split(' ')[0]) {
            case '嵌入链接':
                parent.embed(link);
                parent.embed(link2);
                $("#button").text('不嵌入链接');
                break;
            case '不嵌入链接':
                parent.unembed(link);
                parent.unembed(link2);
                $("#button").text('嵌入链接');
        };
    });
    graph.addCells([parent, child, child2, link, link2]);
  }
}
