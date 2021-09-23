import React, { useEffect, useState } from "react";
import { getReviews } from "../../services/fetchApi";
import s from "./MovieReviews.module.css";

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
      <div>
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id} className={s.reviewItem}>
              <h3>Author: {author}</h3>
              <p className={s.reviewText}>{content}</p>
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
