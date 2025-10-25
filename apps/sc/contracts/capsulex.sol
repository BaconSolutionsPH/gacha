// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.4.0
pragma solidity ^0.8.27;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Capsulex is ERC20, ERC20Burnable, ERC20Permit, Ownable {
    constructor()
        ERC20("Capsulex", "CAPSULx")
        ERC20Permit("Capsulex")
        Ownable(msg.sender)
    {
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }
}
