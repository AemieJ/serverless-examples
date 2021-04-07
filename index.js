const APIBuilder = require("claudia-api-builder");
const api = new APIBuilder();

const Router = require('claudiaexpress').Router;
const router = Router(api);

const { lists, students } = require("./routes/index");

router.use("/list", lists);
router.use("/student", students);

module.exports = router.bootstrap();

