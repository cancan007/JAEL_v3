// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/governance/TimelockController.sol";

// Actual contract to execute proposal
contract TimeLock is TimelockController {
    constructor(
        uint minDelay,
        address[] memory proposers,
        address[] memory executors,
        address admin // optional: deactivate with 0 adress
    )TimelockController(minDelay,proposers,executors, admin) {
    }
}