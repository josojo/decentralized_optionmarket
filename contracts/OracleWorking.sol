import "Admin.sol";

contract OracleWorking {

	//oraclestatusreporting
	bool interruption_occured=false; // if an interruption occured, oracles are broken and everyone is allowed to settle with last prices
	bool temporarySettlementWithLastAvailablePricesAllowed=false;
	uint blockOfTemporarySettlementAllowance;


	///Tracking for betting of working of oracles
	enum Stages { isWorking,
				 fristStageEscalationBetting,
				 secondStageEscalationBetting,
				 revealingSecondStageBets
				}
	Stages public stage ;
	uint betOracleIsWorking=0;
	uint betOracleNotWorking=0;

	uint betOracleIsWorkingSecondStage=0;
	uint betOracleNotWorkingSecondStage=0;
	uint secondStageInitiated;
	uint revealedInitiatedBlockNr;


	///constant parameters
	uint constant perodLengthOfTemporarySettlementAllowance=2000;
	uint constant lengthVotingPeriodStage1=3;//determine how long it can be vote...//target 60/18*60*24*7
	uint constant lengthVotingPeriodStage2=3;//determine how long it can be vote...//target 60/18*60*24*7
	uint constant limitForSecondStageEscalationIsWorking=50000;
	uint constant limitForSecondStageEscalationIsNotWorking=10000;
	uint constant limitForRevealing=20000;
	uint constant feeForReporting=1000;
	uint constant RewardForRightReporting=1000;


	// address of other important contracts
	address marketplace;
	address adminContract;

	//////////bets whether oracles are working
	struct VoteOnWorkingStage1
    {
        address voteAddress; 		// address of sender
        uint voteAmount; 			// amount of betted ether
		bool voteIsOracleWorking;	// bet input, is the oracle working or not
    }
	VoteOnWorkingStage1[] votesStage1;


	struct VoteOnWorkingStage2Blind
    {
        //address voteAddress; 		// address of sender
        uint voteAmount; 			// amount of betted ether
		bytes32 voteIsOracleWorking2;	// bet input, hashed, is the oracle working or not
		bool revealed;
    }
	mapping (address => VoteOnWorkingStage2Blind) votesStage2;


	struct VoteOnWorkingStage2Open
    {
        address voteAddress; 		// address of sender
        uint voteAmount; 			// amount of betted ether
		bool voteIsOracleWorking2;	// bet input, hashed, is the oracle working or not
    }
	VoteOnWorkingStage2Open[] votesStage2Open;
	VoteOnWorkingStage2Open voteAdmin;

	// challenge of oracles
	struct Challenge{
		uint blockNr;
		bytes32  transactionHash;
		address oracleInputAddress;
		address initiator;
	}
	Challenge challenge;

 bool oracleWorkingSet=false;
	function setOracleWorking(address marketplace_, address adminContract_){
	if(oracleWorkingSet)throw;
		//if (msg.value<1 ether)throw; //init of contract with 1 ether reward for right reporting
		marketplace=marketplace_;
		adminContract=adminContract_;
		stage= Stages.isWorking;
		oracleWorkingSet=true;
		}



	function report(bytes32 transactionhash, address oracleInputAddress_){
	   if(stage!=Stages.isWorking) throw;
	   //if (msg.value < feeForReporting finney)throw;
		if (msg.value < 1000 finney)throw;
		stage=Stages.fristStageEscalationBetting;
		challenge=Challenge({
			blockNr: block.number,
			transactionHash: transactionhash,
			oracleInputAddress:oracleInputAddress_,
			initiator: msg.sender
		});

		votesStage1.push(VoteOnWorkingStage1(
		{
			voteAddress: msg.sender,
			voteAmount: msg.value,
			voteIsOracleWorking: false
		}));
		betOracleNotWorking +=msg.value;
	}


	function betStage1(bool isWorking){
		if(stage !=Stages.fristStageEscalationBetting) throw;
		votesStage1.push(VoteOnWorkingStage1(
		{
			voteAddress: msg.sender,
			voteAmount: msg.value,
			voteIsOracleWorking: isWorking
		}));
		if (isWorking)
			betOracleIsWorking +=msg.value;
		else
			betOracleNotWorking +=msg.value;
	}



	function betStage2(bytes32 isWorkingBlind){
		if(stage !=Stages.secondStageEscalationBetting) throw;
		votesStage2[msg.sender]=(VoteOnWorkingStage2Blind(
		{
			//voteAddress: msg.sender,
			voteAmount: msg.value,
			voteIsOracleWorking2: isWorkingBlind,
			revealed: false
		}));
	}



	function evaluteBetStage1(){
		if(stage!=Stages.fristStageEscalationBetting) throw;
		if(challenge.blockNr+lengthVotingPeriodStage1>block.number) throw;

		//is second escaltion needed?  we need to think about these tresholds of 10000 ether and 50000 ether again
		if (betOracleNotWorking>limitForSecondStageEscalationIsNotWorking && betOracleIsWorking>limitForSecondStageEscalationIsWorking){
			stage=Stages.secondStageEscalationBetting;
			secondStageInitiated=block.number;
		}

		else{
			if(betOracleNotWorking > betOracleIsWorking){
				interruption_occured=true;
				uint interruption_of_oracle_blocknr=block.number;
				uint sum=betOracleNotWorking+betOracleIsWorking;
				uint s=votesStage1.length;
				for( uint i=0;i<s;i++){
					VoteOnWorkingStage1 vote=votesStage1[i];
					if (vote.voteIsOracleWorking){
						vote.voteAddress.send(vote.voteAmount*sum/betOracleIsWorking);
					}
				}
			challenge.initiator.send(1 ether);

			}
			else{
				sum=betOracleNotWorking+betOracleIsWorking;
				s=votesStage1.length;
				for( i=0;i<s;i++){
					 vote=votesStage1[i];
					if (vote.voteIsOracleWorking){
						vote.voteAddress.send(vote.voteAmount*sum/betOracleIsWorking);
					}
				}
			}
			delete votesStage1;

		 betOracleIsWorking=0;
	 betOracleNotWorking=0;
		}
	}

    function reveal( bool vote, bytes32 secret_)
    {
		if((stage==Stages.secondStageEscalationBetting && secondStageInitiated + lengthVotingPeriodStage2>block.number)){
		stage=Stages.revealingSecondStageBets;
		revealedInitiatedBlockNr=block.number;
			betOracleIsWorkingSecondStage=0;
		 betOracleNotWorkingSecondStage=0;
		}
		if(stage!=Stages.revealingSecondStageBets)throw;

		if(msg.sender!=Admin(adminContract).getAdmin()){
			var bid= votesStage2[msg.sender];
		if(bid.revealed)throw;
			if (bid.voteIsOracleWorking2 != sha3(vote, secret_))
					// Bid was not actually revealed.
					// Do not refund deposit.
					throw;
			if(vote)
				betOracleIsWorkingSecondStage+=bid.voteAmount;
			else
				betOracleNotWorkingSecondStage+=bid.voteAmount;

			votesStage2Open.push(VoteOnWorkingStage2Open(
    	{
		voteAddress:msg.sender,
		voteAmount:bid.voteAmount,
		voteIsOracleWorking2:vote,
		}));
		}
		else{
			bid = votesStage2[msg.sender];
		if(bid.revealed)throw;
			if (bid.voteIsOracleWorking2 != sha3(vote, secret_))
					// Bid was not actually revealed.
					// Do not refund deposit.
					throw;
			if(vote)
				betOracleIsWorkingSecondStage+=bid.voteAmount;
			else
				betOracleNotWorkingSecondStage+=bid.voteAmount;
			voteAdmin=VoteOnWorkingStage2Open({
				voteAddress:msg.sender,
			voteAmount:bid.voteAmount,
			voteIsOracleWorking2:vote,
			});
		}
    }

	function evaluteBetStage2(){
		if(stage!=Stages.fristStageEscalationBetting) throw;
		if(revealedInitiatedBlockNr+limitForRevealing>block.number) return;

		bool marketvote;
		if(betOracleIsWorking>betOracleNotWorking)
		marketvote=true;
		else marketvote=false;
		uint i=0;
		//case 1
		// when majority and admin have the same vote that oracles are working:
		// market keeps working as usual
		if(marketvote==true && true==voteAdmin.voteIsOracleWorking2){
			l=votesStage2Open.length;
			for(i=0;i<l;i++){
				if(votesStage2Open[i].voteIsOracleWorking2){
					votesStage2Open[i].voteAddress.send(votesStage2Open[i].voteAmount+votesStage2Open[i].voteAmount/betOracleIsWorkingSecondStage*betOracleNotWorking/2);
				}
				else votesStage2Open[i].voteAddress.send(votesStage2Open[i].voteAmount);
				}
			voteAdmin.voteAddress.send(voteAdmin.voteAmount/betOracleIsWorkingSecondStage*betOracleIsWorking/2);
			l=votesStage1.length;
			for(i=0;i<l;i++){
				if(votesStage1[i].voteIsOracleWorking){
					votesStage1[i].voteAddress.send(votesStage1[i].voteAmount*betOracleNotWorking/2/betOracleIsWorking+votesStage1[i].voteAmount);
				}
				}
			temporarySettlementWithLastAvailablePricesAllowed=true;
			blockOfTemporarySettlementAllowance=block.number;
		}

		//case 2
		// when majority and admin have the different vote:
		// all options will be settled with last prices available. markets will be destructed.
		if(marketvote!=voteAdmin.voteIsOracleWorking2){
			interruption_occured=true;
			// market can now destruct hisself;

			// sending funds back
			uint l=votesStage1.length;
			for( i=0;i<l;i++){
					votesStage1[i].voteAddress.send(votesStage1[i].voteAmount);
				}
			challenge.initiator.send(1 ether);

			l=votesStage2Open.length;
			for(i=0;i<l;i++){
					votesStage2Open[i].voteAddress.send(votesStage2Open[i].voteAmount);
				}
			voteAdmin.voteAddress.send(voteAdmin.voteAmount);
		}
		//case 3
		// when majority and admin have the same vote: that the oracles are broken
		// market keeps working as usual
		if(marketvote==false && false==voteAdmin.voteIsOracleWorking2){

			interruption_occured=true;
			l=votesStage2Open.length;
			for(i=0;i<l;i++){
				if(!votesStage2Open[i].voteIsOracleWorking2){
					votesStage2Open[i].voteAddress.send(votesStage2Open[i].voteAmount*betOracleIsWorking/2/betOracleNotWorkingSecondStage+votesStage2Open[i].voteAmount);
				}
				else votesStage2Open[i].voteAddress.send(votesStage2Open[i].voteAmount);

				}
			voteAdmin.voteAddress.send(voteAdmin.voteAmount/betOracleIsWorkingSecondStage*betOracleIsWorking/2);
			l=votesStage1.length;
			for(i=0;i<l;i++){
				if(!votesStage1[i].voteIsOracleWorking){
					votesStage1[i].voteAddress.send(votesStage1[i].voteAmount*betOracleIsWorking/2/betOracleNotWorking+votesStage1[i].voteAmount);
				}
				}

		}

		 betOracleIsWorking=0;
	 	betOracleNotWorking=0;
	}

	function temporarySettlementAllowed() constant returns (bool){
		return temporarySettlementWithLastAvailablePricesAllowed;
	}
	function resettemporarySettlementAllowance(){
		if(block.number>blockOfTemporarySettlementAllowance+perodLengthOfTemporarySettlementAllowance){
			temporarySettlementWithLastAvailablePricesAllowed=false;
		}
	}


	function oracleIsWorkingSinceEver() constant returns (bool){
		if (interruption_occured) return false;
		return true;
	}


	function oracleWithoutIssues() constant returns (bool){
		if (stage==Stages.isWorking) return true;
		return false;
	}


	function getChallengeInfoTransaction() constant returns (bytes32 ){
		return challenge.transactionHash;
	}

}
