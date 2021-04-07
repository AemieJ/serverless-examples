const jwt = require("jsonwebtoken");

const createToken = (user) => {
    const currentDate = new Date();
    const accessToken = jwt.sign({_id: user._id, email: user.email }, process.env.TOKEN_SECRET, {expiresIn: "20d"});
    const refreshToken = jwt.sign({_id: user._id, email: user.email }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "365d"});
    
    const token = {
        accessToken: {
            token: accessToken, 
            expires: Math.floor(new Date(currentDate.getTime() + 20*24*60*60000).getTime() / 1000)
        },
        refreshToken: {
            token: refreshToken,
            expires: Math.floor(new Date(currentDate.getTime() + 365*24*60*60000).getTime() / 1000)
        }
    }
    return token;
}

module.exports = createToken;