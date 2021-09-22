import React, { useEffect, useState } from "react";
import { getReviews } from "../../services/fetchApi";

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      const { results } = await getReviews(movieId);

      setReviews(results);
    };

    getCast();
  }, [movieId]);

  if (reviews) {
    return (
      <div className="reviewsContainer">
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h3>Author: {author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      <div className="reviewsContainer">
        We don't have any reviews for this movie
      </div>
    </>
  );
};

export default MovieReviews;
