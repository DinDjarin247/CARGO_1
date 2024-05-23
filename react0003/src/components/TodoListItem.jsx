import {
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
  MdCheckBox,
} from "react-icons/md";
import styles from "./TodoListItem.module.css";
import { useState } from "react";

const TodoListItem = (props) => {
  const { id, text, checked } = props.todo;

  const [removeVisible, setRemoveVisible] = useState(false);

  const onMouseEnter = () => {
    setRemoveVisible(true);
  };

  const onMouseLeave = () => {
    setRemoveVisible(false);
  };

  return (
    <div
      className={styles.TodoListItem}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={
          checked ? `${styles.checkbox} ${styles.checked}` : styles.checkbox
        }
        onClick={() => props.onToggle(id)}
      >
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className={styles.text}>{text}</div>
      </div>

      <div
        className={`${styles.remove} ${
          removeVisible ? styles.visible : styles.hidden
        }`}
        onClick={() => props.onRemove(id)}
      >
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default TodoListItem;
