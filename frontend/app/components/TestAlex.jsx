import React from 'react';
import 


let TestAlex = React.createClass({
        render: function() {
                return (
                        <div>
                               <h1>coinbase balance</h1>
				 <button type="button" onClick={this.onClick}>watch balance</button>
				
				<div id="coinbase"></div>
                        </div>
                );
        }
	onClick: function() {
   	 this.getFlux().actions.toggleTodo(this.props.todo.id);
	  }

});

module.exports = TestAlex;
