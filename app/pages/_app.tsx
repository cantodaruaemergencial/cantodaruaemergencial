import type { AppProps } from 'next/app';
import { SnackbarOrigin } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import AuthProvider from '#/packages/auth/auth-context';
import DefaultTheme, { globalStyles } from '#/utils/theme';
import 'moment/locale/pt-br';
import pt from 'date-fns/locale/pt-BR';
import { withStyles } from '@mui/styles';

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const snackbarConfig: SnackbarOrigin = {
    vertical: 'top',
    horizontal: 'right',
  };

  useEffect(() => {
    // Remove the server-side injected CSS.
    moment.locale('pt-br');

    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  const GlobalCss = withStyles(globalStyles)(() => null);

  return (
    <SnackbarProvider anchorOrigin={snackbarConfig}>
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pt}>
          <ThemeProvider theme={DefaultTheme}>
            <CssBaseline />
            <GlobalCss />
            <Component {...pageProps} />
          </ThemeProvider>
        </LocalizationProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
};

export default App;
