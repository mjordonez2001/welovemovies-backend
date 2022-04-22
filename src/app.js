if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const moviesRouter = require("./routes/movies/movies.router");

app.use("/movies", moviesRouter);

// not-found handler
app.use((request, response, next) => {
    next({
        status: 404,
        error: `The route ${request.path} does not exist!`
    });
});

// error handler
app.use((error, request, response, next) => {
    const { status = 500, message = "Something went wrong!" } = error;
    response.status(status).json({ error: message });
});

module.exports = app;
