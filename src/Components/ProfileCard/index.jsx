import profileImg from "../../Assets/logo.png";
import { FaUserEdit } from "react-icons/fa";
import { useStore } from "../../Store";


const ProfileCard = () => {
  const { user } = useStore();

  return (
    <div className="profile-card max-w-full w-[75%] p-8 bg-gray-200 dark:bg-gray-800 rounded-lg shodow-lg relative overflow-hidden">
      <FaUserEdit className="absolute top-2 end-2 w-8 h-8 p-1 text-blue-600 rounded-lg cursor-pointer" />
      <div className="profile-header flex items-center gap-5">
        <div className="image w-[150px] rounded-full overflow-hidden">
          <img className="w-full" src={profileImg} alt={user?.name} />
        </div>
        <div className="content">
          <h2 className="text-4xl text-gray-900 dark:text-white">{user?.name}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">{user?.role}</p>
        </div>
      </div>
      <div className="content my-4 flex flex-col gap-3 text-gray-900 dark:text-gray-200">
        <p className="p-3 bg-gray-300 dark:bg-gray-900 rounded-lg">{user?.nationalId}</p>
        <p className="p-3 bg-gray-300 dark:bg-gray-900 rounded-lg">{user?.email}</p>
        <p className="p-3 bg-gray-300 dark:bg-gray-900 rounded-lg">{user?.phoneNumber}</p>
      </div>
    </div>
  )
}

export default ProfileCard