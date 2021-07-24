// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMap is ERC721, Ownable {
    	mapping(uint256 => uint256) private salePrice;
    	mapping(uint256 => address) private buyer;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("NFT-Map", "MAP") {}

    function mintNft(address receiver, string memory tokenURI) external onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 newNftTokenId = _tokenIds.current();
        _mint(receiver, newNftTokenId);
        _setTokenURI(newNftTokenId, tokenURI);

        return newNftTokenId;
    }
    function setSale(uint256 tokenId, uint256 price) public {
		address owner = ownerOf(tokenId);
        require(owner != address(0), "setSale: nonexistent token");
        require(owner == msg.sender, "setSale: msg.sender is not the owner of the token");
		salePrice[tokenId] = price;
	}
    function setBuyer(uint256 tokenId) public {
		address owner = ownerOf(tokenId);
        require(owner != address(0), "setSale: nonexistent token");
		buyer[tokenId] =  msg.sender;
	}	
	
	function buyTokenOnSale(uint256 tokenId) public payable {
		uint256 price = salePrice[tokenId];
        require(price != 0, "buyToken: price equals 0");
        require(msg.value == price, "buyToken: price doesn't equal salePrice[tokenId]");
		address payable owner = address(uint160(ownerOf(tokenId)));
		// approve(address(this), tokenId);
		salePrice[tokenId] = 0;
		transferFrom(owner, msg.sender, tokenId);
        owner.transfer(msg.value);
	}
		function getSalePrice(uint256 tokenId) public view returns (uint256) {
		return salePrice[tokenId];
	}
	function getBuyer(uint256 tokenId) public view returns (address) {
		return buyer[tokenId];
	}
}