import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

export default function Logo() {
  return (
    <LogoLink to="/">
      <LogoText>Movie App</LogoText>
    </LogoLink>
  );
}

const LogoLink = styled(Link)`
  text-decoration: none;
  background: #f2c226;
  padding: 0px 28px 0px 28px;
  border-radius: 20px
`;

const LogoText = styled.h1`
  font-family: "Pacifico", cursive;
  font-size: 1.7rem;
  font-weight: 900;
  color: black;
`;