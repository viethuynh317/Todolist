import React, {createRef} from "react";
import Proptypes from "prop-types";
import {Snackbar, makeStyles} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(9),
  },
}));

export default function Toastify(props) {
  const {notify, setNotify} = props;
  const classes = useStyles();

  const wrapper = createRef();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      className={classes.root}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{vertical: "top", horizontal: "right"}}
      onClose={handleClose}
      ref={wrapper}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}

Toastify.propTypes = {
  notify: Proptypes.instanceOf(Object).isRequired,
  setNotify: Proptypes.func.isRequired,
};
