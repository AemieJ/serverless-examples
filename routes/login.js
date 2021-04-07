const mongoose = require("mongoose");
const crypto = require('crypto');

const { User } = require("../models/index");
const { loginValidation } = require("../validations/index");
const createToken = require("../utils/token.util");

const Router = require('claudiaexpress').Router;
const api = Router();

const uri = process.env.DB_CONNECT

api.post("/login", async(req, res, next) => {
    let { email, password } = req.body;

    let { error } = loginValidation(req.body);
    let response = {};

    let fetchDB = true;
    if (error) {
        fetchDB = false;
        response = {
            statusCode: 400, 
            body: error.details[0].message
        };
    }

    if (fetchDB) {
        let errorExists = false;
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const user = await User.findOne({ email });
        if (!user) {
            errorExists = true;
            response = {
                statusCode: 400,
                body: "Invalid email"
            };
        }

        const hashPass = crypto.createHash('sha256').update(password).digest('base64');
        const checkPass = (hashPass === user.password);
        if (!checkPass) {
            errorExists = true;
            response = {
                statusCode: 400,
                body: "Invalid password"
            };
        }

        if (!errorExists) {
            let token = createToken(user);
    
            const refreshToken = token.refreshToken.token;
            try {
                await User.findOneAndUpdate({ email: user.email }, { refreshToken }, { 
                    new: true,
                    useFindAndModify: false });
                response = {
                    statusCode: 200, 
                    body: token
                };
            } catch (err) {
                response = {
                    statusCode: 500,
                    body: "Internal server error"
                };
            }
        }
    }

    res.end(response);
});

module.exports = api;