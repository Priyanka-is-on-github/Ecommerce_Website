const express = require("express")
const router = express.Router();

router.get("/getallproducts", async (req, res) => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");

        const responseData = await response.json();
        console.log(responseData);
        res.status(200).json(responseData)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

module.exports = router

