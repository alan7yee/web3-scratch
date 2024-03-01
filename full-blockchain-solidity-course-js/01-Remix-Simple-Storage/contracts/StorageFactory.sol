//SPDX-License-Identifier: MIT

pragma solidity 0.8.8;

import "./SimpleStorage.sol";

contract StorageFactory {
    SimpleStorage[] public simpleStorages;

    function createSimpleStorage() public {
        simpleStorages.push(new SimpleStorage());
    }

    function sfStore(uint256 _index, uint256 _favoriteNumber) public {
        simpleStorages[_index].store(_favoriteNumber);
    }
    
    function sfRetrieve(uint256 _index) public view returns(uint256) {
        return simpleStorages[_index].retrieve();
    }
}