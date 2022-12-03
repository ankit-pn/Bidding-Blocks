const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "user",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "productId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "auctionId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "soldTo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "soldBy",
				"type": "string"
			},
			{
				"internalType": "uint32",
				"name": "soldAt",
				"type": "uint32"
			}
		],
		"name": "addBidDetails",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "user",
				"type": "string"
			}
		],
		"name": "getBidDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "productId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "auctionId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "soldBy",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "soldTo",
						"type": "string"
					},
					{
						"internalType": "uint32",
						"name": "soldAt",
						"type": "uint32"
					}
				],
				"internalType": "struct dataAPI.userData[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
module.exports = {
    CONTRACT_ABI,
    CONTRACT_ADDRESS,
};