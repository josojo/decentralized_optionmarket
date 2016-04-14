contract Owner {
	address marketplace;  // address of latest marketplace
	address mainOwner;   //mainAdmin which is allowed to initialize this contract
	address daoFunction;  //address of the DAO which maintains the market
	address admin;
	mapping (address => uint) public balanceOf;  // saves the amout of shares held by address
	mapping (address => uint) public lastTransaction; //people with recent transactions are not allowed to vote
	mapping (address => uint) public lastVote; //tracking of voting in last round
	uint amountOfShares=1000000000;


	//Initialsation
	function Owner(){
		mainOwner=msg.sender;
		balanceOf[msg.sender]=amountOfShares;

	}


		bool setOnce=true;
	function settingOnce(address daoFunction_, address marketp, address adminContractAdd){
		if(!setOnce)throw;
		if(msg.sender!=mainOwner)throw;
		marketplace=marketp;
		daoFunction=daoFunction_;
		admin=adminContractAdd;
	}


	function getFunds() constant returns (uint){
		if(msg.sender!=daoFunction)throw;
		uint funds=this.balance;
		daoFunction.send(this.balance);
			return funds;
	}


	function transfer(address from, address to, uint amount){
		if(msg.sender!=daoFunction)throw;
		if(balanceOf[from]<amount)throw;
		if(balanceOf[to]+amount<balanceOf[to])throw;
		balanceOf[to]+=amount;
		balanceOf[from]-=amount;
		lastTransaction[to]=block.number;
	}

	function changeDAOFunctionAddress(address newSharesTrading){
		if(msg.sender!=daoFunction)throw;
		daoFunction=newSharesTrading;
	}
	function changeMarketplace(address newmarketplace){
		if(msg.sender!=marketplace)throw;
		marketplace=newmarketplace;
	}
	function changeMarketAdmin(address adminadd_){
		if(msg.sender!=admin)throw;
		marketplace=adminadd_;
	}


	function getBalanceOf(address add) constant returns (uint){
		return balanceOf[add];
	}

	function getLastTransactionBlock(address add) constant returns (uint){
		return lastTransaction[add];
	}

	function getAmountOfShares() constant returns (uint){
		return amountOfShares;
	}

}
