const User = require("../model/User");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Student = require("../model/Student");
const nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
const Teacher = require("../model/Teacher");
const jwt = require("jsonwebtoken");
require("dotenv").config();

var transporter = nodemailer.createTransport(
    smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {

            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS

        }
    })

)

router.post("/signup", async (req, res) => {

    const { firstName,
        lastName,
        email,
        password,
        phone,
        className,
        section,
        role, } = req.body;
    console.log(req.body);

    try {
        let user = await User.findOne({
            email,
        });


        if (user) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        user = new User({
            firstName, lastName, email, password, phone, role, className, section,
        });
        user.password = await bcrypt.hash(password, 10);

        const userSave = await user.save();

        switch (role) {
            case "student":
                try {
                    student = new Student({
                        info: userSave._id,
                        attemptedTests: []
                    });

                    await student.save();

                } catch (error) {
                    console.log(error.message)

                    return res.status(500).send("Student error during saving")
                }

                break;

            case "teacher":
                try {
                    teacher = new Teacher({
                        info: userSave._id,
                        assignTests: []
                    });

                    await teacher.save();

                } catch (error) {
                    console.log(error.message)
                    return res.status(500).send("Teacher error during saving")
                }
                break;

            default:
                console.log("200");


        }


        const payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(
            payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
                if (err) {
                    return err
                }
                res.status(200).json({
                    token,
                    user
                })
            }
        )


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error during saving");
    }
})




router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        let user = await User.findOne({
            email
        })
        if (!user) {
            return res.status(400).json({
                message: "user not exist"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect credential !"
            })
        }


        const payload = {
            user,
        }


        switch (user.role) {
            case "student":
                let studentdata = await Student.findOne({
                    info: user._id,
                })
                const studentinfoid = studentdata._id;
                payload.profileid = studentinfoid;
                break;

            case "teacher":
                let teacherdata = await Teacher.findOne({
                    info: user._id,
                })
                const teacherinfoid = teacherdata._id;
                payload.profileid = teacherinfoid;
                break;

            default:
                console.log("200");

        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: "3h",
                //3 hrs
            },
            (err, token) => {
                console.log(token)

                if (err) {
                    return error.message
                }
                if (!user.isVerified) {
                    console.log(token)

                    const url = `http://localhost:5000/user/confirm/${token}`;
                    transporter.sendMail(
                        {
                            to: user.email,
                            subject: "Confirm Email",
                            html: `<head>
                    <title></title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

                </head>
                
                <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
                    <!-- HIDDEN PREHEADER TEXT -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                            <table border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href=${url} target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Confirm Account</a></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                </body>`,
                        },
                        function (error, info) {
                            if (error) {
                                console.log(error.message);
                            } else {
                                console.log("Email sent: " + info.response);
                            }
                        }
                    );
                }
                res.status(200).json({
                    payload,
                    token,
                })
            })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error during save");
    }
})

router.get("/confirm/:token", async (req, res) => {
    const token = req.params.token;
    console.log(token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        req.user = decoded.user;
        const resul = await User.updateOne({ _id: req.user._id }, { isVerified: true })
        if (resul) {
            console.log(resul);
            res.status(200).send({ message: "success" })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ message: "verification failed" });
    }

})




module.exports = router;
