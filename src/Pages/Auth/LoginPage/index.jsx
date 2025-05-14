import { useEffect } from 'react';
import LoginForm from '../../../Components/LoginForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../../../Store';
import vedioBg from '/Assets/vedio-bg.mp4';
import gifBg from '/Assets/gif-bg.gif';

const LoginPage = () => {
  const { token } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [])
  // catch theme preference
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
    <div className='relative h-full w-full overflow-hidden flex justify-center items-center min-h-screen p-2'>
      <img
        className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        src={gifBg}
        alt="tanta Universtiy"
      />
      <div className="layer absolute top-0 bottom-0 start-0 end-0 bg-[#fcfcfc] dark:bg-gray-900 opacity-95"></div>


      <div className="relative z-10 text-white text-center p-10">
        <LoginForm />
      </div>
      <ToastContainer />
    </div>
  )
}

export default LoginPage