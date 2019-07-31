import React, {useState} from 'react';

const initialTodos = [
    {
        id: 'a',
        task: 'Learn React',
        complete: true,
    },
    {
        id: 'b',
        task: 'Learn Firebase',
        complete: true,
    },
    {
        id: 'c',
        task: 'Learn GraphQL',
        complete: false,
    },
];

const Todo = () => {
    const [todos, setTodos] = useState(initialTodos);
    const [task, setTask] = useState('');

    const handleChangeInput = event => {

        setTask(event.target.value);
    };
    const handleSubmit = event => {
        if (task) {
            console.info(task);
            console.info('ggggg',todos)
            setTodos(todos.concat({ id: 'd', task, complete: false }));
            console.info(todos)
        }
        setTask('');
        console.info('---', task)
        event.preventDefault();
    };
    console.info('===', todos)
    console.info('===fgfg', task)
    return (
        <div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <label>{todo.task}</label>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={task}
                    onChange={handleChangeInput}
                />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );
};
export default Todo;