import { Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-black text-blue-300">
      <h1 className="text-4xl font-bold text-blue-500 mb-4">404 Not Found</h1>
      <p className="text-xl text-white mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">
        <Button size="3">
          Go to Home Page
        </Button>
      </Link>
    </section>
  );
}

export default ErrorPage;
