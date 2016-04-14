import "DAOVoting.sol";
import "Admin.sol";
contract Marketplace is DAOVoting{
	address adminContract;  // admin Contract stores the address of the admin who is allowed to add marketes and do other admin stuff
	address oracles;      // all the oracles will be maintained form this contract
	address oraclesWorking;   // this is the address of the OracleWorking contract, which reports whether oracles ware working fine
	address[] marketPairs;   // lists all marketPairs for optiontrading
	address[] collaterals;
	//address owners;  // is in DAOVoting
   Admin public admin;   // object of admin contract;
	modifier onlyIsAdmin(address own) { if (own != admin.getAdmin()) throw; _ }

	bool marketplaceSet=false;
	function setMarketplace(address adminContract_, address oracles_, address owners_, address oraclesWorking_){
	  if(marketplaceSet)throw;
		adminContract=adminContract_;
		admin=Admin(adminContract);
		marketplaceSet=true;
		oracles=oracles_;
	    owners=owners_;
		oraclesWorking=oraclesWorking_;
	}

	function registerCollateral(address cAddress) onlyIsAdmin(msg.sender){
		collaterals.push(cAddress);
	}

	function registerMarket(address cAddress) onlyIsAdmin(msg.sender){
		marketPairs.push(cAddress);
	}
	function unregisterCollateral(address cAddress) onlyIsAdmin(msg.sender) {
		for(uint k=0;k<collaterals.length;k++){
			if(collaterals[k]==cAddress){
				delete collaterals[k];
				throw;
			}
		}
	}

	function getAdminContractAddress() constant returns (address){
		return adminContract;
	}
	function unregisterMarket(address cAddress) onlyIsAdmin(msg.sender) {
		for(uint k=0;k<marketPairs.length;k++){
			if(marketPairs[k]==cAddress){
				delete marketPairs[k];
				throw;
			}
		}
	}

	function payOwners() onlyIsAdmin(msg.sender){
		owners.send(this.balance);
	}

	uint transactionFee;
	function getTransactionFee() constant returns (uint){
		return transactionFee;
	}
	////////providing informations about the contract;
	function getMarketpairs() constant returns (address[]){
		return marketPairs;
	}

	function getOracles() constant returns (address){
		return oracles;
	}

	function getOraclesWorking() constant returns (address){
		return oraclesWorking;
	}
	function getMarketEarning() constant returns (uint){
		return this.balance;
	}

	function setTransactionFee(uint costs) onlyIsAdmin(msg.sender){
		transactionFee=costs;
	}

}
