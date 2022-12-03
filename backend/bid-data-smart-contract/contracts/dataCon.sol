// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract dataCon {
    //Defining structure 
    struct userData {
        string productId;
        string productName;
        string auctionId;
        string soldBy;
        string soldTo;
        uint32 soldAt;
    }
    mapping (string => userData[]) userMap;    
    function addBidDetails(string memory user,string memory productId,string memory productName,string memory auctionId,string memory soldTo,string memory soldBy,uint32 soldAt) public {
        userData memory u = userData({productId:productId,productName:productName,auctionId:auctionId,soldTo:soldTo,soldBy:soldBy,soldAt:soldAt});
        userMap[user].push(u);
    }
    function getBidDetails(string memory user) public view returns (userData [] memory){
        return userMap[user];
    } 
}