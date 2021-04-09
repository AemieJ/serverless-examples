const APIBuilder = require("claudia-api-builder");
const api = new APIBuilder();

const Router = require('claudiaexpress').Router;
const router = Router(api);

const { lists, register, login } = require("./routes/index");

router.use("/list", lists);
router.use("/auth", register);
router.use("/auth", login);

module.exports = router.bootstrap();

