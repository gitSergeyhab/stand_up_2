import { AnyAction } from '@reduxjs/toolkit';
import {
  useEffect,
  useState,
  ChangeEventHandler,
  useRef,
  FormEventHandler,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../store/store';
import { fetchTodos, Todo, deleteTodo, addTodo } from '../../store/test-store';

function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useDispatch();

  const handleClickDelete = () => {
    dispatch(deleteTodo(todo.id) as unknown as AnyAction);
  };

  const { completed, id, title, userId } = todo;
  // console.log({t});
  return (
    <>
      <h3>{title}</h3>
      {completed ? 'Completed' : 'No Completed'}
      <p>User ID: {userId}</p>
      <p>ID: {id}</p>
      <button onClick={handleClickDelete} type="button">
        Delete
      </button>
    </>
  );
}

function AddTodoForm() {
  const [name, setName] = useState('');
  const checkBoxRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setName(evt.currentTarget.value);
  };

  const handleSubmit: FormEventHandler = (evt) => {
    evt.preventDefault();
    if (checkBoxRef.current && name) {
      const title = name;
      const completed = checkBoxRef.current.checked;
      const userId = 1;

      dispatch(addTodo({ title, completed, userId }) as unknown as AnyAction);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={handleChange} />
      <label>
        <input type="checkbox" ref={checkBoxRef} /> Completed
      </label>

      <button type="button">Add</button>
    </form>
  );
}

export function TestPage() {
  const test = 'Test';

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos() as unknown as AnyAction);
  }, [dispatch]);

  const { error, isLoading, todos } = useSelector(
    (state: ReducerType) => state.test,
  );

  if (error) {
    return <div>{error}!!!</div>;
  }

  if (isLoading) {
    return <div>Loading .... </div>;
  }

  const todosElements = todos.map((item) => (
    <li key={item.id}>
      <TodoItem todo={item} />
    </li>
  ));

  return (
    <>
      <br />
      <AddTodoForm />
      <h1>Test</h1>
      {test}
      <ul>{todosElements}</ul>
    </>
  );
}
