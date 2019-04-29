import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Voter from "./Voter";

const App = () => {
  return (
    <StyledApp>
      <GlobalStyle />
      <Voter />
    </StyledApp>
  );
};



const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }
`

const StyledApp = styled.div`
  height: 100%;
`;

export default App;
