import { createSlice,nanoid } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'Todo',
  initialState: {
    todos: [{
      id:  nanoid(),
      des: "HomePage"
    }],
  },
  reducers: {
    addTodo: (state,actions) => {
      const todo = {
        id:nanoid(),
        des:actions.payload,
      }
      state.todos.push(todo);
    },
    removeTodo: (state, actions) => {
      state.todos = state.todos.filter((todo, index) => index !== actions.payload)
    },
    updateTodo: (state, actions) => {
      const updatedTodo = actions.payload;
      const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
      if (index !== -1) {
        state.todos[index].des = updatedTodo.des;
      }
    },
  },
});


export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;