import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="all-menus">
        {this.props.children}
        {console.log(this.props.children)}
      </div>
    );
  }
}


export default App;