
import "Collateral.sol";
import "OptionTradePut.sol";
import "Option.sol";

contract OptionPut is Option{
	bool optionPutSet=false;
	function setOptionPut(address marketPairadd2, address coladd,uint expiration,uint strikeP,uint tf){//, uint expriation, uint strikeP, bool type
	if(optionPutSet)throw;
		//if(msg.value< 100000 wei)throw;  there must be enough funds for destructing the contract;
		marketPairadd=marketPairadd2;
		collateral=Collateral(coladd);
		expirationDateinblocks=expiration;
		strikePrice=strikeP;
		tradingfee=tf;
		optionPutSet=true;
	}

	////////////////////////////////////////////////////////////////////actual trading
	address[] trades;
	uint tradesnr=0;
	function matchBidAsk(uint idBid, uint indbid, uint idAsk, uint amount){
		//actally not needed
	}

	function takeBid(uint id, uint ind, uint amount){
		uint pcollateral=collateral.getLastPrice();
		while(optionbids[ind].id!=id && ind>0)ind--;
		if(optionbids[ind].id!=id)throw; // id could not be found

		if(msg.value< amount*optionbids[ind].price/pcollateral+tradingfee)throw;

			uint insuranceamount=optionbids[ind].collateral_ether/pcollateral*100/33/strikePrice;
			uint optioncosts;
			uint usedcollateral;
			uint costsfortrade;

			address collateraladd=collateral.getAddress();
			if(amount>insuranceamount){
				//function optionTrade(address marketPairadd, address coladd,address optionb, address optiono, uint amount2, uint strikeP,uint exp){
				trades[tradesnr]=new OptionTradePut(marketPairadd,collateraladd,msg.sender,optionbids[ind].owner,insuranceamount,strikePrice,expirationDateinblocks);
				optioncosts=insuranceamount*optionbids[ind].price*pcollateral;
				trades[tradesnr].send(optioncosts+optionbids[ind].collateral_ether);
				msg.sender.send(msg.value-tradingfee-optioncosts);
				delete optionbids[ind];
			}
			else{
				trades[tradesnr]=new OptionTradePut(marketPairadd,collateraladd,msg.sender,optionbids[ind].owner,amount,strikePrice,expirationDateinblocks);				trades[tradesnr].send(1 ether);

				 usedcollateral=amount*strikePrice*33/100*pcollateral;
				costsfortrade=amount*optionbids[ind].price*pcollateral;
				trades[tradesnr].send(costsfortrade+usedcollateral);
				msg.sender.send(msg.value-tradingfee-costsfortrade);
				optionbids[ind].collateral_ether-=usedcollateral;
			}
			tradesnr++;

	}

	function takeAsk(uint id, uint ind){
		uint pcollateral=collateral.getLastPrice();
		uint collateral_ether=msg.value-tradingfee;
		while(optionasks[ind].id!=id && ind>0)ind--;
		if(optionasks[ind].id!=id)throw; // id could not be found
		if(msg.value<tradingfee)throw;
		uint amount=optionasks[ind].price*collateral_ether/pcollateral;
		uint insuranceamount=collateral_ether*pcollateral*100/33/strikePrice;

			uint costsfortrade;
			uint usedcollateral;
			address collateraladd=collateral.getAddress();
			address bidder=optionasks[ind].owner;
			if(amount>insuranceamount){
				//function optionTrade(address marketPairadd, address coladd,address optionb, address optiono, uint amount2, uint strikeP,uint exp){
				trades[tradesnr]=new OptionTradePut(marketPairadd,collateraladd,bidder,msg.sender,insuranceamount,strikePrice,expirationDateinblocks);
				costsfortrade=insuranceamount*optionasks[ind].price*pcollateral;
				trades[tradesnr].send(costsfortrade+collateral_ether);
				//msg.sender.send(msg.value-tradingfee-collateral_ether);  msg.value-tradingfee-collateral_ether==0
				delete optionasks[ind];
			}
			else{
				trades[tradesnr]=new OptionTradePut(marketPairadd,collateraladd,optionasks[ind].owner,msg.sender,amount,strikePrice,expirationDateinblocks);
				//trades[tradesnr].send(1 ether);

				usedcollateral=amount*strikePrice*33/100/pcollateral;
				 costsfortrade=amount*optionbids[ind].price/pcollateral;
				trades[tradesnr].send(costsfortrade+usedcollateral);
				msg.sender.send(msg.value-tradingfee-costsfortrade);
				optionasks[ind].collateral_ether=optionasks[ind].collateral_ether-usedcollateral;
				}

			tradesnr++;
	}

}
