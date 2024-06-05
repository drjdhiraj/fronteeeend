import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // This sets the theme to dark mode
    primary: {
      main: '#CAD5E2', // Customize the primary color to your preference
    },
    secondary: {
      main: '#5A20CB', // Customize the secondary color to your preference
    },
    background: {
      main: '#000000',
      default: '#0D0D0D',
      paper: '#0D0D0D',
      alt: '#333333', // Additional color option
    },
    verifyButton: {
      main: '#4CAF50', // Customize the verify button color
    },
    textColor: {
      main: '#111111',
      secondary: '#AAAAAA', // Additional color option
    },
  },
});

export default darkTheme;