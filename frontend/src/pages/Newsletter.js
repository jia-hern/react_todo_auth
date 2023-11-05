import NewsletterSignup from '../components/NewsletterSignup';
import PageContent from '../components/PageContent';

function NewsletterPage() {
    return (
        <PageContent title="Want to get notified?">
            <p>Join our awesome newsletter to be informed when we add more apps like this!</p>
            <NewsletterSignup />
        </PageContent>
    );
}

export default NewsletterPage;

export async function action({ request }) {
    const data = await request.formData();
    const email = data.get('email');
    console.log('email: ', email);
    return { message: 'Signup successful!' };
}