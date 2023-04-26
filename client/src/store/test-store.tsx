import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export type ClientTodo = {
  userId: number;
  title: string;
  completed: boolean;
};
export type Todo = ClientTodo & { id: number };

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

const api = axios.create({ baseURL: BASE_URL });

export const fetchTodos = createAsyncThunk(
  'test/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<Todo[]>('/', {
        params: { _limit: 7 },
      });
      // const res = await fetch(BASE_URL);
      // if (!res.ok) {
      //   throw new Error('Server Error');
      // }
      // const data = await res.json() as Todo[];
      return data;
    } catch (err) {
      return rejectWithValue((err as { message: string }).message);
    }
  },
);

export const testSlice = createSlice({
  name: 'test',
  initialState: {
    todos: [] as Todo[],
    isLoading: false,
    error: null as null | string,
  },
  reducers: {
    removeTodo(state, action) {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    plusTodo(state, action) {
      state.todos = [...state.todos, action.payload as Todo];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as null | string;
      });
  },
});

export const { removeTodo, plusTodo } = testSlice.actions;
export const deleteTodo = createAsyncThunk(
  'test/deleteTodo',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      await api.delete<Todo>(`/${id}`);

      dispatch(removeTodo(id));
      return true; // ??
      // return data;
    } catch (err) {
      toast.error('Cannot delete');
      return rejectWithValue((err as { message: string }).message);
    }
  },
);

export const addTodo = createAsyncThunk(
  'test/addTodo',
  async (
    { userId, title, completed }: ClientTodo,
    { rejectWithValue, dispatch },
  ) => {
    try {
      const { data } = await api.post<Todo>('/', { userId, title, completed });
      dispatch(plusTodo(data));
      return true; // ??
    } catch (err) {
      toast.error('Cannot post');
      return rejectWithValue((err as { message: string }).message);
    }
  },
);

// const x = document.querySelector('.navbar');
// const parent = x?.parentElement;

// const sib = x?.nextElementSibling;

// const p1 = Promise.resolve(1);
// const p2 = Promise.resolve(1);
// const p3 = Promise.resolve(1);

// const p4 = new Promise((res, rej) => {
//   const isRes = Math.random() > 0.5;
//   setTimeout(() => {
//     if (isRes) {
//       res('ok');
//     }
//     rej('no good');
//   });
// });
