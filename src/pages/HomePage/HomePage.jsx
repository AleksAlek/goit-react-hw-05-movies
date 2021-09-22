import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchTrendingMovies } from "../../services/fetchApi";
import { makeSlug } from "../../services/slug";

const Home = () => {
  const [movies, setMovies] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const getMovies = async () => {
      const { results } = await fetchTrendingMovies();

      setMovies(results);
    };

    getMovies();
  }, []);

  return (
    <div>
      <h2>Trending Today</h2>

      <ul className="moviesList">
        {movies.map(({ id, title }) => (
          <li className="moviesList__item" key={id}>
            <Link
              to={{
                pathname: `/movies/${makeSlug(`${title} ${id}`)}`,
                state: {
                  from: {
                    location,
                    label: "Back to Home",
                  },
                },
              }}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
