import * as React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

// Load styles
import '../style/components/loading.scss';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: grey,
  },
});

export const Loading = (props: any) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="c-loading">
        <LinearProgress />
      </div>
    </ThemeProvider>
  );
};

