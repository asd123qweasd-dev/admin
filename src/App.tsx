import React from 'react';
import store from '~/store'
import { theme } from '~/styles'
import { globalStyles } from '~/styles/global'
import { ThemeProvider } from '@emotion/react'
import { Provider } from 'react-redux'
import { Layouts } from '~/layouts'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {globalStyles()}
        <Layouts />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
