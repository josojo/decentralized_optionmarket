import "Marketplace.sol";
import "OracleWorking.sol";
import "Oracles.sol";
import "Admin.sol";
import "OracleInputs.sol";

contract PriceFeed{
	address adminContract;//needs to be set by constructor
	address globalParameters; //needs to be set by constructor
	Oracles oracles; //needs to be set by constructor
	OracleWorking oracleWorking;//needs to be set by constructor
	string name;  //needs to be set by constructor
	Marketplace marketplace;
	//////price 1 USD = x wei;
	////////////////////keeping track of prices/////////////////
	uint[50] lastprices;	//prices from last 50 blocks will be stored in here; if requested
	uint[50] lastpricesblocknr;	//logging for which blocknrs a price update has been requested,
	bool[50] pricesubmitted;    //if price has been submitted by oracles;
	//lastest pricerequest
	uint costofpriecerequest=1000000; //in wei
	uint lastPrice=0;


	event RequestForOracle(uint blocknr);

	function newPriceRequest(uint blocknr) constant returns (bool){

			RequestForOracle(blocknr);
		if(msg.value< costofpriecerequest)throw;

		if(blocknr>block.number+1) throw;
		if(blocknr<block.number-50)throw;
		if(lastpricesblocknr[blocknr%50]==blocknr)throw;

		lastpricesblocknr[blocknr%50]=blocknr;
		pricesubmitted[blocknr%50]=false;
		return true;
	}

	///oracle input/
	function oracleInput( uint blocknr)  {

		if(blocknr-30<block.number)throw; // giving oracles some time to do their work
		if(blocknr>block.number) throw;

		uint l=oracles.countOracles();
		uint nrNotYetReady;
		uint average=0;
		uint max=0;
		uint min= 2147483647;

		for(uint i=0;i<l;i++){
			OracleInputs oI=OracleInputs(oracles.getOracleInputAddress(i));
			var (a,b)=oI.provideInput(blocknr, this);
			if(!b) nrNotYetReady++;
			average+=a;
			if(a<min)min=a;
			if(a>max)max;
		}
		average/=l;
		// one wrong report is allowed:
		if(nrNotYetReady>1)throw;
		if(average*100/97>min){
			average=(average*l-min)/(l-1);
			if(average*103/100>min)throw; //two mistakes not allowed;
		}
		if(average*103/100>min){
			average=(average*l-max)/(l-1);
		}
		pricesubmitted[blocknr%50]=true;
		lastprices[blocknr%50]=average;
	}// good for one oracle, but need proper solution for many oracles

	function getPriceFromBlock(uint blocknr)constant returns (uint,bool){
		if(blocknr+40>block.number) throw;  //giving traders time to report not working oracle;
		if(!oracleWorking.oracleWithoutIssues())throw;  //checking that oracle is not working
		if(!pricesubmitted[blocknr%50])oracleInput(blocknr);
		if(lastpricesblocknr[blocknr%50]==blocknr){
			if(pricesubmitted[blocknr%50]){
				lastPrice=lastprices[blocknr%50];
				return (lastprices[blocknr%50],true);
			}

		}
		else{

			return (0,false);
		}
	}
	function getLastPrice() constant returns (uint){
		return lastPrice;
	}
	function setCostOfPriceRequest(uint p) onlyIsAdmin(msg.sender){
		if(p>1000000000)throw;//admin should not be allowed to make it to high
		costofpriecerequest=marketplace.getTransactionFee();
	}
	////////////////////////////////////////////////////////////////////////////

	//// adding and deleting marketplaces which are trusted to share marketprices

	modifier onlyIsAdmin(address own) { if (own != Admin(adminContract).getAdmin()) throw; _ }

	struct priceInput{
		string priceInputUrl;
		uint weight;   //market pricefeed weight: nr 1  - 100
	}
	priceInput[] inputs;



	function deletePriceFeed(uint index) onlyIsAdmin(msg.sender){
		delete inputs[index];
						   }

	function addPriceFeed(string url, uint w) onlyIsAdmin(msg.sender){
		inputs.push(priceInput({
			priceInputUrl:url,
			weight: w
		}));
	}
	/////providing information
	function getName() constant returns (string){
		return name;
	}

	function setName(string _name) onlyIsAdmin(msg.sender) {
		name=_name;
	}

	function getAddress() constant returns (address){
		return this;
	}

}
