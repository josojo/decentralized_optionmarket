import "Owner.sol";
import "Mapping.sol";

contract DAOVoting {
	address owners;  // stores address of contract Owner
	address newAddressProposal;  // proposal of new address
    enum Stages {
        noVoteInitiated,
        votingActive
    }
	Stages public stage =Stages.noVoteInitiated;

	uint votingPeriodInBlocks=10000;
	uint votingBlockSinceLastTransaction=20; // do not allow people to vote, who sold or bought 20 blocks ago their shares
	uint blockOfStateChange=0;
	uint voteForChange;
	uint voteForNoChange;
	uint costForInitiationOfProposal=100000000;
	address mappingVotedAdd;  // stores address of contract Mapping, which shores which address have already voted
	address proposalInitiator;

	function initiateProposalContract(address add){
		if(msg.value<costForInitiationOfProposal)throw;
		if(stage!=Stages.noVoteInitiated)throw;
		newAddressProposal=add;
		proposalInitiator=msg.sender;
		stage=Stages.votingActive;
		voteForChange=0;
		voteForNoChange=0;
		mappingVotedAdd=new Mapping();
	}
	function vote(bool vote){
		if(stage!=Stages.votingActive)throw;
		Owner o=Owner(owners);
		Mapping m=Mapping(mappingVotedAdd);
		if(!m.activated(msg.sender))
		if(o.getLastTransactionBlock(msg.sender)+votingPeriodInBlocks+votingBlockSinceLastTransaction>block.number)throw;
		if(vote){
			voteForChange+=o.getBalanceOf(msg.sender);
		}
		else{
			voteForNoChange+=o.getBalanceOf(msg.sender);
		}
		m.setActive(msg.sender);
	}

		function evaluteVotes(){
		if(stage!=Stages.votingActive || blockOfStateChange+votingPeriodInBlocks>block.number)throw;
		if(voteForChange>voteForNoChange)
		{
			Owner o=Owner(owners);
			o.transfer(newAddressProposal, this,o.getBalanceOf(this));
			o.changeDAOFunctionAddress(newAddressProposal);
			proposalInitiator.send(costForInitiationOfProposal);
			newAddressProposal.send(this.balance);
		}
		else{
			stage=Stages.noVoteInitiated;
		}
	}

	///providing Infos
	function getState() constant returns (Stages){
		return stage;
	}
	function getProposedAddress() constant returns (address){
		return newAddressProposal;
	}
}
