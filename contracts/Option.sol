//import "MarketPair";
import "Collateral.sol";
import "OptionTradePut.sol";


contract Option{
	address owner;
	address marketPairadd;
	Collateral collateral;
	uint expirationDateinblocks=30; //3 3*60*60*24*30*3 month as a example
	uint strikePrice;
	bool typeIsPut; // false for calls-, true for puts options
	uint tradingfee; // in wei

	struct optionBid{
		address owner;
		uint collateral_ether;
		uint collateral_dai;
		uint price;
		uint id;
	}
	optionBid[] optionbids;
	uint optionbidcnt=0;
	//lets start with eth as collateral onlz, but we will add other collateral, hopefully dai from makerdao

	struct optionAsk{
		address owner;
		uint collateral_ether;
		uint collateral_dai;
		uint price;
		uint id;
	}
	optionAsk[] optionasks;
	uint optionaskcnt=0;
	//modifier onlyIsOwner(address own) { if (own != owner) throw; _ }



	function endMarket(){
		if(expirationDateinblocks>block.number){
			for(uint i=0;i<optionasks.length;i++){
				//send bids funds back
				optionasks[i].owner.send(optionasks[i].collateral_ether);
			}
			for( i=0;i<optionasks.length;i++){
				//send askss funds back
				optionbids[i].owner.send(optionbids[i].collateral_ether);
			}
			marketPairadd.send(this.balance);
		}
	}

	function addBid(uint p){
		optionbids.push(
		optionBid({
			owner:msg.sender,
			collateral_ether:msg.value,
			collateral_dai:0,
			price:p,
			id:optionbidcnt
		}));
		optionbidcnt++;
	}


	function cancelBid(uint index){
		if(msg.sender==optionbids[index].owner){
			msg.sender.send(optionbids[index].collateral_ether);
		delete optionbids[index];}
	}

	function addAsk(uint p, uint dai){
		optionasks.push(
		optionAsk({
			owner:msg.sender,
			collateral_ether:msg.value,
			collateral_dai:0,
			price:p,
			id:optionaskcnt
		}));
		optionaskcnt++;
	}

	function cancelAsk(uint index){
		if(msg.sender==optionasks[index].owner){
			msg.sender.send(optionasks[index].collateral_ether);
			delete optionasks[index];}
	}


	function destruct(){
		//
	}





	// getting data:
	function getBidnr() constant returns (uint){
		return optionbids.length;
	}
	function getBid(uint index) constant returns (address owner, uint col1, uint col2, uint price, uint amount){
		owner=optionbids[index].owner;
		col1=optionbids[index].collateral_ether;
		col2=optionbids[index].collateral_dai;
		price	= optionbids[index].price;
		amount	= price / col1 * collateral.getLastPrice();
		amount= optionbids[index].collateral_ether;
	}
	function getAsknr() constant returns (uint){
		return optionbids.length;
	}
	function getAsk(uint index) returns (address owner,uint col1, uint col2){
		owner=optionasks[index].owner;
		col1=optionasks[index].collateral_ether;
		col2=optionasks[index].collateral_dai;
	}
	function getExpiration() constant returns (uint){
		return expirationDateinblocks;
	}
	function getStrikePrice() constant returns (uint){
		return strikePrice;
	}

}
