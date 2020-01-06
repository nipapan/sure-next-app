import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Main Theme Instance
const theme = createMuiTheme({
   palette: {
      primary: {
         main: '#610c11',
      },
      secondary: {
         main: '#19857b',
      },
      error: {
         main: red.A400,
      },
      background: {
         default: '#fff',
      },
   },
});

export default theme;
