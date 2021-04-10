const mongoose = require("mongoose");
const crypto = require('crypto');
const { User } = require("../models/index");
const { registerValidation } = require("../validations/index");

const Router = require('claudiaexpress').Router;
const api = Router();

const uri = process.env.DB_CONNECT

api.post("/register", async (req, res, next) => {
    let { name, email, password } = req.body;

    let { error } = registerValidation(req.body);
    let response = {};

    let insertInDB = true;
    if (error) {
        insertInDB = false;
        response = {
            statusCode: 400, 
            body: error.details[0].message
        };
    }
    
    if (insertInDB) {
        password = crypto.createHash('sha256').update(password).digest('base64');
        const user = new User({ name, email, password, isLogged: false });

        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const checkUserExists = await User.findOne({ email });
        if (!checkUserExists) {
            try {
                await user.save();
                response = {
                    statusCode: 200,
                    body: {
                        name, email
                    }
                };
            } catch (err) {
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
    }
    


    res.end(response);
});

module.exports = api;