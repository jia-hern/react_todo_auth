import { Link } from 'react-router-dom';

import classes from './TodosList.module.css';

function TodosList({ todos }) {
    return (
        <div className={classes.todos}>
            <h1>All Todos</h1>
            <ul className={classes.list}>
                {todos.map((todo) => (
                    <li key={todo.id} className={classes.item}>
                        <Link to={`/todos/${todo.id}`}>
                            <img src={todo.image} alt={todo.title} />
                            <div className={classes.content}>
                                <h2>{todo.title}</h2>
                                <time>{todo.date}</time>
                                <p>{todo.status}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default TodosList;