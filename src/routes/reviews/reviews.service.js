const knex = require("../../db/connection");

async function addCritic(review, criticId) {
    review.critic = await knex("critics")
        .select("*")
        .where({ critic_id: criticId })
        .first();
    return review;
}

function update(updatedReview) {
    return knex("reviews")
        .where({ "review_id": updatedReview.review_id })
        .update(updatedReview, "*");
}

function readUpdate(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .first()
        .then((review) => {
            return addCritic(review, review.critic_id)
        })
}

function read(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ "review_id": reviewId })
        .first();
}

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