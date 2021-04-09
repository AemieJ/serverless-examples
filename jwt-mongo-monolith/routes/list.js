const MongoClient = require("mongodb").MongoClient;

const { verification } = require("../middleware/index");

const Router = require('claudiaexpress').Router;
const api = Router();

const uri = process.env.DB_CONNECT

api.get("/{category}", async (req, res, next) => {
    let response = {};

    response = await verification(req);
    if (response.statusCode !== 403) {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const category = decodeURI(req.pathParams.category);
        const collection = client.db("sample_mflix").collection(category);
        const movies = await collection.find({}).limit(20).toArray();

        response = {
            statusCode: 200,
            body: movies
        };
    }

    res.end(response);
});

module.exports = api;