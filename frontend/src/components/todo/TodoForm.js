import { Form, json, redirect, useActionData, useNavigate, useNavigation } from 'react-router-dom';
import { getAuthToken } from '../../util/auth';
import classes from './TodoForm.module.css';

function TodoForm({ method, todo }) {
    const data = useActionData();
    const navigate = useNavigate();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    function cancelHandler() {
        navigate('..');
    }
    return (
        <Form method={method} className={classes.form}>
            {data && data.errors && (
                <ul>
                    {Object.values(data.errors).map((err) => (
                        <li key={err}>{err}</li>
                    ))}
                </ul>
            )}
            <p>
                <label htmlFor='title'>Title</label>
                <input id='title' type='text' name='title' required defaultValue={todo ? todo.title : ''} />
            </p>
            <p>
                <label htmlFor='image'>Image</label>
                <input id='image' type='url' name='image' required defaultValue={todo ? todo.image : ''} />
            </p>
            <p>
                <label htmlFor='date'>Date</label>
                <input id='date' type='date' name='date' required defaultValue={todo ? todo.date : ''} />
            </p>
            <p>
                <label htmlFor='description'>Description</label>
                <input id='description' type='text' name='description' rows='5' required defaultValue={todo ? todo.description : ''} />
            </p>
            <p>
                <label htmlFor='status'>Status</label>
                <input id='status' type='text' name='status' required defaultValue={todo ? todo.status : ''} />
            </p>
            <div className={classes.actions}>
                <button type='button' onClick={cancelHandler} disabled={isSubmitting}>Cancel</button>
                <button disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Save'}
                </button>
            </div>
        </Form>
    );
}

export default TodoForm;

export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();

    const todoData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description'),
        status: data.get('status')
    };
    let url = 'http://localhost:8080/todos';
    if (method === 'PATCH') {
        const todoId = params.todoId;
        url = 'http://localhost:8080/todos' + todoId;
    }
    const token = getAuthToken();
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(todoData)
    });

    if (response.status === 422) {
        return response;
    }
    if (!response.ok) {
        throw json({ message: 'Could not save todo.' }, { status: 500 });
    }
    return redirect('/todos');
}