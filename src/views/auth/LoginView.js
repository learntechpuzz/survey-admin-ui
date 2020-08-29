import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Page from 'src/components/Page';
import AuthService from 'src/services/auth.service';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    if (AuthService.getCurrentUser()) {
      navigate('/app/dashboard', { replace: true });
    }
  });

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required('Username is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values, actions) => {
              AuthService.login(values.username, values.password).then(
                () => {
                  navigate('/app/dashboard', { replace: true });
                },
                error => {
                  actions.setStatus({ error: error });
                  actions.setSubmitting(false);
                }
              );
            }}
          >
            {({
              errors,
              status,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
                <form onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <Typography
                      color="textPrimary"
                      variant="h2"
                    >
                      Sign in
                  </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Sign in on the internal platform
                  </Typography>
                  </Box>
                  {status && status.error &&
                    <Box my={2}>
                      <Alert variant="outlined" severity="error">
                        {status.error}
                      </Alert>
                    </Box>
                  }
                  <TextField
                    error={Boolean(touched.username && errors.username)}
                    fullWidth
                    helperText={touched.username && errors.username}
                    label="User Name"
                    margin="normal"
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.username}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign in now
                  </Button>
                  </Box>
                </form>
              )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
