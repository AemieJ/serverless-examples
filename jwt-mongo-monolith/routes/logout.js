const mongoose = require("mongoose");
const { User } = require("../models/index");

const { verification } = require("../middleware/index");

const Router = require('claudiaexpress').Router;
const api = Router();

const uri = process.env.DB_CONNECT

api.post("/logout", async(req, res, next) => {
    let { email } = req.body;
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const user = await User.findOne({ email });
    const isLogged = false;
    let response = {};
    response = await verification(req);

    if (response.statusCode !== 403) {
        try {
            await User.findOneAndUpdate({ email: user.email }, { isLogged }, { 
                new: true,
                useFindAndModify: false });
            response = {
                statusCode: 200, 
                body: 'User has been logged out'
            };
        } catch (err) {
            response = {
                statusCode: 500,
                body: "Internal server error"
            };
        }
    }

    res.end(response);
});

module.exports = api;