const express = require("express");
const app = express();

app.use(express.json());

let lists = {
    'genres': ['horror', 'action', 'thriller', 'romance', 'harem'],
    'anime': ['kuroko no basket', 'mirai nikki', 'naruto', 'haikyuu', 'jujutsu kaisen'],
    'state': ['agra', 'gujarat', 'kerala', 'madhya pradesh']
}

app.get("/list/:category", (req, res) => {
    const category = req.params.category;
    let response;
    if (lists[category] !== undefined) {
        response = {
            statusCode: 200,
            body: lists[category]
        };
    } else {
        response = {
            statusCode: 400,
            body: 'Category doesn\'t exist'
        };
    }
    res.send(response);
});

module.exports = app;