// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./escrow.sol";

contract Pool is Ownable {
    using SafeERC20 for IERC20;

    enum Status {
        Pending,
        Live,
        Locked,
        Closed,
        Cancelled
    }

    IERC20 public immutable token;
    EscrowManager public immutable escrow;
    address public factory;
    address public seller;
    string public cardId;
    uint256 public targetThreshold;
    uint256 public collected;
    uint256 public baseSpinPrice;
    Status public status;

    mapping(address => uint256) public contributions;

    event PoolInitialized(address indexed seller, string cardId, uint256 threshold, uint256 spinPrice);
    event Contributed(address indexed user, uint256 amount, uint256 total);
    event GrailUnlocked(uint256 collectedAt);
    event PoolClosed(uint256 finalCollected);
    event PayoutReleased(address indexed seller, uint256 amount);
    event Refunded(address indexed user, uint256 amount);

    modifier onlyFactory() {
        require(msg.sender == factory, "Pool: only factory");
        _;
    }

    constructor(IERC20 _token, EscrowManager _escrow) Ownable(msg.sender) {
        token = _token;
        escrow = _escrow;
        factory = msg.sender; 
        status = Status.Pending;
    }

    function initialize(
        address owner_,
        address seller_,
        string calldata cardId_,
        uint256 threshold_,
        uint256 baseSpinPrice_
    ) external onlyFactory {
        require(status == Status.Pending, "Pool: already initialized");
        seller = seller_;
        cardId = cardId_;
        targetThreshold = threshold_;
        baseSpinPrice = baseSpinPrice_;
        status = Status.Live;
        _transferOwnership(owner_);
        emit PoolInitialized(seller_, cardId_, threshold_, baseSpinPrice_);
    }

    function contribute(uint256 amount) external {
        require(status == Status.Live, "Pool: not live");
        require(amount > 0, "Pool: zero amount");

        token.safeTransferFrom(msg.sender, address(escrow), amount);
        contributions[msg.sender] += amount;
        collected += amount;
        emit Contributed(msg.sender, amount, collected);

        if (collected >= targetThreshold) {
            status = Status.Locked;
            emit GrailUnlocked(collected);
        }
    }

    function closePool() external onlyOwner {
        require(status == Status.Locked || status == Status.Live, "Pool: cannot close");
        status = Status.Closed;
        emit PoolClosed(collected);
    }

    function releasePayout(uint256 amount) external onlyOwner {
        require(status == Status.Closed, "Pool: not closed");
        require(amount > 0 && amount <= collected, "Pool: invalid amount");
        escrow.releaseTo(seller, amount);
        emit PayoutReleased(seller, amount);
    }

    function refundContributor(address user, uint256 amount) external onlyOwner {
        require(contributions[user] >= amount && amount > 0, "Pool: invalid refund");
        contributions[user] -= amount;
        collected -= amount;
        escrow.releaseTo(user, amount);
        emit Refunded(user, amount);
    }

    function cancelPool() external onlyOwner {
        require(status == Status.Live || status == Status.Locked, "Pool: cannot cancel");
        status = Status.Cancelled;
    }
}
