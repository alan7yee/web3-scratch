//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    // Contract address: 
    AggregatorV3Interface constant dataFeed = AggregatorV3Interface(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43);

    function getPrice() internal view returns(uint256) {
        return 3000 * 1e18; // for test in fake blockchain.

        (,int answer,,,) = dataFeed.latestRoundData();

        return uint256(answer * 1e10);
    }

    function getConversionRate(uint256 ethAmount) internal view returns(uint256) {

        uint256 ethPrice = getPrice();

        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
        
        return ethAmountInUsd;
    }

    function getVersion() internal view returns(uint256) {
        
        return 121; // for test in fake blockchain

        return dataFeed.version();
    }
}