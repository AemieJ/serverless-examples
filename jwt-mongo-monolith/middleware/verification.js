const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index");

const uri = process.env.DB_CONNECT

const verification = async (req) => {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const currentTimeSinceEpoch = Math.floor(new Date().getTime() / 1000);

    const token = req.headers['auth-token'];
    if (!token) return {
        statusCode: 403,
        body: "Access Denied"
    };

    const check = jwt.decode(token);
    if (!check) return {
        statusCode: 403, 
        body: "Invalid token"
    };

    const accessTokenExpires = check.exp;
    const user = await User.findOne({ email: check.email });
    
    const refreshPayload = jwt.decode(user.refreshToken);
    if (!refreshPayload) return {
        statusCode: 403,
        body: "User not logged in"
    }

    if (currentTimeSinceEpoch > refreshPayload.exp)
        return {
            statusCode: 403,
            body: "Refresh token is expired. User must re-login"
        };
    
    if (!user.isLogged) {
        return {
            statusCode: 403,
            body: "User not logged in. Log in to access the page"
        };
    }

    // refreshing the access token with the help of refresh token
    if (currentTimeSinceEpoch > accessTokenExpires && user.isLogged) {
        if (currentTimeSinceEpoch <= refreshPayload.exp) {
            const accessToken = jwt.sign({_id: check._id, email: check.email }, process.env.TOKEN_SECRET, {expiresIn: "5m"});
            const token = {
                accessToken: {
                    token: accessToken, 
                    expires: Math.floor(new Date(new Date().getTime() + 5*60000).getTime() / 1000)
                },
            };
            return {
                statusCode: 201, 
                body: token
            };
        } else {
            return {
                statusCode: 403,
                body: "Refresh token is expired. User must re-login"
            };
        }
    } else if (currentTimeSinceEpoch <= accessTokenExpires && user.isLogged) {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!payload) return {
            statusCode: 403, 
            body: "Invalid token"
        };

        return {
            statusCode: 200, 
            body: payload
        };
    } 
};

module.exports = verification;