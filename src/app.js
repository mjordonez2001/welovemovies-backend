import http from 'http';

if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const server = http.createServer(app);
const hostname = 'fanny.db.elephantsql.com';
const port = 3000;

const moviesRouter = require("./routes/movies/movies.router");
const reviewsRouter = require("./routes/reviews/reviews.router");
const theatersRouter = require("./routes/theaters/theaters.router");

app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

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

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

module.exports = app;
