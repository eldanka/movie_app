import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";

export default function MovieCard({ movie }) {
  const [averageRating, setAverageRating] = useState();

  useEffect(() => {
    avrgRating();
  }, [movie]);

  const avrgRating = () => {
    if (movie) {
      if (movie.rating.length > 2) {
        const sumRatings = movie.rating
          .map((movie) => movie.rating)
          .reduce((prev, curr) => prev + curr, 0);
        setAverageRating(sumRatings / movie.rating.length);
      }
    }
  };

  return (
    <CardContainer>
      <Link to={`/movie/${movie._id}`}>
        <Image src={movie.cover} />
      </Link>
      <div style={{ marginLeft: '10px'}}>
      {averageRating > 0 && (
              <ReactStars
                style={{ leftMargin: '10px'}}
                count={5}
                value={averageRating}
                edit={false}
                half={true}
                color1="white"
              />
            )}
      </div>
      <DetailContainer>
        <UserContainer>
          <TitleDateContainer>
            <UserTitle>{movie.title}</UserTitle>
          </TitleDateContainer>
        </UserContainer>
      </DetailContainer>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  width: 210px;
  height: 400px;
  border: 10px solid #f2c226;
  border-radius: 20px;
`;
const Image = styled.img`
  width: 100%;
  height: 290px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 10px;
`;
const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TitleDateContainer = styled.div`
  margin-left: 0.5rem;
  display: flex;
  flex-direction: row;
`;

const UserTitle = styled.p`
  font-weight: 900;
  margin: 0.2rem 0;
  margin-right: 15px;
  text-align: center;
`;