import React from 'react';

let Volatile = React.createClass({
  render: function() {
    return (
      <div>
        <h1>{this.props.title}</h1>
      </div>
    );
  }
});

module.exports = Volatile;
