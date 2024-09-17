// src/theme.js
import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light', // Default mode
  useSystemColorMode: false, // Disable system color mode preference
};

const theme = extendTheme({ config });

export default theme;
