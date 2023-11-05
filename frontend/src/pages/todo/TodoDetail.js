import { Suspense } from 'react';
import { useRouteLoaderData, json, redirect, defer, Await } from 'react-router-dom';

import TodoItem from '../../components/todo/TodoItem';
import TodosList from '../../components/todo/TodosList';
import { getAuthToken } from '../../util/auth';

function TodoDetailPage() {
    const { todo, todos } = useRouteLoaderData('todo-detail');
    const loadingPtag = <p style={{ textAlign: 'center' }}>Loading...</p>;

    return (
        <>
            <Suspense fallback={loadingPtag}>
                <Await resolve={todo}>
                    {(loadedTodo) => <TodoItem todo={loadedTodo} />}
                </Await>
            </Suspense>
            <Suspense fallback={loadingPtag}>
                <Await resolve={todos}>
                    {(loadedTodos) => <TodosList todos={loadedTodos} />}
                </Await>
            </Suspense>
        </>
    );
}

export default TodoDetailPage;

async function loadTodo(id) {
    const response = await fetch('http://localhost:8080/todos/' + id);

    if (!response.ok) {
        throw json({ message: 'Could not fetch details for selected todo.' }, { status: 500 });
    } else {
        const resData = await response.json();
        return resData.todo;
    }
}

async function loadTodos() {
    const response = await fetch('http://localhost:8080/todos');
    if (!response.ok) {
        throw json({ message: 'Could not fetch todos.' }, { status: 500 });
    } else {
        const resData = await response.json();
        return resData.todos;
    }
}

export async function loader({ request, params }) {
    const id = params.todoId;

    return defer({
        todo: await loadTodo(id),
        todos: loadTodos()
    });
}

export async function action({ params, request }) {
    const todoId = params.todoId;

    const token = getAuthToken();
    const response = await fetch('http://localhost:8080/todos/' + todoId, {
        method: request.method,
        headers: { 'Authorization': 'Bearer ' + token }
    });

    if (!response.ok) {
        throw json({ message: 'Could not delete todo.' }, { status: 500 });
    }
    return redirect('/todos');
}