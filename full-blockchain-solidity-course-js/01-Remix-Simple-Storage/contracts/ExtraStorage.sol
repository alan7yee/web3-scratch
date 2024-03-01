//SPDX-License-Identifier: MIT

pragma solidity 0.8.8;

import "./SimpleStorage.sol";

contract ExtraStorage is SimpleStorage {

    // Don't forget the override key word.
    function store(uint256 _favoriteNumber) public override {
        favoriteNumber = _favoriteNumber + 10;
    }
}