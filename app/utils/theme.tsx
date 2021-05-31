import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

export const Shadows = {
  bottom: '0 6px 8px rgba(0, 0, 0, 0.05)',
  1: '0px 2px 2px -3px rgba(0,0,0,0.02), 0px 8px 8px -1px rgba(0,0,0,0.05), 0px 2px 8px 2px rgba(0,0,0,0.02)',
  2: '0px 5px 5px -3px rgba(0,0,0,0.02),0px 12px 12px -1px rgba(0,0,0,0.05),0px 3px 12px 2px rgba(0,0,0,0.02)',
};

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#563727',
    },
    secondary: {
      main: '#d59745',
    },
    text: {
      primary: '#545a68',
      secondary: '#888c8e',
    },
  },
  typography: {
    fontFamily: '"Open Sans"',
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
      lineHeight: 1.25,
      margin: '3rem 0 2rem',
      '@media (max-width:600px)': {
        fontSize: '2.25rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.5,
      margin: '1rem 0',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.25,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 300,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '.9rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
      opacity: 0.6,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        fontWeight: 600,
      },
      contained: {
        backgroundColor: '#fff',
        boxShadow: Shadows[1],
      },
      outlinedSizeSmall: {
        fontSize: '.7rem',
      },
    },
    MuiMenu: {
      paper: {
        backgroundColor: '#f7f7f7',
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: Shadows[2],
      },
      elevation4: {
        boxShadow: Shadows[2],
      },
    },
    MuiAvatar: {
      colorDefault: {
        backgroundColor: '#e0e0e0',
        color: 'rgba(0, 0, 0, 0.87)',
      },
    },
    // @ts-ignore
    MuiSkeleton: { root: { borderRadius: '4px' } },
    MuiAppBar: { root: { boxShadow: 'none' } },
    MuiContainer: { root: { paddingTop: '2rem', paddingBottom: '2rem' } },
    MuiFormHelperText: { root: { opacity: 1 } },
  },
});

export default responsiveFontSizes(theme);
