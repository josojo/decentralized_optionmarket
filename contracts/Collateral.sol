import "Marketplace.sol";
import "PriceFeed.sol";
import "OracleWorking.sol";

contract Collateral is PriceFeed {
	bool collateralSet=false;
	function setCollateral(address marketplaceadd, address oracleWorking_, string name2, address adminContract_, address oraclesAdd){
		if(collateralSet)throw;

		marketplace=Marketplace(marketplaceadd);
		oracleWorking = OracleWorking(oracleWorking_);
		adminContract=adminContract_;
		name=name2;
		oracles=Oracles(oraclesAdd);
		collateralSet=true;
	}

}
