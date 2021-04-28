import {faPencilAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, createMuiTheme, makeStyles, ThemeProvider} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import React, {useEffect, useRef} from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {
  actionAddOrEditClick,
  changeStatusTodo,
  deleteOrUpdateTodo,
  deleteTodo,
  setToastAction,
} from "../../../../actions/todoActions";

const theme = createMuiTheme({
  status: {
    success: green[500],
  },
});

const useStyles = makeStyles(() => ({
  root: {
    color: green[500],
  },
  checked: {},
}));

const TodoListItem = (props) => {
  const {
    todo,
    numericalOrder,
    dispatchToastAction,
    dispatchDeleteTodo,
    dispatchHiddenAction,
    dispatchChangeStatus,
    dispatchUpdateTodo,
    isActionTodo,
  } = props;

  const classes = useStyles();

  const {name, statusValue} = todo;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rememberIdRef = useRef();

  useEffect(() => {
    rememberIdRef.current = todo.id;
  });

  const handleEditClick = (editTodo) => {
    dispatchUpdateTodo(editTodo);
    if (!isActionTodo || isActionTodo === 1) {
      dispatchHiddenAction(2);
    }
  };

  const handleDeleteClick = (myTodo) => {
    dispatchDeleteTodo(myTodo);
    dispatchToastAction({
      isOpen: true,
      message: `Xóa công việc ${todo.name} thành công`,
      type: "success",
    });
    dispatchHiddenAction(0);
  };

  const handleChangeStatusClick = () => {
    dispatchChangeStatus({
      ...todo,
      statusValue: statusValue === 1 ? -1 : 1,
    });
    dispatchToastAction({
      isOpen: true,
      message: `Thay đổi trạng thái ${todo.name} thành công`,
      type: "success",
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <tr>
        <td>{numericalOrder}</td>
        <td>{name}</td>
        <td>
          {Number(statusValue) === 1 ? (
            <div
              className="trigger-status"
              onClick={handleChangeStatusClick}
              aria-hidden="true"
            >
              <span>Kích hoạt</span>
            </div>
          ) : (
            <div
              className="hidden-status"
              onClick={handleChangeStatusClick}
              aria-hidden="true"
            >
              <span>Ẩn</span>
            </div>
          )}
        </td>
        <td>
          <div
            className={
              isActionTodo ? "form-group form-btn form-btn-respon" : "form-group form-btn"
            }
          >
            <NavLink style={{textDecoration: "none"}} to="/todos/updateTodo">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => handleEditClick(todo)}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
                <span>Sửa</span>
              </button>
            </NavLink>
            <button type="button" className="btn btn-danger" onClick={handleClickOpen}>
              <FontAwesomeIcon icon={faTrashAlt} />
              <span>Xóa</span>
            </button>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Bạn có muốn xóa công việc này?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Công việc sẽ không hoàn tác lại sau khi xóa
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => handleDeleteClick(todo)}
                  className={classes.root}
                  variant="outlined"
                  autoFocus
                >
                  Đồng ý
                </Button>
                <Button onClick={handleClose} color="secondary" variant="outlined">
                  Hủy bỏ
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </td>
      </tr>
    </ThemeProvider>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.instanceOf(Object).isRequired,
  numericalOrder: PropTypes.number.isRequired,
  dispatchToastAction: PropTypes.func,
  dispatchDeleteTodo: PropTypes.func,
  dispatchHiddenAction: PropTypes.func,
  dispatchChangeStatus: PropTypes.func,
  dispatchUpdateTodo: PropTypes.func,
  isActionTodo: PropTypes.number,
};

TodoListItem.defaultProps = {
  dispatchToastAction: null,
  dispatchDeleteTodo: null,
  dispatchHiddenAction: null,
  dispatchChangeStatus: null,
  dispatchUpdateTodo: null,
  isActionTodo: 0,
};

const mapStateToProps = (state) => ({
  isActionTodo: state.todos.isActionTodo,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchToastAction(toast) {
    dispatch(setToastAction(toast));
  },
  dispatchDeleteTodo(todo) {
    dispatch(deleteTodo(todo));
  },
  dispatchHiddenAction(number) {
    dispatch(actionAddOrEditClick(number));
  },
  dispatchChangeStatus(todo) {
    dispatch(changeStatusTodo(todo));
  },
  dispatchUpdateTodo(todo) {
    dispatch(deleteOrUpdateTodo(todo));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItem);
