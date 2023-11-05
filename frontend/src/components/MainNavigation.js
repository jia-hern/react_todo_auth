import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import NewsLetterSignup from './NewsletterSignup';

function MainNavigation() {
    const token = useRouteLoaderData('root');

    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink to='/' className={({ isActive }) => isActive ? classes.active : undefined} end >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/todos' className={({ isActive }) => isActive ? classes.active : undefined} end >Todos</NavLink>
                    </li>
                    <li>
                        <NavLink to='/newsletter' className={({ isActive }) => isActive ? classes.active : undefined} end >Newsletter</NavLink>
                    </li>
                    {!token && (
                        <li>
                            <NavLink to='/auth?mode=login' className={({ isActive }) => isActive ? classes.active : undefined} end >Login</NavLink>
                        </li>
                    )}
                    {token && (
                        <li>
                            <Form action='/logout' method='post'>
                                <button>Logout</button>
                            </Form>
                        </li>
                    )}

                </ul>
            </nav>
            <NewsLetterSignup />
        </header >
    );
}

export default MainNavigation;