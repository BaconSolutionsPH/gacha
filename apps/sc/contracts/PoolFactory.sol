// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Pool.sol";
import "./escrow.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract PoolFactory is Ownable, ReentrancyGuard {
    struct ICreatePool {
        IERC20 token;
        address seller;
        string cardId;
        uint256 threshold;
        uint256 baseSpinPrice;
    }
    event PoolCreated(address indexed poolAddress, address indexed escrowAddress);
    constructor() Ownable(msg.sender) { }

    function createPool(ICreatePool memory _poolParams) public nonReentrant returns (address, address) {
        EscrowManager escrow = new EscrowManager(_poolParams.token, address(this));
        Pool pool = new Pool(_poolParams.token, escrow);
        pool.initialize(
            address(this),
            _poolParams.seller,
            _poolParams.cardId,
            _poolParams.threshold,
            _poolParams.baseSpinPrice
        );
        emit PoolCreated(address(pool), address(escrow));  
        return (address(pool), address(escrow));
    }
}