import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom';
import classes from './TodoItem.module.css';

function TodoItem({ todo }) {
    const token = useRouteLoaderData('root');
    const submit = useSubmit();

    function startDeleteHandler() {
        const proceed = window.confirm('Are you sure?');
        if (proceed) {
            submit(null, { method: 'delete' });
        }
    }
    return (
        <article className={classes.todo}>
            <img src={todo.image} alt={todo.title} />
            <h1>{todo.title}</h1>
            <time>{todo.date}</time>
            <p>{todo.description}</p>
            {token && (
                <menu className={classes.actions}>
                    <Link to="edit">Edit</Link>
                    <button onClick={startDeleteHandler}>Delete</button>
                </menu>
            )}
        </article>
    );
}

export default TodoItem;