var _ = require('lodash');
var Fluxxor = require('fluxxor');
var constants = require('../constants/constants');


var OracleStore = Fluxxor.createStore({

  initialize: function () {
    this.key = null;

    this.bindActions(
      constants.oracle.DO_FOO, this.handleFoo
    );
  },

  getState: function () {
    return {
      ready: this.ready,
      client: this.client,
      peerCount: this.peerCount,
      blockNumber: this.blockNumber,
      blockTime: this.blockTime,
      blockTimestamp: this.blockTimestamp,
      networkLag: this.networkLag,
      ether: this.ether,
      gasPrice: this.gasPrice,
      ethereumStatus: this.ethereumStatus,
      mining: this.mining,
      hashrate: this.hashrate,
      blockChainAge: this.blockChainAge,
      isMonitoring: this.isMonitoring
    };
  },

  handleFoo: function (payload) {
    this.key = 1;
    alert(this.key);
    this.emit(constants.CHANGE_EVENT);
  }
});

module.exports = OracleStore;
