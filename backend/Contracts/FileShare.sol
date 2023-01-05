// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FileShare is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("FileShare", "EC") {}
   
    struct files{
        uint256 id;
        address owner;
        address share_add;
        string uri;
    }
      mapping(uint256=> files) private FileList; 
    mapping(address => files[]) public FileLog; 

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        
        
        FileLog[msg.sender].push(files(tokenId,msg.sender,to,uri));
        FileList[tokenId] = files(tokenId,msg.sender,to,uri);
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

   function get_files() public view returns(files[] memory)
   {
    return FileLog[msg.sender];
   }

    function share_files() public view returns(files[] memory)
   {
     uint256 count=0;
     for(uint256 i=0;i<_tokenIdCounter.current();i++)
     {
        if(FileList[i].share_add==msg.sender)
        {
            count=count+1;
        }
        
     }
     files[] memory obj = new files[] (count);
     uint256 x=0;
     for(uint256 i=0;i<_tokenIdCounter.current();i++)
     {
        if(FileList[i].share_add==msg.sender)
        {
                files storage share_list =FileList[i];
                obj[x]=share_list;
                x=x+1;
        }
     }
     return obj;
   }

   
    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
 
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
