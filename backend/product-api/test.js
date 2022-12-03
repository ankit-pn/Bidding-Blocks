app.post("/addProduct", async (request, response) => {

    const productId = request.body.productId;
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



    Products.findOneAndUpdate({ auctionId: auctionId }, { $push: { "productIds": productId } }).then(
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
            })) //
         } )