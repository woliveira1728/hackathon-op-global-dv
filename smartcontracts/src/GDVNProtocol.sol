// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import { IErrors } from "./IErrors.sol";

contract GDVNProtocol is IErrors{
    struct Voting {
        uint256 id;
        address chairman;
        uint256 deadlineTimestamp;
        string title;
        string description;
        Proposal[] proposals;
        Proposal winner;
    }

    struct Proposal {
        uint256 id;
        string name;   
        string link;
        uint voteCount; 
    }

    address public _owner;
    Voting[] _votings;

    mapping(address => mapping(uint256 votingIndex => bool alreadyVoted)) public _votes;

    constructor(address owner) {
        _owner = owner;
    }

    function createVoting(string memory title, uint32 deadlineInMinutes, string memory description) public returns (uint votingIndex) {
        Voting storage newVoting = _votings.push();
        uint256 votingDeadlineTimestamp = block.timestamp + deadlineInMinutes * 60;

        newVoting.id = _votings.length - 1;
        newVoting.chairman = msg.sender;
        newVoting.title = title;
        newVoting.deadlineTimestamp = votingDeadlineTimestamp;
        newVoting.description = description;

        return _votings.length - 1;
    }

    function addProposal(uint votingIndex, string memory name, string memory link) public returns (uint proposalIndex) {
        checkVotingIndex(votingIndex);

        if (msg.sender != _votings[votingIndex].chairman) {
            revert NotTheVotingChairman();
        }
        
        Proposal storage newProposal = _votings[votingIndex].proposals.push();
        
        newProposal.id = _votings[votingIndex].proposals.length - 1;
        newProposal.name = name;
        newProposal.link = link;
        newProposal.voteCount = 0;

        return _votings[votingIndex].proposals.length - 1;
    }

    function vote(uint16 votingIndex , uint8 proposalIndex) public returns (uint voteCount) {
        checkVotingIndex(votingIndex);
        
        Voting storage voting = _votings[votingIndex];

        checkProposalIndex(voting, proposalIndex);

        if (_votes[msg.sender][votingIndex]) {
            revert AlreadyVoted();
        }

        voting.proposals[proposalIndex].voteCount += 1;
        _votings[votingIndex] = voting;
    
        return _votings[votingIndex].proposals[proposalIndex].voteCount;
    }
    
    function getVoting(uint votingIndex) view external returns (Voting memory voting) {
        return _votings[votingIndex];
    }

    function getProposals(uint votingIndex) view external returns (Proposal[] memory proposals) {
        checkVotingIndex(votingIndex);

        return _votings[votingIndex].proposals;
    }

    function drawVotingResult(uint votingIndex) external returns (Proposal memory winnerProposal) {
        checkVotingIndex(votingIndex);

        Voting storage voting = _votings[votingIndex]; 

        if (block.timestamp < voting.deadlineTimestamp) {
            revert DeadlineNotReached(voting.deadlineTimestamp - block.timestamp);
        }

        uint winnerProposalIndex = 0;
        bool isTied = false;
        for (uint i = 0; i < voting.proposals.length; i++) {
            if (voting.proposals[i].voteCount > voting.proposals[winnerProposalIndex].voteCount) {
                winnerProposalIndex = i;
                isTied = false;
            }
            else if (voting.proposals[i].voteCount == voting.proposals[winnerProposalIndex].voteCount && i != 0) {
                isTied = true;
            }
        }

        if (isTied) {
            voting.deadlineTimestamp += 60 * 60;
            revert VotingIsTied();
        }

        voting.winner = voting.proposals[winnerProposalIndex];

        return voting.winner;
    }
    
    function checkVotingIndex(uint votingIndex) view internal {
        if (votingIndex >= _votings.length || votingIndex < 0) {
            revert IndexOutOfRange(votingIndex);
        }
    }

    function checkProposalIndex(Voting memory voting, uint proposalIndex) pure internal{
        if (proposalIndex >= voting.proposals.length || proposalIndex < 0) {
            revert IndexOutOfRange(proposalIndex);
        }
    }
}
