const APIBuilder = require("claudia-api-builder");
const api = new APIBuilder();

const Router = require('claudiaexpress').Router;
const router = Router(api);

const { lists, register, login, logout } = require("./routes/index");

router.use("/auth", register);
router.use("/auth", login);
router.use("/auth", logout);

router.use("/list", lists);

module.exports = router.bootstrap();

