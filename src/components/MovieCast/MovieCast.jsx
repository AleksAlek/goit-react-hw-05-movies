import React, { useEffect, useState } from "react";
import { getMovieCast } from "../../services/fetchApi";

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      const { cast } = await getMovieCast(movieId);

      setCast(cast);
    };

    getCast();
  }, [movieId]);

  return (
    <div className="castContainer">
      <ul className="castList">
        {cast &&
          cast.map(({ id, profile_path, original_name, character }) => (
            <li key={id}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w300${profile_path}`
                    : "https://lockru.ru/image/no_image.png"
                }
                alt={original_name}
              />
              <p>{original_name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MovieCast;
