import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { LoginOrganism } from '../../components/organisms';
import { useAuth } from '../../hooks/useAuth';

const useStyles = makeStyles({
  container: {
    marginTop: '8rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const Login = () => {
  const auth = useAuth();
  const classes = useStyles();

  const [formErrors, setFormErros] = useState({
    username: false,
    password: false,
  });

  const validate = (values) => {
    let errors = {};
    if (!values.username) {
      errors.username = true;
    }
    if (!values.password) {
      errors.password = true;
    }
    setFormErros(errors);
    return errors;
  };

  const handleSubmitLogin = async (event, values) => {
    !!event && event.preventDefault();
    const errors = validate(values);

    if (Object.keys(errors).length === 0) {
      await auth.signIn(values);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.container}>
        <LoginOrganism
          formErrors={formErrors}
          onclickLogin={handleSubmitLogin}
        />
      </div>
    </Container>
  );
};

export default Login;
