// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title TSCBank
 * @dev A simple bank contract to deposit, withdraw, and check balance.
 */
contract TSCBank {
    // Mapping from an address to their balance in Wei
    mapping(address => uint256) private balances;

    // The owner of the contract
    address public owner;

    // Events to log important actions
    event Deposit(address indexed account, uint256 amount);
    event Withdrawal(address indexed account, uint256 amount);

    /**
     * @dev Sets the contract creator as the owner.
     */
    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Allows users to deposit Ether. The amount is sent with the transaction.
     */
    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be more than 0.");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    /**
     * @dev Allows users to withdraw a specified amount of Ether.
     * @param _amount The amount of Wei to withdraw.
     */
    function withdraw(uint256 _amount) public {
        require(_amount > 0, "Withdrawal amount must be more than 0.");
        require(balances[msg.sender] >= _amount, "Insufficient balance.");

        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
        emit Withdrawal(msg.sender, _amount);
    }

    /**
     * @dev Returns the current balance of the message sender.
     */
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
