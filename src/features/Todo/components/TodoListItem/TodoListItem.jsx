import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';


const TodoListItem = props => {
  const {onEditClick, preValueForm, todo, numericalOrder} = props;

  const {name, statusValue} = todo;
 
  console.log({name, statusValue});

  const handleEditClick = () => {
    if (preValueForm === 1) onEditClick(2); 
    else if (preValueForm === 0) onEditClick(2);
    else onEditClick(0);
  }

  const handleDeleteClick = () => {
    
  }

  return (
    <tr>
      <td>{numericalOrder}</td>
      <td>{name}</td>
      <td>
        {statusValue ? (<div className="trigger-status">
        <span>Kích hoạt</span>
      </div>) : (<div className="hidden-status">
        <span>Ẩn</span>
      </div>)}
      
      </td>
      <td>
        <div className={preValueForm ? "form-group form-btn form-btn-respon" : "form-group form-btn" }>
          <button type="button" className="btn btn-warning" onClick={handleEditClick}>
            <FontAwesomeIcon icon={faPencilAlt} />
            <span>Sửa</span>
          </button>

          <button type="button" className="btn btn-danger" onClick={handleDeleteClick} >
            <FontAwesomeIcon icon={faTrashAlt} />
            <span>Xóa</span>
          </button>
        </div>
      </td>
    </tr>
    
  )
}

TodoListItem.propTypes = {
  onEditClick: PropTypes.func.isRequired,
  preValueForm: PropTypes.number.isRequired,
  numericalOrder: PropTypes.number.isRequired,
  todo: PropTypes.instanceOf(Object),
}

TodoListItem.defaultProps = {
  todo: {}
}

export default TodoListItem
