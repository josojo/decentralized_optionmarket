import "MarketPair.sol";
import "Collateral.sol";
 //only used for inheritance;

contract OptionTrade{
	MarketPair marketPair;
	Collateral collateral;  /// later on we might need list of collaterals; or we are just trading with dai
	uint strikePrice;
	uint expirationDateInBlocks;
	address optionbuyer;
	address optionofferer;
	uint pricerequestblock;
	address margincallinitiator;
	uint amount;

	// if expiration date is passed
	function overdue(){
		if(block.number+50>expirationDateInBlocks){  //fifty blocks needed for pricesettelment;
			optionofferer.send(this.balance);
		}
	}

	///////////////////////////////////making margin call, can be initiated by anyone
	// loads price
	function loadPrieceForMarginCall(){
		if(msg.value< 1 ether)throw;
		if(block.number<pricerequestblock+60)throw;
		collateral.newPriceRequest(block.number);
		marketPair. newPriceRequest(block.number);
		pricerequestblock=block.number;
		margincallinitiator=msg.sender;
	}



	//////////////////////////////////////////using the option;
	// loads price of marketPair for usepotion;//needs to be called before useoption
	function loadPrice(){
		if(block.number<pricerequestblock+60)throw;
		collateral.newPriceRequest(block.number);
		marketPair.newPriceRequest(block.number);
		pricerequestblock=block.number;
	}

}
