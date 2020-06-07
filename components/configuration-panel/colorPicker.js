'use strict'

import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

function lightOrDark(color) {
  var r, g, b, hsp;
  
  if (color.match(/^rgb/)) {

      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
      
      r = color[1];
      g = color[2];
      b = color[3];
  } 
  else {
      
      color = +("0x" + color.slice(1).replace( 
      color.length < 5 && /./g, '$&$&'));

      r = color >> 16;
      g = color >> 8 & 255;
      b = color & 255;
  }
  
  hsp = Math.sqrt(
  0.299 * (r * r) +
  0.587 * (g * g) +
  0.114 * (b * b)
  );


  if (hsp>127.5) {
      return "#000"
  } 
  else {
      return "#fff"
  }
}

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    color: this.props.color,
    backgroundContrast: lightOrDark(this.props.color)
  };

  componentDidUpdate(prevProps) {
    if (this.props.color !== prevProps.color) {
      this.setState({ color: this.props.color })
      this.setState({ backgroundContrast: lightOrDark(this.props.color) })
    }
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ backgroundContrast: lightOrDark(color.hex) })
    this.setState({ color: color.hex })
    this.props.handleChangeColor(color.hex, this.props.name)
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '100%',
          height: '22px',
          borderRadius: '2px',
          background: `${this.state.color}`,
        },
        swatch: {
          padding: '5px',
          background: `${this.state.backgroundContrast}`,
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
          width: '23%'
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
        </div> : null }

      </div>
    )
  }
}

export default ColorPicker