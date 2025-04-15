import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";
import { PiBooksFill } from "react-icons/pi";
import { PiChartPieSliceFill } from "react-icons/pi";

import { useStore } from "../../Store";

const Sidebar = () => {
  const {
    pageName,
    yearsActive,
    sectionsActive,
    subjectsActive,
    doctorsActive,
    studentsActive
  } = useStore();

  return (
    <div
      className='w-[100%] md:w-[32%] lg:w-[22%] xl:w-[20%] h-screen overflow-hidden flex flex-col bg-[#fcfcfc] dark:bg-gray-900 text-gray-500 dark:text-white border-e border-gray-200 dark:border-gray-700 border-dashed font-semibold'
    >
      <div className="logo flex justify-center items-center gap-2 px-4 py-6 text-xl">
        <h1>Tanta University</h1>
        <div className="text-4xl text-[#2a52be]">
          <FaGraduationCap />
        </div>
      </div>
      <div className="overflow-auto px-4 mt-4">
        <ul className="flex flex-col gap-2">
          <Link
            to={"/"}
            onClick={yearsActive}
            className={`p-2 outline-0 ${pageName == "studyYears" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] dark:hover:text-white duration-150"} text-md rounded-lg flex items-center gap-2 outline-0`}
          >
            <span>
              <MdTimer />
            </span>
            <span>سنيين دراسية</span>
          </Link>
          <Link
            to={"/sections"}
            onClick={sectionsActive}
            className={`p-2 outline-0 ${pageName == "sections" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] dark:hover:text-white duration-150"} text-md rounded-lg flex items-center gap-2 outline-0`}
          >
            <span>
              <PiChartPieSliceFill />
            </span>
            <span>أقسام</span>
          </Link>
          <Link
            to={"/subjects"}
            onClick={subjectsActive}
            className={`p-2 outline-0 ${pageName == "subjects" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] dark:hover:text-white duration-150"} text-md rounded-lg flex items-center gap-2 outline-0`}
          >
            <span>
              <PiBooksFill />
            </span>
            <span>المواد</span>
          </Link>
          <Link
            to={"/doctors"}
            onClick={doctorsActive}
            className={`p-2 outline-0 ${pageName == "doctors" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] dark:hover:text-white duration-150"} text-md rounded-lg flex items-center gap-2 outline-0`}
          >
            <span>
              <FaUserTie />
            </span>
            <span>الدكاترة</span>
          </Link>
          <Link
            to={"/students"}
            onClick={studentsActive}
            className={`p-2 outline-0 ${pageName == "students" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] dark:hover:text-white duration-150"} text-md rounded-lg flex items-center gap-2 outline-0`}
          >
            <span>
              <FaUserGraduate />
            </span>
            <span>الطلاب</span>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar