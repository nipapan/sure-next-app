import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';

const api = require('../utils/api');

const useStyles = makeStyles(theme => ({
   layout: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '768px',
      margin: '0 auto'
   },
   paper: {
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
         marginTop: theme.spacing(8),
         padding: `${theme.spacing(6)}px ${theme.spacing(4)}px`
      }
   },
   submit: {
      margin: theme.spacing(3, 0, 2)
   },
   form: {
      width: '100%',
      marginTop: theme.spacing(1)
   },
   buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12
   }
}));

const Register = () => {
   const classes = useStyles({});
   const [formData, setFormData] = React.useState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
   });
   const [submitting, setSubmitting] = React.useState(false);

   const handleRegister = async (event) => {
      event.preventDefault();
      const { email, password, firstName, lastName } = formData;
      const { success, data } = await api.postAsync('/auth/register', {
         email,
         password,
         firstName,
         lastName
      });
      if(success) {
         window.location.replace('/login');
         return;
      }
   };

   return (
      <main className={classes.layout}>
         <Paper className={classes.paper} elevation={2}>
            <Box
               display="flex"
               alignItems="center"
               justifyContent="center"
               flexDirection="column"
            >
               <Typography component="h1" variant="h4" gutterBottom>
                  Register
               </Typography>
            </Box>
            <form method="post" className={classes.form} noValidate onSubmit={handleRegister}>
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="fname"
                  autoFocus
                  defaultValue={formData.firstName}
                  onChange={event => setFormData({...formData, firstName: event.target.value})}
               />
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  defaultValue={formData.lastName}
                  onChange={event => setFormData({...formData, lastName: event.target.value})}
               />
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  defaultValue={formData.email}
                  onChange={event => setFormData({ ...formData, email: event.target.value })}
               />
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  defaultValue={formData.password}
                  onChange={event => setFormData({...formData, password: event.target.value})}
               />
               <Box mb={6}>
                  <Button
                     disabled={submitting}
                     type="submit"
                     fullWidth
                     variant="contained"
                     color="primary"
                     className={classes.submit}
                  >
                     {submitting && (
                        <CircularProgress size={24} className={classes.buttonProgress} />
                     )}
                     {submitting? 'Registering...' : 'Register'}
                  </Button>
               </Box>
            </form>
         </Paper>
      </main>
   );
}

export default Register;