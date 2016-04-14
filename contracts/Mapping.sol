contract Mapping{
	 mapping (address=>bool) public activated;
	function aktivate(address add) constant returns (bool){
		return activated[add];
	}
	function setActive(address add) public{
		activated[add]=true;
	}
}
