import { FaFolderOpen } from "react-icons/fa";
import BackToHome from './../BackToHome';

const NoContent = ({data}) => {
  return (
    <div className='grow flex justify-center items-center'>
      <div className="flex flex-col justify-center">
        <FaFolderOpen className="text-[200px] text-[#dc3545]" />
        <p className="text-center mb-4 text-center leading-loose text-gray-600 dark:text-gray-400">لا يوجد {data}</p>
        <BackToHome />
      </div>
    </div>
  )
}

export default NoContent