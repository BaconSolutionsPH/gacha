// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract EscrowManager is Ownable , ReentrancyGuard{
    using SafeERC20 for IERC20;

    IERC20 public immutable token;
    address public poolAddress;

    event PoolAuthorized(address indexed pool, bool allowed);
    event Deposited(address indexed pool, address indexed from, uint256 amount);
    event Released(address indexed pool, address indexed to, uint256 amount);

    constructor(IERC20 _token, address pool) Ownable(msg.sender) {
        token = _token;
        poolAddress = pool;
        emit PoolAuthorized(pool, true);
    }

    function depositForPool(address pool, uint256 amount) public nonReentrant {
        require(pool == poolAddress, "Escrow: pool not authorized");
        require(amount > 0, "Escrow: zero amount");
        token.safeTransferFrom(msg.sender, address(this), amount);
        emit Deposited(pool, msg.sender, amount);
    }

    function releaseTo(address to, uint256 amount) public onlyOwner {
        require(amount > 0, "Escrow: zero amount");
        token.safeTransfer(to, amount);
        emit Released(msg.sender, to, amount);
    }
}
