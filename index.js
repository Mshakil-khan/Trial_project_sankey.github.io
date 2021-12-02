const express = require("express");
const Connectdb = require("./config/database");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const user = require("./routes/userRouter");
const teacher = require("./routes/teacherRouter")
const student = require("./routes/studentRouter")




Connectdb();

const app = express();

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/user", user);
app.use("/teacher", teacher);
app.use("/student", student);



app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
});