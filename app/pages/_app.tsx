import MomentUtils from '@date-io/moment';
import { SnackbarOrigin } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';

import AuthProvider from '#/packages/auth/auth-context';
import DefaultTheme from '#/utils/theme';
import 'moment/locale/pt-br';

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

  return (
    <SnackbarProvider anchorOrigin={snackbarConfig}>
      <AuthProvider>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <MuiThemeProvider theme={DefaultTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
};

export default App;
