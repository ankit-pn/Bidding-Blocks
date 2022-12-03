const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dbConnect = require("./dbConnect");
const Products = require("./productModel");
const Auctions = require("./auctionModel");
const { v4: uuidv4 } = require('uuid');
dbConnect();

// Curb Cores Error by adding a header here
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
    next();
});


app.post("/addProduct", async (request, response) => {

    const productId = uuidv4();
    const auctionId = request.body.auctionId;
    const productName = request.body.productName;
    const productDescription = request.body.productDescription;
    const basePrice = request.body.basePrice;
    const product = new Products({
        productId: productId,
        auctionId: auctionId,
        productName: productName,
        productDescription: productDescription,
        basePrice: basePrice,
        totalBid: [],
        soldDetails: {}
    });

    await addProductId(auctionId, productId);
    product.save()
        .then(async (result) => {

            response.status(201).send({
                message: "Product Added Suceessfully",
                result,
            });
        }) // 
        .catch((error) => {
            response.status(500).send({
                message: "Error Saving Product",
                error,
            });
        })//
})



const addProductId = async (auctionId, productId) => {
    const user = await Auctions.findOneAndUpdate({ auctionId: auctionId }, { $push: { "productIds": productId } });
}

app.post('/addAuction', async (request, response) => {
    const auctionId = uuidv4();
    const auctionName = request.body.auctionName;
    const auctionDescription = request.body.auctionDescription;
    const startDate = request.body.startDate;
    const endDate = request.body.endDate;
    const auctionHost = request.body.auctionHost;
    const approveStatus = false;
    const Status = request.body.Status;
    // const productId = uuidv4();
    // const productName = request.body.productName;
    // const productDescription = request.body.productDescription;
    // const basePrice = request.body.basePrice;
    const productArray = request.body.productArray;
    const productIdArray = [];
    for (let i = 0; i < productArray.length; i++) {
        let productId = uuidv4();
        let productName = productArray[i]['productName'];
        let productDescription = productArray[i]['productDescription'];
        let basePrice = productArray[i]['basePrice'];
        const product = new Products({
            productId: productId,
            auctionId: auctionId,
            productName: productName,
            productDescription: productDescription,
            basePrice: basePrice,
            totalBid: [],
            soldDetails: {}
        });
        productIdArray.push(productId);
        // await addProductId(auctionId,productId);
        product.save()
    }
    const auction = new Auctions({
        auctionId: auctionId,
        auctionName: auctionName,
        auctionDescription: auctionDescription,
        startDate: startDate,
        endDate: endDate,
        auctionHost: auctionHost,
        productIds: productIdArray,
        approveStatus: approveStatus,
        Status: Status
    });


    auction.save()
        // return success if the new user is added to the database successfully
        .then((result) => {
            response.status(201).send({
                message: "Auction Added Suceessfully",
                result,
            });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
            response.status(500).send({
                message: "Error Saving Auction",
                error,
            });
        });
})


app.post('/getAuctionByUserId', async (request, response) => {
    const userId = request.body.userId;
    if (userId === undefined) {
        response.json({ "userId": "userId not found" });
    }
    else {
        const auctionDetails = await Auctions.find({ auctionHost: userId })
        const resp = await auctionDetails.length ? { "auctionDetails": auctionDetails } : { "message": "No Records Found" }
        await response.json(resp)
    }
})

// register endpoint
app.post('/getProducts', async (request, response) => {
    const auctionId = request.body.auctionId;
    // const itemId = request.body.itemId;
    // const quantity = request.body.quantity;
    if (auctionId === undefined) {
        response.json({ "auctionId": "auctionId not Found" });
    }
    else {
        const productList = await Products.find({ auctionId: auctionId })
        const resp = await productList.length ? { "productList": productList } : { "message": "No Records Found" }
        await response.json(resp)
    }
});


app.post('/getAuctionDetailByAuctionId', async (request, response) => {
    const auctionId = request.body.auctionId;
    if (auctionId === undefined) {
        response.json({ "auctionId": "auctionId not found" });
    }
    else {
        const auctionDetails = await Auctions.find({ auctionId: auctionId })
        const resp = await auctionDetails.length ? { "auctionDetails": auctionDetails } : { "message": "No Records Found" }
        await response.json(resp)
    }
})

app.post('/getProductDetailByProductId', async (request, response) => {
    const productId = request.body.productId;
    if (productId === undefined) {
        response.json({ "productId": "productId not found" });
    }
    else {
        const productDetails = await Products.find({ productId: productId })
        const resp = await productDetails.length ? { "productDetails": productDetails } : { "message": "No Records Found" }
        await response.json(resp)
    }
})


app.post('/getAuctions', async (request, response) => {
    const apiId = request.body.apiId;
    if (apiId === 'admin') {
        const allauction = await Auctions.find();
        const resp = await allauction.length ? { "allauction": allauction } : { "message": "No Records Found" }
        await response.json(resp)
        // await response.json(allauction);
    }
    else if (apiId === 'user') {
        const approvedAuction = await Auctions.find({ approveStatus: true });
        const resp = await approvedAuction.length ? { "approvedAuction": approvedAuction } : { "message": "No Records Found" }
        await response.json(resp)
    }
    else {
        await response.json({ "msg": "incorrect user" });
    }
});


app.post('/addBider', async (request, response) => {
    const userId = request.body.userId;
    const auctionId = request.body.auctionId;
    const productId = request.body.productId;
    const bid = request.body.bid;
    const transactionId = request.body.transactionId;
    const bid1 = await Products.findOneAndUpdate({ productId: productId, auctionId: auctionId }, { $push: { "totalBid": [userId, bid,transactionId] } }).then((result) => {
        response.status(201).send({
            message: "bid added Suceessfully",
            result,
        });
    })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
            response.status(500).send({
                message: "Error Adding bid",
                error,
            });
        });
});

app.post('/changeApproveStatus', async (request, response) => {
    const apiId = request.body.apiId;
    const newStatus = request.body.newStatus;
    const auctionId = request.body.auctionId;
    if (apiId === 'admin') {
        const bid1 = await Auctions.findOneAndUpdate({ auctionId: auctionId }, {
            $set: {
                "approveStatus": newStatus
            }
        }).then((result) => {
            response.status(201).send({
                message: "updated Suceessfully",
                result,
            });
        })
            // catch error if the new user wasn't added successfully to the database
            .catch((error) => {
                response.status(500).send({
                    message: "Error updating",
                    error,
                });
            })
    }
});

app.post('/changeCurrStatus', async (request, response) => {
    const apiId = request.body.apiId;
    const newStatus = request.body.newStatus;
    const auctionId = request.body.auctionId;
    if (apiId === 'admin') {
        const bid1 = await Auctions.findOneAndUpdate({ auctionId: auctionId }, {
            $set: {
                "currStatus": newStatus
            }
        }).then((result) => {
            response.status(201).send({
                message: "updated Suceessfully",
                result,
            });
        })
            // catch error if the new user wasn't added successfully to the database
            .catch((error) => {
                response.status(500).send({
                    message: "error updating",
                    error,
                });
            })
    }
});







module.exports = app;
