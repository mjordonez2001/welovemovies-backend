const knex = require("../../db/connection");

async function addMovies(theater, theaterId) {
	theater.movies =  await knex("movies_theaters as mt")
        .join("movies as m", "m.movie_id", "mt.movie_id")
		.select("m.*")
		.where({ "mt.theater_id": theaterId })
	return theater;
}

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

