import { MdAdd } from "react-icons/md";
import styles from "./TodoInsert.module.css";
import { useCallback, useState } from "react";

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState("");

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onInsert(value);
      setValue(""); // 입력 필드 초기화
    },
    [onInsert, value]
  );

  return (
    <form className={styles.TodoInsert} onSubmit={onSubmit}>
      <input
        className={styles.input}
        placeholder="할 일을 입력하세요"
        onChange={onChange}
        value={value}
      />

      <button type="submit" className={styles.button}>
        <MdAdd />
      </button>
    </form>
  );
};
export default TodoInsert;
