import TodoListItem from "./TodoListItem";

import styled from "styled-components";

const TodoList = ({ todos, onRemove, onToggle }) => {


  const TodoListWrapper = styled.div`

    min-height: 320px;
    max-height: 513px;
    overflow-y: auto;
 
  `




  return (
    <div className={styles.TodoList}>
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TodoList;
