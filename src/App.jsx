import React from 'react';
import { ThemeProvider } from 'styled-components';

import { main } from './config/themes/';
import Routes from './router/routes';
import { AuthProvider } from './hooks/useAuth';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={main}>
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
