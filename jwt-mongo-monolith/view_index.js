const APIBuilder = require("claudia-api-builder");
const api = new APIBuilder();

const Router = require('claudiaexpress').Router;
const router = Router(api);

const { lists } = require("./routes/index");

router.use("/list", lists);

module.exports = router.bootstrap();

