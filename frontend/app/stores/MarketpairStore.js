var _ = require('lodash');
var Fluxxor = require('fluxxor');
var constants = require('../constants/constants');
var Pudding=require("../utils/Pudding");
var Promise=require("promise");


var MarketpairStore = Fluxxor.createStore({

  initialize: function () {
    this.markets = {};
    this.onLoadMarkets();
    this.bindActions(
      constants.LOAD_MARKETS, this.onLoadMarkets
    );
  },

  onLoadMarkets: function(){
    var CMarketPair = require("../ContractUtils/MarketPair.sol");
                        CMarketPair.load(Pudding);
      var CMarketplace = require("../ContractUtils/Marketplace.sol");
                        CMarketplace.load(Pudding);
                        console.log("startingcrtical");
    function getMarketData(){
         return CMarketplace.at(CMarketplace.address).getMarketpairs()
         .then(function (result) {
            var p=[];
            for(var i=0;i<result.length;i++){
              p[i]=CMarketPair.at(result[i]).getName();
            }
            return Promise.all(p).then(function (result2){
                var m={};
                for( i=0;i<result2.length;i++){
                        var market = {
                          name: result2[i],
                          address: result[i]
                        };
                        m[i]=market;
                      }
                return m;
              });
            });
    }

    getMarketData().bind(this)
      .then(function (m){
          console.log("marketsconstructed");
          console.log(m);
          console.log(m[0].name);
        this.markets=m;
        this.emit("change");
      } );
  },
  getState: function() {
    console.log("StoreGetState");
    return {
      markets: this.markets
    };
  },
});

module.exports = MarketpairStore;
