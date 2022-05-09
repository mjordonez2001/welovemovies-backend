const service = require("./reviews.service");
const asyncError = require("../errors/asyncErrorBoundary");
const res = require("express/lib/response");

// update function that updates the given review with the request body
async function update(request, response, next) {
    const updateData = request.body.data;
    const reviewId = request.params.reviewId;

    const updatedReview = {
        ...response.locals.review,
        ...updateData,
        review_id: reviewId
    }

    await service.update(updatedReview);
    const data = await service.readUpdate(reviewId)
    
    response.json({ data: data })
}

// destroy function that delets the review from the given reviewId
async function destroy(request, response, next) {
    const reviewId = request.params.reviewId;
    await service.destroy(reviewId)
    response.sendStatus(204);
}

// ----------------------- middleware ----------------------- //

// middleware function that validates that the given reviewId is valid
async function reviewExists(request, response, next) {
    const data = await service.read(request.params.reviewId);
    if (data) {
        response.locals.review = data;
        return next();
    }
    next({
        status: 404,
        message: `Review cannot be found.`
    });
}


module.exports = {
    update: [asyncError(reviewExists), asyncError(update)],
    delete: [asyncError(reviewExists), asyncError(destroy)]
}