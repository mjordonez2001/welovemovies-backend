const service = require("./movies.service");
const asyncError = require("../errors/asyncErrorBoundary");

// list function that lists all movies
// if the request has a is_showing query, it only returns movies that are currently showing
async function list(request, response, next) {
    const showing = request.query.is_showing;
    let data;

    if (showing) {
        data = await service.listMoviesShowing();
    } else {
        data = await service.list();
    }
    response.json({ data: data })
}

// read function that returns a movie from the given movieId
async function read(request, response, next) {
    const { movie } = response.locals;
    response.json({ data: movie });
}

// read function that returns all theaters where the movie (from the given movieId) is being played
async function readTheaters(request, response, next) {
    const data = await service.readTheaters(request.params.movieId);
    response.json({ data: data });
}

// read function that returns all the reviews from the movie (from the given movieId)
async function readReviews(request, response, read) {
    const data = await service.readReviews(request.params.movieId);
    response.json({ data: data })
}

// ----------------------- middleware ----------------------- //

// middleware function that validates that the given movieId is valid
async function movieExists(request, response, next) {
    const data = await service.read(request.params.movieId);
    if (data) {
        response.locals.movie = data;
        return next();
    }

    next({
        status: 404,
        message: `Movie cannot be found.`
    });
}

module.exports = {
    list: asyncError(list),
    read: [asyncError(movieExists), asyncError(read)],
    readTheaters: [asyncError(movieExists), asyncError(readTheaters)],
    readReviews: [asyncError(movieExists), asyncError(readReviews)]
}