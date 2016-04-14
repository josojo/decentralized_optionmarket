
import "DAOVoting.sol";

contract DAOFunctions is DAOVoting{

	uint lastDividendCall;	// documents block of last dividend call
	uint dividendPeriodInBlocks=691200;  // all dividendPeriodInBlocks block the dividends are paid out to their sharesholders; 691200 is 4 month
	uint dividendsThisPeriod;  // tracks how many dividends are paid out in this divident period

	address mappingDividendsPayed; //mapping (address=>bool)dividendsPayed;

	//Initialsation
	bool DAOFunctionsSet=false;
	function setDAOFunctions(address owner_){
	if(DAOFunctionsSet)throw;
		owners=owner_;
		lastDividendCall=block.number;
		dividendsThisPeriod=0;
		DAOFunctionsSet=true;
	}

	function getDividends(){
		Mapping m=Mapping(mappingDividendsPayed);
		if(m.activated(msg.sender))throw;
		if(block.number>lastDividendCall+dividendPeriodInBlocks){
			Owner o=Owner(owners);
			dividendsThisPeriod=o.getFunds();
			mappingDividendsPayed=new Mapping();
			lastDividendCall=block.number;
		}
		m=Mapping(mappingDividendsPayed);
		m.setActive(msg.sender);
		uint payout=o.getBalanceOf(msg.sender)*dividendsThisPeriod/o.getAmountOfShares();
		msg.sender.send(payout);
		//dividendsPayed=0x0;
	}



	////trading of Shares against Ether////
	struct sharesBid{
		address owner;
		uint amount;
		uint price;
		uint id;
	}
	sharesBid[] sharesBids;
	uint sharesBidCnt=0;
	//lets start with eth as collateral onlz, but we will add other collateral, hopefully dai from makerdao

	struct sharesAsk{
		address owner;
		uint amountWei;
		uint price;
		uint id;
	}
	 sharesAsk[]  sharesAsks;
	uint sharesAskCnt=1;


	function addBid(uint amount_,uint p){

		Owner o= Owner(owners);
		if(o.getBalanceOf(msg.sender)<amount_)throw;
		o.transfer(msg.sender,this,amount_);
		sharesBids.push(
		sharesBid({
			owner:msg.sender,
			amount:amount_,
			price:p,  // price per share in WEi
			id:sharesBidCnt
		}));
		sharesBidCnt++;
	}


	function cancelBid(uint index){
		if(msg.sender==sharesBids[index].owner){
			Owner o=Owner(owners);
			o.transfer(this,msg.sender,sharesBids[index].amount);
		delete sharesBids[index];}
	}

	function addAsk(uint p){
		sharesAsks.push(
		sharesAsk({
			owner:msg.sender,
			amountWei:msg.value,
			price:p,
			id:sharesAskCnt
		}));
		sharesAskCnt++;
	}

	function cancelAsk(uint index){
		if(msg.sender==sharesAsks[index].owner){
			sharesBids[index].owner.send(sharesAsks[index].amountWei);
		delete sharesBids[index];}
	}

//	/* ---------------------------------------------------------------------------------------------
//Functional description: takes the bid and  buys shares depending on the amount of wei he is sending
//@param id : list of id's of Bids he would like to take
//@param index : highest index of the bid he would like to take
//	*/// -------------------------------------------------------------------------------------------
	function takeBid(uint index, uint[] id){
		uint leftValue=msg.value;
		for(uint length=id.length-1;length>=0;length--){

		while(sharesBids[index].id!=id[length] && index>0)index--;
		if(sharesBids[index].id!=id[length])throw; // id could not be found
		uint buyamount=sharesBids[index].price*leftValue;
		if(buyamount>sharesBids[index].amount){
			buyamount=sharesBids[index].amount;
			}
		sharesBids[index].owner.send(buyamount/sharesBids[index].price);
			leftValue-=buyamount/sharesBids[index].price;
		Owner o=Owner(owners);
			o.transfer(this,msg.sender,sharesBids[index].amount);
		sharesBids[index].amount-=buyamount;
		if(sharesBids[index].amount==0)
			delete sharesBids[index];
		}

			msg.sender.send(leftValue);
	}
//	Functional description  takes the asks and  sells shares depending on the amount of shares he is sending
//	@param id : list of id's of Asks he would like to take
//@param index : highest index of the ask he would like to take

//prepare for buffered overflow!
//	*/// -------------------------------------------------------------------------------------------
	function takeAsk(uint index, uint[] id, uint amount_){
		Owner o=Owner(owners);
		if(o.getBalanceOf(msg.sender)<amount_)throw;
		uint leftOverShares=amount_;
		for(uint length=id.length-1;length>=0;length--){
		while(sharesBids[index].id!=id[length] && index>0)index--;
		if(sharesBids[index].id!=id[length])throw; // id could not be found

		if(leftOverShares*sharesAsks[index].price>sharesAsks[index].amountWei){
			uint amountOfShares=sharesAsks[index].amountWei/sharesAsks[index].price;
			o.transfer(msg.sender,sharesAsks[index].owner,amountOfShares);
			leftOverShares-=amountOfShares;
			delete sharesAsks[index];
			msg.sender.send(sharesAsks[index].amountWei);
		}
			else{
				amountOfShares=leftOverShares;
				o.transfer(msg.sender,sharesAsks[index].owner,amountOfShares);
				msg.sender.send(amountOfShares*sharesAsks[index].price);
				leftOverShares=0;
				sharesAsks[index].amountWei-=amountOfShares*sharesAsks[index].price;
				break;
			}
		}
	}


	//provide Info//

	function getBidnr() constant returns (uint){
		return sharesBids.length;
	}
	function getBid(uint index) constant returns (address owner, uint amount, uint price, uint id){
		owner=sharesBids[index].owner;
		amount=sharesBids[index].amount;
		price	= sharesBids[index].price;
		id	= sharesBids[index].id;
	}

	function getAsknr() constant returns (uint){
		return sharesAsks.length;
	}
	function getAsk(uint index) constant returns (address owner, uint amount, uint price, uint id){
		owner=sharesAsks[index].owner;
		amount=sharesAsks[index].amountWei;
		price	= sharesAsks[index].price;
		id	= sharesAsks[index].id;
	}

}
