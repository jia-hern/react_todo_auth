import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditTodoPage from './pages/todo/EditTodo';
import ErrorPage from './pages/Error';
import TodoDetailPage, { loader as todoDetailLoader, action as deleteTodoAction } from './pages/todo/TodoDetail';
import TodosPage, { loader as todosLoader } from './pages/todo/Todos';
import TodosRootLayout from './pages/todo/TodosRoot';
import Homepage from './pages/Home';
import NewTodoPage from './pages/todo/NewTodo';
import RootLayout from './pages/Root';
import { action as manipulateTodoAction } from './components/todo/TodoForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import AuthenticationPage, { action as authAction } from './pages/auth/Authentication';
import { action as logoutAction } from './pages/Logout';
import { checkAuthLoader, tokenLoader } from './util/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <Homepage /> },
      {
        path: 'todos',
        element: <TodosRootLayout />,
        children: [
          {
            index: true,
            element: <TodosPage />,
            loader: todosLoader
          },
          {
            path: ':todoId',
            id: 'todo-detail',
            loader: todoDetailLoader,
            children: [
              {
                index: true,
                element: <TodoDetailPage />,
                action: deleteTodoAction
              },
              {
                path: ':edit',
                element: <EditTodoPage />,
                action: manipulateTodoAction,
                loader: checkAuthLoader
              }
            ]
          },
          {
            path: 'new',
            element: <NewTodoPage />,
            action: manipulateTodoAction,
            loader: checkAuthLoader
          }
        ]
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction
      },
      {
        path: 'logout',
        action: logoutAction
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;