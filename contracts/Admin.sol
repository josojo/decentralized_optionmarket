import "DAOVoting.sol";


contract Admin is DAOVoting{
	address admin;
	bool adminSet=false;

	function setAdmin(){
		if(!adminSet){
			admin=msg.sender;
			adminSet=true;
		}
	}
	function getAdmin() constant returns (address){
		return admin;
	}

}
