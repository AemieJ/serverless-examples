const APIBuilder = require("claudia-api-builder");
const api = new APIBuilder();

const Router = require('claudiaexpress').Router;
const router = Router(api);

const { register, login } = require("./routes/index");

router.use("/auth", register);
router.use("/auth", login);

module.exports = router.bootstrap();

