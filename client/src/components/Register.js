import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import { ReactComponent as Loader } from '../assets/spiner-color.svg'
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

export default function Register({ history }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const { loading, error } = useSelector((state) => state.userRegister)

  const { userAuth } = useSelector((state) => state.userLogin)

  useEffect(() => {
    if (userAuth) {
      history.push('/')
    }
  }, [history, userAuth])

  function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      setMessage(null)
      dispatch(register(username, email, password))
    }
  }

  return (
    <MainContainer>
        <div style={{ marginRight: 'auto', marginLeft: 'auto', margiTop: '50px'}}>
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={handleSubmit}>
              <Heading>Sign up to Movie App</Heading>
              <Label>Username</Label>
              <Input
                white
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Label>Email Address</Label>
              <Input
                white
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Label>Password</Label>
              <Input
                white
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Label>Confirm Password</Label>
              <Input
                white
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Wraper>
                {error && <Message>{error}</Message>}
                {message && <Message>{message}</Message>}
                <Button>Create Account</Button>
                <StyledParagraph>
                  Already a member? <StyledLink to='/login'>Log in</StyledLink>
                </StyledParagraph>
              </Wraper>
            </Form>
          )}
          </div>
    </MainContainer>
  )
}