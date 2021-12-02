require("dotenv").config()
const mongoose = require("mongoose");




const url = process.env.DB_URL;

const Connectdb = async () => {
    try {
        const res = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected Databse ", res.connection.host);

    }
    catch (e) {
        console.log(e.message);
    }
}

module.exports = Connectdb;

