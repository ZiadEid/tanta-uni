import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../Store';
import { useEffect } from 'react';

const LayoutWraper = ({ children }) => {
  const { token } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="flex dark:bg-gray-900">
      <Sidebar />
      <div className="grow overflow-auto min-h-screen flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  )
}

export default LayoutWraper