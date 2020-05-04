const Movie = require("../models/movie");

createMovie = (request, response) => {
  const { body } = request;

  if (!body) {
    return response.status(400).json({
      success: false,
      error: "No movie provided"
    });
  }

  const movie = new Movie(body);
  console.log(movie);

  if (!movie) {
    return response.status(400).json({ success: false, error });
  }

  movie
    .save()
    .then(() => {
      return response.status(201).json({
        success: true,
        id: movie._id,
        message: "Movie created"
      });
    })
    .catch(error => {
      return response.status(400).json({
        error,
        message: "Not created"
      });
    });
};

updateMovie = async (request, response) => {
  const { body } = request;

  if (!body) {
    return response.status(400).json({
      success: false,
      error: "provide movie to update"
    });
  }

  Movie.findOne({ id: request.params.id }, (error, movie) => {
    if (err) {
      return response.status(404).json({
        error,
        message: "not found"
      });
    }

    movie.name = body.name;
    movie.time = body.time;
    movie.rating = body.rating;

    movie
      .save()
      .then(() => {
        return response.status(200).json({
          success: true,
          id: movie._id,
          message: "movie updated"
        });
      })
      .catch(error => {
        return response.status(404).json({ error, message: "not updated" });
      });
  });
};

deleteMovie = async (request, response) => {
  await Movie.findOneAndDelete({ _id: request.params.id }, (error, movie) => {
    if (error) {
      return request.status(400).json({ success: false, error });
    }

    if (!movie) {
      return response
        .status(404)
        .json({ success: false, message: "movie not found" });
    }

    return response.status(200).json({ success: true, data: movie });
  }).catch(error => {
    console.log(error);
  });
};

getMovieById = async (request, response) => {
  await Movie.findOne({ _id: request.params.id }, (error, movie) => {
    if (error) {
      return request.status(400).json({ success: false, error });
    }

    if (!movie) {
      return response
        .status(404)
        .json({ success: false, message: "movie not found" });
    }

    return response.status(200).json({ success: true, data: movie });
  }).catch(error => {
    console.log(error);
  });
};

getMovies = async (request, response) => {
  await Movie.find({}, (err, movies) => {
    if (err) {
      return res.status(400).json({ success: false, error });
    }
    if (!movies.length) {
      return response
        .status(404)
        .json({ success: false, error: "no movies lol" });
    }

    return response.status(200).json({ success: true, data: movies });
  }).catch(error => console.log(error));
};

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
  getMovies
};
