import { NavLink } from 'react-router-dom';
import classes from './PageContent.module.css';

function PageContent({ title, children }) {
    return (
        <div className={classes.content}>
            <h1>{title}</h1>
            {children}
            <p>
                <NavLink to="/todos" className={classes.todo} end>Go to todos</NavLink>
            </p>

        </div>
    );
}
export default PageContent;