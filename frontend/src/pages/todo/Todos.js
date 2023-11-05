import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import TodosList from '../../components/todo/TodosList';

function TodosPage() {
    const { todos } = useLoaderData();
    const fallbackText = <p style={{ textAlign: 'center' }}>Loading...</p>;

    return (
        <Suspense fallback={fallbackText}>
            <Await resolve={todos}>
                {(loadedTodos) => <TodosList todos={loadedTodos} />}
            </Await>
        </Suspense>
    );
}

export default TodosPage;

async function loadTodos() {
    const response = await fetch('http://localhost:8080/todos');
    if (!response.ok) {
        throw json({ message: 'Could not fetch todos.' }, { status: 500 });
    } else {
        const resData = await response.json();
        return resData.todos;
    }
}

export function loader() {
    return defer({
        todos: loadTodos()
    });
}