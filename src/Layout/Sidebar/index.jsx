import { Link } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";
import { PiBooksFill } from "react-icons/pi";
import { PiChartPieSliceFill } from "react-icons/pi";
import { useStore } from "../../Store";

import userImg from "../../Assets/logo.png"

const Sidebar = () => {
  const {
    closeSide,
    setCloseSide,
    pageName,
  } = useStore();

  return (
    <div
      className={`w-fit ${closeSide && "lg:w-fit md:w-[50%]"} h-screen flex flex-col bg-[#fcfcfc] dark:bg-gray-900 text-gray-500 dark:text-white border-e border-gray-200 dark:border-gray-700 border-dashed font-semibold relative`}
    >
      <div
        onClick={setCloseSide}
        className="open-icon text-md text-black dark:text-white bg-[#fcfcfc] dark:bg-[#171e2e] p-2 border border-gray-200 dark:border-gray-700 border-dashed rounded-e absolute start-[100%] top-[20px] z-40 hover:shadow-lg cursor-pointer hidden md:block"
      >
        {
          closeSide
            ?
            <FaBarsStaggered />
            :
            <FaBars />
        }
      </div>
      <div className="logo flex justify-center items-center gap-2 xl:text-xl lg:text-lg px-4 py-6">
        {closeSide && <h1 className="shrink-0 hidden md:block">Tanta University</h1>}
        <FaGraduationCap className="xl:text-5xl text-4xl text-[#2a52be] shrink-0" />
      </div>
      <div className="overflow-auto px-4">
        {
          closeSide &&
          <Link
            to={"/"}
            className="user bg-gray-100 dark:bg-gray-800 p-4 flex items-center gap-2 outline-0 rounded-lg mt-2 mb-4"
          >
            <img className="shrink-0 w-10 h-10 border-2 border-white dark:border-gray-400 rounded-full bg-black" src={userImg} alt="" />
            <div className="content">
              <h2 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">زياد مصطفي عيد</h2>
              <span className="mt-1 text-xs text-gray-600 dark:text-gray-400">شؤؤون</span>
            </div>
          </Link>
        }
        {
          !closeSide &&
          <Link
            to={"/"}
            className="user outline-0 rounded-lg mt-2 mb-4"
          >
            <img
              className="w-10 h-10 mx-auto mt-2 mb-4 border-2 border-white dark:border-gray-400 rounded-full bg-black"
              src={userImg}
              alt="user"
            />
          </Link>
        }
        <ul className="flex flex-col gap-2">
          <Link
            to={"/study-years"}
            className={`p-2 outline-0 ${pageName == "studyYears" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] dark:hover:text-white duration-150"} text-md rounded-lg flex ${!closeSide && "md:justify-center lg:justify-center"} justify-center md:justify-start items-center gap-2 outline-0`}
          >
            <MdTimer />
            <span className={`${!closeSide && "md:hidden"} hidden md:block shrink-0`}>سنيين دراسية</span>
          </Link>
          <Link
            to={"/sections"}
            className={`p-2 outline-0 ${pageName == "sections" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] dark:hover:text-white duration-150"} text-md rounded-lg flex ${!closeSide && "md:justify-center lg:justify-center"} justify-center md:justify-start items-center gap-2 outline-0`}
          >
            <PiChartPieSliceFill />
            <span className={`${!closeSide && "md:hidden"} hidden md:block shrink-0`}>أقسام</span>
          </Link>
          <Link
            to={"/subjects"}
            className={`p-2 outline-0 ${pageName == "subjects" || pageName == "markes" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] dark:hover:text-white duration-150"} text-md rounded-lg flex ${!closeSide && "md:justify-center lg:justify-center"} justify-center md:justify-start items-center gap-2 outline-0`}
          >
            <PiBooksFill />
            <span className={`${!closeSide && "md:hidden"} hidden md:block shrink-0`}>
              المواد
            </span>
          </Link>
          <Link
            to={"/doctors"}
            className={`p-2 outline-0 ${pageName == "doctors" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] dark:hover:text-white duration-150"} text-md rounded-lg flex ${!closeSide && "md:justify-center lg:justify-center"} justify-center md:justify-start items-center gap-2 outline-0`}
          >
            <FaUserTie />
            <span className={`${!closeSide && "md:hidden"} hidden md:block shrink-0`}>
              الدكاترة
            </span>
          </Link>
          <Link
            to={"/students"}
            className={`p-2 outline-0 ${pageName == "students" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] dark:hover:text-white duration-150"} text-md rounded-lg flex ${!closeSide && "md:justify-center lg:justify-center"} justify-center md:justify-start items-center gap-2 outline-0`}
          >
            <FaUserGraduate />
            <span className={`${!closeSide && "md:hidden"} hidden md:block shrink-0`}>
              الطلاب
            </span>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar