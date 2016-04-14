import React from 'react';

let Oracle = React.createClass({
  render: function() {
      var meta = {
        name: this.props.name,
        description: this.props.description
      };

      return (
      <div className="col-md-4 portfolio-item">
	      <a href="#">
		      <img className="img-responsive" src="http://placehold.it/700x400" alt="" />
	      </a>
	      <h3><a href="#">{meta.name}</a></h3>
	      <p>{meta.description}</p>
      </div>
      );
    }
});

module.exports = Oracle;
