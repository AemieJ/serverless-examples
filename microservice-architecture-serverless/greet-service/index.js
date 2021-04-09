const express = require("express");
const app = express();

app.use(express.json());

app.get("/user/entry/:name", (req, res) => {
    const name = req.params.name;
    let response = {
        statusCode: 200, 
        body: `Hello, ${name}!`
    };

    res.send(response);
});

app.get("/user/exit/:name", (req, res) => {
    const name = req.params.name;
    let response = {
        statusCode: 200, 
        body: `Bye, ${name}!`
    };

    res.send(response);
});

module.exports = app;

