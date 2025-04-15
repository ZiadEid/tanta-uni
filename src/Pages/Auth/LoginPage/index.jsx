import { useEffect } from 'react';
import LoginForm from '../../../Components/LoginForm';
import { useLocation } from 'react-router-dom';

const LoginPage = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/login') {
      // Follow system preference on specific page
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [location]);

  return (
    <div className='flex justify-center items-center min-h-screen bg-[#fcfcfc] dark:bg-gray-900 p-2'>
      <LoginForm />
    </div>
  )
}

export default LoginPage