const router = require("express").Router();
const controller = require("./reviews.controller");
const cors = require("cors");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.use(cors());

router
    .route("/:reviewId")
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

module.exports = router;