import {CircularProgress} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {useFormik} from "formik";
import React, {Suspense} from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {setToastAction} from "../../../actions/todoActions";
import {setTokenService} from "../../../services/tokenServices";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("This field is required")
    .email("Email must be a valid email"),
  password: yup
    .string()
    .required("This field is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([A-Za-z\d@$!%*?#&]){8,}$/,
      "Minimum eight characters, at least one uppercase letter, one lowercase letter and one special characte"
    ),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = ({dispatchToastAction}) => {
  const classes = useStyles();

  const initialValues = {
    email: "",
    password: "",
  };

  const history = useHistory();

  const {
    values: {email, password},
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit({myEmail, myPassword}) {
      if (myEmail === "huynhvanviet317@gmail.com" && myPassword === "qweQWE!@#") {
        dispatchToastAction({
          type: "error",
          message: `Email or password is incorrect`,
          isOpen: true,
        });
        return;
      }
      history.push("/todos");
      dispatchToastAction({
        type: "success",
        message: `Sign in is successfully`,
        isOpen: true,
      });
      setTokenService();
    },
  });

  return (
    <Suspense fallback={<CircularProgress />}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                setTokenService();
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="https://google.com" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="https://google.com" variant="body2">
                  Don&apos;t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Suspense>
  );
};

SignIn.propTypes = {
  dispatchToastAction: PropTypes.func,
};

SignIn.defaultProps = {
  dispatchToastAction: null,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  dispatchToastAction(toast) {
    dispatch(setToastAction(toast));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
