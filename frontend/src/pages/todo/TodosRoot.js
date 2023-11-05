import { Outlet } from 'react-router-dom';

import TodosNavigation from '../../components/todo/TodosNavigation';

function TodosRootLayout() {
    return (
        <>
            <TodosNavigation />
            <Outlet />
        </>
    );
}

export default TodosRootLayout;