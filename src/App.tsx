import {
  StylesProvider,
} from "@material-ui/core";
import { createBrowserHistory } from "history";
import React from "react";
import type { FC } from "react";
import { Router } from "react-router-dom";
import GlobalStyles from "src/components/GlobalStyles";
import { renderRoutes, routes } from "src/components/routes";
import { ThemeProvider } from "styled-components"
import { CUSTOM_THEME as theme } from "src/constants/theme"

const history = createBrowserHistory();

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider>
        <Router history={history}>
          <GlobalStyles />
          {renderRoutes(routes)}
        </Router>
      </StylesProvider>
    </ThemeProvider>

  )
};

export default App;
