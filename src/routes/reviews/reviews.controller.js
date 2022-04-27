const service = require("./reviews.service");
const asyncError = require("../errors/asyncErrorBoundary");
const res = require("express/lib/response");

async function update(request, response, next) {
    const updateData = request.body.data;
    console.log(updateData)

    const updatedReview = {
        ...updateData,
        review_id: request.params.reviewId
    }
    const data = await service.update(updatedReview);
    
    response.json({ data: data })
}

async function destroy(request, response, next) {
    const reviewId = request.params.reviewId;
    await service.destroy(reviewId)
    response.sendStatus(204);
}

// ----------------------- middleware ----------------------- //

async function reviewExists(request, response, next) {
    const data = await service.read(request.params.reviewId);
    if (data) return next();

    next({
        status: 404,
        message: `Review cannot be found.`
    });
}


module.exports = {
    update: [asyncError(reviewExists), asyncError(update)],
    delete: [asyncError(reviewExists), asyncError(destroy)]
}