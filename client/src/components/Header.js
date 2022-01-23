import React, { useEffect} from 'react';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin, logout } from '../actions/userActions'
import Logo from './Logo';
import { Button } from '../styles/buttons'
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

export default function Header() {
    const dispatch = useDispatch()
    const { userAuth } = useSelector((state) => state.userLogin)
    const { googleAuth }  = useSelector((state) => state.googleLogin)
    const handleLogout = () => {
        dispatch(logout())
    }

    const onSuccess = (res) => {
      dispatch(googleLogin(res))
    } 

    useEffect(() => {
      if(googleAuth) { window.location.replace('http://localhost:3000/')}
    }, [googleAuth])

    return (
        <HeaderDiv>
            <Navbar>
              <Logo />
              {!userAuth ? 
                (
                  <div style={{ float: 'right'}}>
                  <GoogleLogin 
                    clientId={process.env.clientId}
                    buttonText='Login with Google'
                    onSuccess={(response) => onSuccess(response)}
                  />
                  <Button as={Link} to='/login'>
                    Sign in
                  </Button>
                  <Button as={Link} to='/register'>
                    Sign up
                  </Button>
                  </div>
                )
                :
                (
                <Button onClick={handleLogout}>
                    Log out
                </Button>
                )
              }      
            </Navbar>
        </HeaderDiv>
    );
}

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 80px;
  @media (max-width: 400px) {
    height: 150px;
  }
`

const Navbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  @media (max-width: 400px) {
    flex-direction: column;
  }
`
