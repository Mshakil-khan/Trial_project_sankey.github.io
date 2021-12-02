const express = require("express");
const router = express.Router();
const Test = require("../model/Test");
require("dotenv").config();


router.get("/tests/:studentClass", async (req, res) => {
    const studentClass = req.params.studentClass;

    try {
        const obj = await Test.find({
            className: studentClass,
        })
        if (obj) {
            console.log("fjgfdh")
            console.log(obj)
            return res.status(200).json({
                obj,
            });
        }


    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in fetching Test Data");
    }
});

module.exports = router