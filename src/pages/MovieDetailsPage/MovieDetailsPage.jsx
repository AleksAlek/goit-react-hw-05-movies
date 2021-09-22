import React, { useEffect, useState } from "react";
import {
  Route,
  Link,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { getMovieDetails } from "../../services/fetchApi";
import { getIdFromSlug } from "../../services/slug";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);

  const location = useLocation();
  const history = useHistory();
  const { slug } = useParams();
  const { url } = useRouteMatch();

  const movieId = getIdFromSlug(slug);

  useEffect(() => {
    const getMovie = async () => {
      const currentMovie = await getMovieDetails(movieId);

      setMovie(currentMovie);
    };

    getMovie();
  }, [movieId]);

  const handleGoBack = () => {
    history.push(location?.state?.from?.location ?? "/movies");
  };

  return (
    <>
      {movie && (
        <>
          <button type="button" onClick={handleGoBack}>
            {location?.state?.from?.label ?? "Find another movie"}
          </button>

          <div className="movieCard">
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
            </div>

            <div>
              <h2>
                {movie.title} ({movie.release_date.slice(0, 4)})
              </h2>
              <p>User score: {movie.vote_average}</p>

              <h3>Overview</h3>
              <p>{movie.overview}</p>

              <h3>Genres</h3>
              <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
            </div>
          </div>

          <div className="additionalInfo">
            <ul>
              Additional Information
              <li>
                <Link to={{ pathname: `${url}/cast`, state: location.state }}>
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={{ pathname: `${url}/reviews`, state: location.state }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          <Route path={`${url}/cast`}>
            <MovieCast movieId={movieId} />
          </Route>

          <Route path={`${url}/reviews`}>
            <MovieReviews movieId={movieId} />
          </Route>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;

// location?.state?.from?.location

// parentPage={location.state}
