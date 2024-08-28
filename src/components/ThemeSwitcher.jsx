import React, { useState } from "react";

import styled, { ThemeProvider } from "styled-components";

const lightTheme = {
  background: "#fff",
  color: "#000",
};

const darkTheme = {
  background: "#000",
  color: "#fff",
};

const themes = {
  Light: lightTheme,
  Dark: darkTheme,
};

const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
`;

export default function ThemeSwitcher({ render }) {
  const [theme, setTheme] = useState("Light");

  const themeColor = () => {
    setTheme((prevTheme) => (prevTheme == "Light" ? "Dark" : "Light"));
  };

  const switchedButtonStyle = {
    right: theme === "Light" ? "10px" : "90px",
  };
  const containerBorderStyle = {
    borderColor: theme === "Light" ? "black" : "white",
  };

  return (
    <div>
      <ThemeProvider theme={themes[theme]}>
        <Container>
          {render({
            theme,
            themeColor,
            switchedButtonStyle,
            containerBorderStyle,
          })}
        </Container>
      </ThemeProvider>
    </div>
  );
}
