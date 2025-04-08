// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {IERC5192} from "./IERC5192.sol";
import {fERC721URIStorage} from './fERC721URIStorage.sol';
import {fERC721} from './fERC721.sol';
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol" ;

// For SBT
// https://github.com/attestate/ERC5192/tree/main/src
// change ERC721 to ERC721URIStorage
abstract contract ERC5192 is fERC721URIStorage, IERC5192 {
  bool private isLocked;

  error ErrLocked();
  error ErrNotFound();

  constructor(string memory _name, string memory _symbol, bool _isLocked)
    fERC721(_name, _symbol)
  {
    isLocked = _isLocked;
  }

  modifier checkLock() {
    if (isLocked) revert ErrLocked();
    _;
  }

  function locked(uint256 tokenId) external view returns (bool) {
    if (_requireOwned(tokenId) == address(0)) revert ErrNotFound();
    return isLocked;
  }

  function safeTransferFrom(
    address from,
    address to,
    uint256 tokenId,
    bytes memory data
  ) public  override(fERC721, IERC721) checkLock {
    super.safeTransferFrom(from, to, tokenId, data);
  }

  function safeTransferFrom(address from, address to, uint256 tokenId)
    public
    override(fERC721, IERC721)
    checkLock
  {
    super.safeTransferFrom(from, to, tokenId);
  }

  function transferFrom(address from, address to, uint256 tokenId)
    public
    override(fERC721, IERC721)
    checkLock
  {
    super.transferFrom(from, to, tokenId);
  }

  function approve(address approved, uint256 tokenId) public  override(fERC721, IERC721) checkLock {
    super.approve(approved, tokenId);
  }

  function setApprovalForAll(address operator, bool approved)
    public
    override(fERC721, IERC721)
    checkLock
  {
    super.setApprovalForAll(operator, approved);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override
    returns (bool)
  {
    return interfaceId == type(IERC5192).interfaceId
      || super.supportsInterface(interfaceId);
  }
}