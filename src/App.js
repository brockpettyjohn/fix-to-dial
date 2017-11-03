import React, { Component } from 'react';
import { routes } from './router.js'

class App extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="all-menus">
        {this.props.children}
      </div>
    );
  }
}


export default App;