const knex = require("../../db/connection");

// function that adds critic object to the given review
async function addCritic(review, criticId) {
    review.critic = await knex("critics")
        .select("*")
        .where({ critic_id: criticId })
        .first();
    return review;
}

// update function that updates review with the given review updates
function update(updatedReview) {
    return knex("reviews")
        .where({ "review_id": updatedReview.review_id })
        .update(updatedReview, "*");
}

// knex query that returns the review from the given reviewId
// uses the addCritic function to attach the critic object to the review
async function readUpdate(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .first()
        .then((review) => {
            return addCritic(review, review.critic_id)
        })
}

// knex query that returns the review from the given reviewId
function read(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ "review_id": reviewId })
        .first();
}

// destroy function that deletes the review from the given reviewId
function destroy(reviewId) {
    return knex("reviews")
        .where({ "review_id": reviewId })
        .del();
}

module.exports = {
    update,
    read,
    readUpdate,
    destroy
}