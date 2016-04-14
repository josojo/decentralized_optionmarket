import _ from 'lodash';
var constants = require('../constants/constants');
var ConfigActions = function() {

  this.initializeState = function() {
	 //do...
  };

 this.initializeData = function () {
    // Trigger loading addresses, which loads markets, which loads trades
    console.log("test2");
    this.dispatch(constants.LOAD_MARKETS);


 };

};

module.exports = ConfigActions;
