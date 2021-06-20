import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import {useDispatch, useSelector} from 'react-redux';
import { getTodosAsync } from '../redux/todoSlice';
const TodoList = () => {
	const todos = useSelector((state) =>state.todos);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTodosAsync());
	}, [dispatch])
	return (
		<ul className='list-group'>
			{todos.map((todo) => (
				<TodoItem id={todo.id} title={todo.title} completed={todo.completed} key={todo.id}/>
			))}
		</ul>
	);
};

export default TodoList;
