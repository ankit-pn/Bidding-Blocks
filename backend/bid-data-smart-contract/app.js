const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const CONTRACT_ABI = require('./config');
// const CONTRACT_ADDRESS = require('./config');
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
    response.json({ message: "Hey! This is your server response!" });
    // next();
});

var provider = new HDWalletProvider(process.env.MNEMONIC, 'https://goerli.infura.io/v3/' + process.env.INFURA_API_KEY);
var web3 = new Web3(provider);
var myContract = new web3.eth.Contract(CONTRACT_ABI.CONTRACT_ABI, process.env.CONTRACT_ADDRESS);

const addBidDetails = async (user, productId, productName,auctionId,soldTo,soldBy,soldAt) => {
    const res = await myContract.methods.addBidDetails(user, productId, productName,auctionId,soldTo,soldBy,soldAt).send({
        from: process.env.ACCOUNT
    });
    return res;
};
const getBidDetails = async (user) => {
    const data = await myContract.methods.getBidDetails(user).call();
    var res = [];
    for (let i = 0; i < data.length; i++) {
        res.push({ 'productId': data[i]['productId'], 'productName': data[i]['productName'],'auctionId':data[i]['auctionId'],'soldTo':data[i]['soldTo'],'soldBy':data[i]['soldBy'],'soldAt':data[i]['soldAt'] });
    }
    return { 'files': res };
}
app.post("/postBidDetails", async (req, res) => {
    const productId = req.body.productId;
    const productName = req.body.productName;
    const user = req.body.user;
    const auctionId = req.body.auctionId;
    const soldTo = req.body.soldTo;
    const soldBy = req.body.soldBy;
    const soldAt = req.body.soldAt;

    // console.log(cid, user, fileName);
    await addBidDetails(user, productId,productName,auctionId,soldTo,soldBy,soldAt).then((result) => {
        res.status(201).send({
            message: "Data Saved Suceessfully",
            info: result,
        });
    })
        .catch((error) => {
            res.status(500).send({
                message: "Error Saving Data",
                error,
            });
        });;
})

app.post("/getBidDetails", async (req, res) => {
    const user = req.body.user;
    await getBidDetails(user).then((result) => {
        res.json(result);
    }).catch(
        (err)=>{
            // console.log(user);
            console.log(err);
        }
    );
});


module.exports = app;
