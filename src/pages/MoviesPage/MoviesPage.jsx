import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { searchMovies } from "../../services/fetchApi";
import { makeSlug } from "../../services/slug";

const Movies = () => {
  const [movieToFind, setMovieToFind] = useState("");
  const [foundMovies, setFoundMovies] = useState([]);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const searchString = new URLSearchParams(location.search).get("query");

    if (searchString) {
      const getMovies = async () => {
        const { results } = await searchMovies(searchString);

        setFoundMovies(results);
        setMovieToFind("");
      };

      getMovies();
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { results } = await searchMovies(movieToFind);

    setFoundMovies(results);
    setMovieToFind("");

    history.push({
      ...location,
      search: `query=${movieToFind}`,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={movieToFind}
          onChange={(e) => setMovieToFind(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      <ul>
        {foundMovies.map(({ id, title }) => (
          <li key={id}>
            <Link
              to={{
                pathname: `/movies/${makeSlug(`${title} ${id}`)}`,
                state: {
                  from: {
                    location,
                    label: "Back to Movies",
                  },
                },
              }}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Movies;
