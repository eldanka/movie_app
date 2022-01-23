import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { ReactComponent as Loader } from '../assets/spiner-white.svg'
import { Button } from '../styles/buttons'
import {
  MainContainer,
  LeftContainer,
  RightContainer,
  ContentContainer,
  LogoContainer,
  LogoLink,
  Image,
  Form,
  Heading,
  Input,
  Label,
  Wraper,
  Message,
  StyledLink,
  StyledParagraph,
} from '../styles/userForms'

export default function Login({ history }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const { loading, error, userAuth } = useSelector((state) => state.userLogin)

  useEffect(() => {
    if (userAuth) {
      history.push('/')
    }
  }, [history, userAuth])

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <MainContainer>
        <div style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '50px'}}>
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={handleSubmit}>
              <Heading>Log in to Movie App</Heading>
              <Label>Email</Label>
              <Input
                white
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Label>Email</Label>
              <Input
                white
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Wraper>
                {error && <Message>{error}</Message>}
                <Button>Log In</Button>
                <StyledParagraph>
                  Need an account?{' '}
                  <StyledLink to='/register'>Sign Up</StyledLink>
                </StyledParagraph>
              </Wraper>
            </Form>
          )}
        </div>
    </MainContainer>
  )
}