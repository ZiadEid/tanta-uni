import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useStore } from "../../Store";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  // state for dark mode icone
  const {theme, darkMode, clearToken, setUser, setMSections} = useStore();
  // Toggle dark mode
  function toggleDarkMode() {
    const htmlElement = document.documentElement;
    const isDarkMode = htmlElement.classList.toggle('dark');
    darkMode(isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }

  // Logout Function
  const logOut = () => {
    clearToken();
    localStorage.removeItem("user");
    setUser(localStorage.getItem("user"));
    localStorage.removeItem("mSections");
    setMSections(localStorage.getItem("mSections"));
    navigate("/login");
  }

  return (
    <div className="sticky top-0 z-30 p-6 dark:bg-[#0d1321cc] shadow backdrop-blur text-white flex items-center justify-end gap-4">
      <div
        onClick={toggleDarkMode}
        className="p-3 bg-white dark:bg-[#171e2e] shadow hover:shadow-lg text-[#2a52be] dark:text-white border border-white dark:border-gray-700 w-fit rounded-full text-lg cursor-pointer"
      >
        {
          theme == "light"
            ?
            <MdOutlineDarkMode />
            :
            <MdLightMode />
        }
      </div>
      <div className="p-3 bg-white dark:bg-[#171e2e] shadow hover:shadow-lg text-[#2a52be] dark:text-white border border-white dark:border-gray-700 w-fit rounded-full text-lg cursor-pointer">
        <RiLogoutCircleRLine onClick={() => logOut()} />
      </div>
    </div>
  )
}

export default Navbar