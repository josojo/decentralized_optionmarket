
import "Oracles.sol";
contract OracleInputs{

	//address oracles;  // address of oracles contract;
	//address marketplace;  //address of main marketplace contract
	address oraclePublicKey;
	uint public mistakes; //counts the number of non-regular reportings
	struct Marketfeeds{
			////// all prices stored in Wei; price 1 USD = x wei;
		uint[50] lastPrices;		//prices from last 50 blocks will be stored in here; if requested
		uint[50] lastPricesBlockNr;	//logging for which blocknrs a price update has been set,
	}
	mapping (address=> Marketfeeds) oracleFeeds;  //addres are the
	function OracleInputs(){
		oraclePublicKey=msg.sender;

	}

	function giveInput( address marketAddress, uint price, uint blockNr){
		if(msg.sender!=oraclePublicKey)throw;
		//if(oracleFeed[marketAddress].marketPairaddresss!=marketAddress)throw;
		if(oracleFeeds[marketAddress].lastPricesBlockNr[blockNr%50]>=blockNr){
			mistakes++;
			throw; //price already set
		}
		oracleFeeds[marketAddress].lastPricesBlockNr[blockNr%50]=blockNr;
		oracleFeeds[marketAddress].lastPrices[blockNr%50]=price;
	}

	///* ---------------------------------------------------------------------------------------------
//	Functional description this function is called by the pricefeed contract to get the price input for a block

//	@param blocknr. request the pricefeed during blocknr
	//@returns uint : price in Wei;
	//@returns bool: whether oracle has already given Input
	//*/// -------------------------------------------------------------------------------------------

	function provideInput( uint blockNr, address marketAddress) constant returns (uint,bool)  { //IsOracle(msg.sender)

		if(oracleFeeds[marketAddress].lastPricesBlockNr[blockNr%50]!=blockNr) return (0,false);
		else return (oracleFeeds[marketAddress].lastPrices[blockNr%50],true);

	}

}
