// Move all imports to the top
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

if (typeof window !== 'undefined') {
  const resizeObserverLoopErrRe = /^ResizeObserver loop limit exceeded/;

  const oldHandler = window.onerror;
  window.onerror = function (message, source, lineno, colno, error) {
    if (message.match(resizeObserverLoopErrRe)) {
      return true; // Prevent error from being reported
    }
    if (oldHandler) {
      return oldHandler(message, source, lineno, colno, error);
    }
    return false;
  };

  // Patch ResizeObserver to use a try-catch
  const originalResizeObserver = ResizeObserver;
  window.ResizeObserver = function (callback) {
    return new originalResizeObserver((entries) => {
      try {
        callback(entries);
      } catch (e) {
        console.error("ResizeObserver error:", e);
      }
    });
  };
}

// Extend the default theme to enable dark mode
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

ReactDOM.render(
  <React.StrictMode>
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Router>
    <App />
    </Router>
  </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
