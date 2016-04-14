import "MarketPair.sol";
import "Collateral.sol";
import "OptionTrade.sol";

contract OptionTradePut is OptionTrade{


	function OptionTradePut(address marketPairadd, address coladd,address optionb, address optiono, uint amount2, uint strikeP,uint exp){

		marketPair=MarketPair(marketPairadd);
		collateral=Collateral(coladd);
		optionbuyer=optionb;
		optionofferer=optiono;
		amount=amount2;
		strikePrice=strikeP;
		expirationDateInBlocks=exp;
	}


	// if collateral can no longer cover loss
	function marginCall(uint blocknr){
		if(msg.sender!=margincallinitiator)throw;
		if(block.number<blocknr+40)throw;
		if(blocknr!=pricerequestblock)throw;
		var (mPrice,isready)=marketPair.getPriceFromBlock(blocknr);
		if(!isready)throw;
		var (cPrice,isready2)=collateral.getPriceFromBlock(blocknr);
		if(!isready2)throw;
		if((strikePrice*100-mPrice*95)*amount/100>this.balance*cPrice)throw; //ckeck whether margin is still sufficient
		if(strikePrice>mPrice)
		optionbuyer.send((strikePrice-mPrice)*amount/cPrice);
		msg.sender.send( 1003 finney);
		optionofferer.send(this.balance);

	}


	//if option buyer want so use option;
	function useOption(uint blocknr){
		if(msg.sender!= optionbuyer)throw;
		if(block.number<blocknr+40)throw;
		if(blocknr!=pricerequestblock)throw;
		var (mPrice,isready)=marketPair.getPriceFromBlock(blocknr);
		if(!isready)throw;
		var (cPrice,isready2)=collateral.getPriceFromBlock(blocknr);
		if(!isready2)throw;
		if(mPrice>strikePrice)throw;
		optionbuyer.send((strikePrice-mPrice)*amount/cPrice);
		optionofferer.send(this.balance);
	}
}
