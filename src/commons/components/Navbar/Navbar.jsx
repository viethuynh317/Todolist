import {Button, Link} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React from "react";
import {NavLink, useHistory} from "react-router-dom";
import {clearTokenService, isLogin} from "../../../services/tokenServices";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  root: {
    display: "flex",
    marginBottom: "6rem",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(2),
    color: "inherit",
  },
  button: {
    margin: theme.spacing(2),
    color: "inherit",
    "&:hover": {
      backgroundColor: "#f5f2f25e",
    },
  },
  navlink: {
    color: "inherit",
    textDecoration: "none",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const history = useHistory();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            TodoApp
          </Typography>
          <nav>
            <Link
              variant="button"
              color="textPrimary"
              href="https://google.com"
              className={classes.link}
            >
              Features
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              href="https://google.com"
              className={classes.link}
            >
              Enterprise
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              href="https://google.com"
              className={classes.link}
            >
              Support
            </Link>
          </nav>
          {isLogin() ? (
            <Button
              color="inherit"
              variant="outlined"
              className={classes.button}
              onClick={() => {
                clearTokenService();
                history.push("/auth/sign-in");
              }}
            >
              Sign out
            </Button>
          ) : (
            <NavLink className={classes.navlink} to="/auth/sign-in">
              <Button color="inherit" variant="outlined" className={classes.button}>
                Sign in
              </Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
