import { Form, Link, useActionData, useNavigation, useSearchParams } from 'react-router-dom';
import classes from './AuthForm.module.css';

function AuthForm() {
    const data = useActionData();
    const navigation = useNavigation();
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';
    const isSubmitting = navigation.state === 'submitting';

    return (
        <>
            <Form method='post' className={classes.form}>
                <div className={classes.title}>
                    <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
                    <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
                        {isLogin ? 'Register as a new user instead' : 'Go to login instead'}
                    </Link>
                </div>

                {data && data.errors && (
                    <ul>
                        {Object.values(data.errors).map((err) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                )}
                {data && data.message && <p>{data.message}</p>}
                <p>
                    <label htmlFor='email'>Email</label>
                    <input id='email' type='email' name='email' required />
                </p>
                <p>
                    <label htmlFor='password'>Password</label>
                    <input id='password' type='password' name='password' required />
                </p>
                <div className={classes.actions}>
                    <button disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </Form>
        </>
    );
}

export default AuthForm;