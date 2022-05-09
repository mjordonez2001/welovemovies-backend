const knex = require("../../db/connection");

// knex query that lists all movies in the movies table
function list() {
    return knex("movies")
        .select("*")
}

// knex query that lists all movies that have "is_showing" as true
function listMoviesShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .groupBy("m.movie_id")
        .where({ "mt.is_showing": true })
}

// knex query that returns the movie from the given movieId
function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ "movie_id": movieId })
        .first();
}

// knex query that lists all theaters where the given movie is playing 
function readTheaters(movieId) {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .select("t.*", "mt.is_showing", "mt.movie_id")
        .where({ "mt.movie_id": movieId })
}

// function that adds a critic object to the review 
async function addCritic(review, criticId) {
    review.critic = await knex("critics")
        .select("*")
        .where({ "critic_id": criticId })
        .first();
    return review;
}

// list function that returns all the reviews from the given movie
// uses the addCritic function to add critics to the reviews 
async function readReviews(movieId) {
    return knex("reviews as r")
        .select("*")
        .where({ "r.movie_id": movieId })
        .then((reviews) => {
            return Promise.all(
                reviews.map((review) => {
                    return addCritic(review, review.critic_id);
                })
            )
        });
}

module.exports = {
    list,
    listMoviesShowing,
    read,
    readTheaters,
    readReviews
}