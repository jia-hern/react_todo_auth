import { NavLink, useRouteLoaderData } from 'react-router-dom';
import classes from './TodosNavigation.module.css';

function TodosNavigation() {
    const token = useRouteLoaderData('root');

    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    {token && (<li><NavLink to='/todos/new' className={({ isActive }) => isActive ? classes.active : undefined}>New Todo</NavLink></li>)}
                </ul>
            </nav>
        </header>
    );
}

export default TodosNavigation;