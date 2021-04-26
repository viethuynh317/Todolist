import React, {createRef} from "react";
import Proptypes from "prop-types";
import {Snackbar, makeStyles} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {connect} from "react-redux";
import {setToastAction} from "../../../actions/todoActions";

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(9),
  },
}));

const Toastify = (props) => {
  const {toast: notify, dispatchToastAction} = props;
  const classes = useStyles();

  const wrapper = createRef();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatchToastAction({
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
};

Toastify.propTypes = {
  toast: Proptypes.instanceOf(Object).isRequired,
  dispatchToastAction: Proptypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchToastAction(toast) {
    dispatch(setToastAction(toast));
  },
});

const mapStateToProps = (state) => ({
  toast: state.todos.toast,
});

export default connect(mapStateToProps, mapDispatchToProps)(Toastify);
