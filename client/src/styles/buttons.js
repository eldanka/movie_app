import styled from 'styled-components/macro'

export const Button = styled.button`
  font-weight: 700;
  border: none;
  border-radius: 0.5em;
  font-size: 1rem;
  cursor: pointer;
  text-transform: capitalize;
  background: ${(props) => props.theme.gold};
  padding: 0.6em 1em;
  margin: 0.3rem;
  color: ${(props) => props.theme.black};
  text-align: center;
  text-decoration: none;
  outline: none;
  @media (max-width: 600px) {
    padding: 0.4em 0.7em;
  }
  &:hover,
  &:focus {
    background: ${(props) => props.theme.primaryFaded};
    box-shadow: 0 0 6px 0 ${(props) => props.theme.primary};
  }
`
