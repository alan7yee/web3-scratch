// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;


// when contract be deployed to a blockchain, it will get a address.
contract SimpleStorage {

    // This gets initialized to the uint256 default number 0.
    // The default visibility is internal.
    uint256 public favoriteNumber;
    mapping(string => uint256) nameToFavoriteNumber; 

    // Create a person type.
    // People public person = People({favoriteNumber: 123, name: "Alan"});

    People[] person;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    // Calling this function change the blockchain state that will cost a lot of gas.
    // The more stuff in function, the more gas will cost.
    // and the origin function need be virtual.
    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
    }

    // View and pure function disallow modification of blockchain state
    // It will 0 gas when directly call this kind of function.
    // But it will some gases when called by some  gas cost functions
    function retrieve() public view returns(uint256) {
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoritaNumber) public {
        person.push(People(_favoritaNumber, _name));
        nameToFavoriteNumber[_name] = _favoritaNumber;
    }


}
