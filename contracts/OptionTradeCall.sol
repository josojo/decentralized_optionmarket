import "MarketPair.sol";
import "Collateral.sol";
import "OptionTrade.sol";

contract OptionTradeCall is OptionTrade{


	function OptionTradeCall(address marketPairadd, address cadd, address optionb, address optiono, uint amount2, uint strikeP,uint exp){

		marketPair=MarketPair(marketPairadd);
		collateral=Collateral(cadd);
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
		var (mprice,isready)=marketPair.getPriceFromBlock(blocknr);
		if(!isready)throw;
		var (cprice,isready2)=collateral.getPriceFromBlock(blocknr);
		if(!isready2)throw;
		if((mprice*105-strikePrice*100)*amount/100>this.balance*cprice)throw; //ckeck whether margin is still sufficient
		if(strikePrice<mprice)
		optionbuyer.send((mprice-strikePrice)*amount/cprice);

		msg.sender.send( 1003 finney);
		optionofferer.send(this.balance);
	}

	//if option buyer want so use option;
	function useOption(uint blocknr){
		if(msg.sender!= optionbuyer)throw;
		if(block.number<blocknr+40)throw;
		if(blocknr!=pricerequestblock)throw;
		var (mprice,isready)=marketPair.getPriceFromBlock(blocknr);
		if(!isready)throw;
		var (cprice,isready2)=collateral.getPriceFromBlock(blocknr);
		if(!isready2)throw;
		if(mprice<strikePrice)throw;
		optionbuyer.send((mprice-strikePrice)*amount/cprice);
		optionofferer.send(this.balance);
	}
}
