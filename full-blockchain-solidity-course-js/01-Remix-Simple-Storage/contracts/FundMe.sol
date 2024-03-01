//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./PriceConverter.sol";

error NotOwner();

contract FundMe {
    using PriceConverter for uint256;

    uint256 public constant MINI_USD = 50 * 1e18;
    address[] public funder;
    mapping(address => uint256) public addressToAmountFunded;
    address owner;

    constructor() {
        owner = msg.sender;
    }

    function fund() public payable {
        require(msg.value.getConversionRate() >= MINI_USD, "Need more eth.");
        funder.push(msg.sender);
        addressToAmountFunded[msg.sender] += msg.value;
    }

    function getVersion() public view returns(uint256){
        return PriceConverter.getVersion();
    }

    modifier onlyOwner {
        // require(msg.sender == owner);
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    function withdraw() public  onlyOwner {
        for (uint256 funderIndex = 0; funderIndex < funder.length; funderIndex++) {
            addressToAmountFunded[funder[funderIndex]] = 0;
        }

        // Delete all funders.
        funder = new address[](0);

        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }

    // handle when user send eth to contract without fund function.
    receive() external payable {
        fund();
    }

    fallback() external payable { 
        fund();
    }


    

}