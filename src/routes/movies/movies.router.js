const router = require("express").Router();
const controller = require("./movies.controller");
const cors = require("cors");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.use(cors());

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

router
    .route("/:movieId/theaters")
    .get(controller.readTheaters)
    .all(methodNotAllowed);

router
    .route("/:movieId/reviews")
    .get(controller.readReviews)
    .all(methodNotAllowed);

module.exports = router;