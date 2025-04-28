import { Link } from "react-router-dom";
import userImg from "../../Assets/logo.png"
import { useStore } from "../../Store";

const UserSide = ({ mSection }) => {
  const {
    closeSide,
    user,
  } = useStore();
  return (
    <>
      {
        closeSide &&
        <Link
          to={`/${mSection}`}
          className="user bg-gray-200 dark:bg-gray-800 p-px md:p-4 flex items-center gap-2 outline-0 rounded-lg mt-2 mb-4"
        >
          <img className="shrink-0 w-10 h-10 border-2 border-white dark:border-gray-400 md:rounded-full rounded-lg bg-black" src={userImg} alt="بروفيل" />
          <div className="content">
            <h2 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white hidden md:block shrink-0">
              {user.name}
            </h2>
            <span className="mt-1 text-xs text-gray-600 dark:text-gray-300 hidden md:block shrink-0">
              {user.role}
            </span>
          </div>
        </Link>
      }
      {
        !closeSide &&
        <Link
          to={`/${mSection}`}
          className="user outline-0 rounded-lg mt-2 mb-4"
        >
          <img
            className="w-10 h-10 mx-auto mt-2 mb-4 border-2 border-white dark:border-gray-400 rounded-full bg-black"
            src={userImg}
            alt="user"
          />
        </Link>
      }
    </>
  )
}

export default UserSide