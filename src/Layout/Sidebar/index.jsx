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
import { useState } from "react";

const Sidebar = () => {
  const [closeSide, setCloseSide] = useState(true)
  const {
    pageName,
    yearsActive,
    sectionsActive,
    subjectsActive,
    doctorsActive,
    studentsActive,
  } = useStore();

  return (
    <div
      className={`w-fit ${closeSide && "lg:w-fit md:w-[50%]"} h-screen flex flex-col bg-[#fcfcfc] dark:bg-gray-900 text-gray-500 dark:text-white border-e border-gray-200 dark:border-gray-700 border-dashed font-semibold relative`}
    >
      <div
        onClick={() => setCloseSide(!closeSide)}
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
      <div className="overflow-auto px-4 mt-4">
        <ul className="flex flex-col gap-2">
          <Link
            to={"/"}
            onClick={() => {
              yearsActive();
              localStorage.setItem("pageName", "studyYears")
            }
            }
            className={`p-2 outline-0 ${pageName == "studyYears" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] dark:hover:text-white duration-150"} text-md rounded-lg flex ${!closeSide && "md:justify-center"} justify-center md:justify-start items-center gap-2 outline-0`}
          >
            <MdTimer />
            <span className={`${!closeSide && "md:hidden"} hidden md:block shrink-0`}>سنيين دراسية</span>
          </Link>
          <Link
            to={"/sections"}
            onClick={() => {
              sectionsActive();
              localStorage.setItem("pageName", "sections")
            }
            }
            className={`p-2 outline-0 ${pageName == "sections" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] dark:hover:text-white duration-150"} text-md rounded-lg flex ${!closeSide && "md:justify-center"} justify-center md:justify-start items-center gap-2 outline-0`}
          >
            <PiChartPieSliceFill />
            <span className={`${!closeSide && "md:hidden"} hidden md:block shrink-0`}>أقسام</span>
          </Link>
          <Link
            to={"/subjects"}
            onClick={() => {
              subjectsActive();
              localStorage.setItem("pageName", "subjects")
            }
            }
            className={`p-2 outline-0 ${pageName == "subjects" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] dark:hover:text-white duration-150"} text-md rounded-lg flex ${!closeSide && "md:justify-center"} justify-center md:justify-start items-center gap-2 outline-0`}
          >
            <PiBooksFill />
            <span className={`${!closeSide && "md:hidden"} hidden md:block shrink-0`}>المواد</span>
          </Link>
          <Link
            to={"/doctors"}
            onClick={() => {
              doctorsActive();
              localStorage.setItem("pageName", "doctors")
            }
            }
            className={`p-2 outline-0 ${pageName == "doctors" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] dark:hover:text-white duration-150"} text-md rounded-lg flex ${!closeSide && "md:justify-center"} justify-center md:justify-start items-center gap-2 outline-0`}
          >
            <FaUserTie />
            <span className={`${!closeSide && "md:hidden"} hidden md:block shrink-0`}>الدكاترة</span>
          </Link>
          <Link
            to={"/students"}
            onClick={() => {
              studentsActive();
              localStorage.setItem("pageName", "students")
            }
            }
            className={`p-2 outline-0 ${pageName == "students" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] dark:hover:text-white duration-150"} text-md rounded-lg flex ${!closeSide && "md:justify-center"} justify-center md:justify-start items-center gap-2 outline-0`}
          >
            <FaUserGraduate />
            <span className={`${!closeSide && "md:hidden"} hidden md:block shrink-0`}>الطلاب</span>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar