//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract FallbackExample {
    uint256 public example;


    receive() external payable { 
        example = 10;
    }

    
    fallback() external payable {
        example = 22;
    }
}