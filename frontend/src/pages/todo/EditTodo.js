import { useRouteLoaderData } from 'react-router-dom';

import TodoForm from '../../components/todo/TodoForm';

function EditTodoPage() {
    const data = useRouteLoaderData('todo-detail');

    return <TodoForm method="patch" todo={data.todo} />;
}

export default EditTodoPage;