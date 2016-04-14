var _ = require('lodash');
var Fluxxor = require('fluxxor');

var ConfigStore = Fluxxor.createStore({
  initialize: function () {
    this.host = process.env.RPC_HOST;
    this.address = 0;
    this.network = 2; // default to testnet
    this.ethereumClient = null;
    this.btcSwapAddress = 0;
    this.btcSwapClient = null;
    this.storeBlockFee = 10000000000000000; // 0.01 ETH =~ storing 1 block
    this.debug = false;
    this.debugHandler = null;
    this.demoMode = false;
    this.percentLoaded = null;
    this.range = 75; // max 300 blocks / ~ 1 hour
    this.rangeEnd = 0;
    this.si = false;
    this.timeout = 300;
    this.alertCount = null;
  },

  getState: function () {
    return {
      host: this.host,
      address: this.address,
      network: this.network,
      ethereumClient: this.ethereumClient,
      btcSwapAddress: this.btcSwapAddress,
      btcSwapClient: this.btcSwapClient,
      storeBlockFee: this.storeBlockFee,
      debug: this.debug,
      debugHandler: this.debugHandler,
      demoMode: this.demoMode,
      percentLoaded: this.percentLoaded,
      range: this.range,
      rangeEnd: this.rangeEnd,
      si: this.si,
      timeout: this.timeout,
      alertCount: this.alertCount
    };
  },

});

module.exports = ConfigStore;
