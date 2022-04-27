const service = require("./movies.service");
const asyncError = require("../errors/asyncErrorBoundary");

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

async function read(request, response, next) {
    const { movie } = response.locals;
    response.json({ data: movie });
}

async function readTheaters(request, response, next) {
    const data = await service.readTheaters(request.params.movieId);
    response.json({ data: data });
}

async function readReviews(request, response, read) {
    const data = await service.readReviews(request.params.movieId);
    response.json({ data: data })
}

// ----------------------- middleware ----------------------- //

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