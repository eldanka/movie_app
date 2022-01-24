import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieDetails } from '../actions/movieActions'
import styled from 'styled-components/macro'
import { ReactComponent as Loader } from '../assets/spiner-color.svg'
import ReactStars from 'react-stars'
import axios from 'axios';
import { Button } from '../styles/buttons'

export default function MovieDetails({ match }){
    const [rating, setRating] = useState();
    const dispatch = useDispatch()
    const { userAuth } = useSelector((state) => state.userLogin)
    const { loading, error, movie } = useSelector((state) => state.movieDetails)
    const [loginModal, setLoginModal] = useState(false)

    const test = useSelector(state => state)
    useEffect(() => {
        dispatch(getMovieDetails(match.params.id)) 
    }, [dispatch, match])

    
    const rateMovie = (newRating) => {
      if(userAuth){
        setRating(newRating)
        const id = movie._id
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userAuth.token}`,
          },
        }
    
        axios.post(`/api/movies/${movie._id}/rating`,
          {newRating, id},
          config
        )
      }else {
        setLoginModal(true)
      }
    }

    return (
        <>
        {loading || error ? (
            <Loader />
        ) : (
        <MainContainer key={movie._id}>
          <Modal show={loginModal}>
            <Container>
              <Button style={{float: 'right' , width: '40px', height: '40px'}} onClick={() => setLoginModal(false)}>X</Button>
              <h1 style={{ textAlign: 'center'}}>Login first</h1>
              <p style={{ fontWeight: 'bolder', textAlign: 'center'}}>You must login to rate the movie!</p>
            </Container>
          </Modal>
          <HeaderContainer>
              <TitleContainer>
                <ItemTitle>{movie.title}</ItemTitle>
              </TitleContainer>           
          </HeaderContainer>               
          <DetailsGrid>
            <DetailsLeft>
            <ImageContainer>
            <Image src={movie.cover} alt='recipe' />
          </ImageContainer>
          <div style={{ display: 'flex'}}>
          <p style={{ fontSize: '20px', fontWeight: 'bolder', margin: 'auto 12px auto 12px'}}>Rate:</p>
          <ReactStars 
                name="rating" 
                value={rating}
                starCount={5}
                onStarHover={(nextValue, prevValue, name) => {
                  setRating(nextValue);
                }}
                onStarHoverOut={(nextValue, prevValue, name) => {
                  setRating(0);
                }}
                onChange={rateMovie}
                size={30}
                color1='white'
              />
            </div>
            </DetailsLeft>
            <DetailsRight>
            <DescritpionWraper>
                <TitleWraper>Description:</TitleWraper>
                <ContentWraper>{movie.description}</ContentWraper>
            </DescritpionWraper>
              <TitleWraper>Cast:</TitleWraper>
              {movie.cast.map((actor, key) => {
                  return (
                    <ContentWraper key={key}>{actor}</ContentWraper>
                  )
              })}
            </DetailsRight>
          </DetailsGrid>
        </MainContainer>
      )}
    </>
    );
}

const MainContainer = styled.div`
  margin: auto;
  margin-top: 3rem;
  padding: 0 2rem;
  max-width: 40%;
  display: flex;
  flex-direction: column;
  border: 10px solid #f2c226;
  border-radius: 20px;
  @media (max-width: 830px) {
    max-width: 80%;
  }
`
const HeaderContainer = styled.div`
  display: flex;
  margin: 20px;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`

const ItemTitle = styled.h1`
  font-weight: 700;
  margin: 0;
  padding-right: 0.5rem;
  text-align: center;
`

const ImageContainer = styled.div`
  width: 100%;
`
const Image = styled.img`
  width: 100%;
  max-height: 500px;
  max-width: 250px;
  border-radius: 0.5rem;
`
const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(auto, 500px));
  column-gap: 1rem;
  row-gap: 2rem;
  justify-items: center;
  align-items: center;
  padding-bottom: 2rem;
  @media (max-width: 830px) {
    grid-template-columns: 1fr;
    grid-template-columns: repeat(2, minmax(auto, 400px));
  }
  @media (max-width: 420px) {
    grid-template-columns: 1fr;
    grid-template-columns: repeat(1, minmax(auto, 375px));
  }
`
const DetailsLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const TitleWraper = styled.p`
  font-weight: 700;
  margin: 2px;
  font-size: 1.2rem;
`

const ContentWraper = styled.p`
  font-size: 1rem;
`

const DescritpionWraper = styled.div``

const DetailsRight = styled.div`
  display: flex;
  flex-direction: column;
  margin
  padding-top: 5rem;
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  @media (max-width: 800px) {
    padding-top: 0;
  }
`
const Modal = styled.div`
	z-index: 1;
	display: ${({show}) => (show ? 'block' : 'none')};
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width:100vw;
	background: rgba(0,0,0,0.5);
`

const Container = styled.div`
	position:absolute;
	background: gray;
	width: 33%;
	height: auto;
	border-radius: 10px;
	padding: 0.75rem;
	color: black;
  font-wight: 700;
  border: 5px solid #f2c226;
  width: 250px;
  height: 150px;
  left: 50%;
  top: 50%;
  transform: translate( -50%, -50%);
`