import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync',
    async () => {
        const response = await fetch('http://localhost:7000/todos');
        if(response.ok) {
            const todos = await response.json();
            return {todos}
        }
    }
);

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync',
    async (payload) => {
        const response = await fetch('http://localhost:7000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: payload.title})
        });
        if(response.ok) {
            const todo = await response.json();
            return {todo};
        }
    }
);

export const toggleCompleteAsync = createAsyncThunk('todos/toggleCompleteAsync',
    async (payload) => {
        const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({completed: payload.completed})
        });
        if(response.ok) {
            const todo = await response.json();
            return {id: todo.id, completed: todo.completed};
        }
    }
);

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync',
    async (payload) => {
        const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({completed: payload.completed})
        });
        if(response.ok) {
            const todos = await response.json();
            return {todos};
        }
    }
);

const todoSlice = createSlice({
    name: 'todos',
    initialState: [
        { id: 1, title: 'todo1', completed: false},
        { id: 2, title: 'todo2', completed: true},
        { id: 3, title: 'todo3', completed: false},
        { id: 4, title: 'todo4', completed: true}
    ],

    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false
            }
            state.push(newTodo);
        },

        toggleComplete: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state[index].completed = action.payload.completed;
        },

        deleteTodo: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state.splice(index, 1);
            console.log(state);
            console.log('Delete clicked ', action.payload.id);
        }
     },

     extraReducers: {
         [getTodosAsync.pending]: (state, action) => {
             console.log("fetch data is in progress");
         },
         [getTodosAsync.fulfilled]: (state, action) => {
             console.log("fetch data completed");
             return action.payload.todos;
         },
         [addTodoAsync.fulfilled]: (state, action) => {
             state.push(action.payload.todo);
         },

         [toggleCompleteAsync.fulfilled]: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
             state[index].completed = action.payload.completed;
         },

         [deleteTodoAsync.fulfilled]: (state, action) => {
            return action.payload.todos;
         }
     }

})

export const {addTodo, toggleComplete, deleteTodo} = todoSlice.actions; 
export default todoSlice.reducer;