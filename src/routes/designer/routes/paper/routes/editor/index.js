import React, { Component } from 'react';
import {Draggable } from 'vdap-ui';

class Editor extends Component {
  handleStart=(e)=>{

  }
  handleDrag=(e)=>{

  }
  handleStop=(e)=>{

  }
  render() {
    return (
      <div className="animated fadeIn">
        <Draggable

          handle=".handle"
          defaultPosition={{x: 0, y: 0}}
          position={null}
          grid={[25, 25]}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}>
          <div>
            <div className="handle">Drag from here</div>
            <div>This readme is really dragging on...</div>
          </div>
        </Draggable>

      </div>
    )
  }
}

export default Editor;
