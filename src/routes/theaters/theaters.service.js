const knex = require("../../db/connection");

// function that attaches all movies to the given theater object
async function addMovies(theater, theaterId) {
	theater.movies =  await knex("movies_theaters as mt")
        .join("movies as m", "m.movie_id", "mt.movie_id")
		.select("m.*")
		.where({ "mt.theater_id": theaterId })
	return theater;
}

// knex query that lists all theaters
// uses the addMovies function to attach a movies array to each theater object
async function list() {
	return knex("theaters")
		.select("*")
		.then((theaters) => {
			return Promise.all(
				theaters.map((theater) => {
					return addMovies(theater, theater.theater_id)
				})
			)
	})
}

module.exports = {
    list
}

