const express = require("express");
const router = express.Router();
const Test = require("../model/Test");
require("dotenv").config();



router.post("/create-test", async (req, res) => {
    console.log(req.body)
    const {
        teacherId,
        testName,
        category,
        minutes,

        className,
        outOfMarks,
        answers,
        questions,
    } = req.body;
    console.log(questions, answers);
    try {
        let createTest = await Test.findOne({
            testName,
            className,
            category,
        });
        if (createTest) {
            return res.status(400).json({
                msg: "Test Already Created",
            });
        }

        createTest = new Test({
            teacherId,
            testName,
            category,
            answers,
            minutes,
            className,

            outOfMarks,
            questions,
        });

        let data = await createTest.save();

        const payload = {
            data,
        };

        res.status(200).json({
            payload,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
});





module.exports = router;














