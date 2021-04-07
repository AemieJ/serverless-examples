const mongoose = require("mongoose");
const { Student } = require("../models/index");

const Router = require('claudiaexpress').Router;
const api = Router();

const uri = process.env.DB_CONNECT

api.post("/add", async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const student = new Student({
        name, email, password
    });

    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    const checkUserExists = await Student.findOne({ email });
    let response;
    if (!checkUserExists) {
        try {
            await student.save();
            response = {
                statusCode: 200, 
                body: {
                    name, email
                }
            };
        } catch(err) {
            response = {
                statusCode: 500,
                body: "Internal server error"
            };
        }
    } else {
        response = {
            statusCode: 403,
            body: "Email exists in database"
        };
    }

    res.end({
        name, 
        email
    });
});

module.exports = api;