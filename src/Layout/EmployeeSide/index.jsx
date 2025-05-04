import { Link, useParams } from 'react-router-dom'
import { useStore } from '../../Store';
import { FaUserTie } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";
import { PiBooksFill } from "react-icons/pi";
import { PiChartPieSliceFill } from "react-icons/pi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const EmployeeSide = () => {
  const { mSection } = useParams();
  const { pageName, closeSide } = useStore();

  return (
    <ul className="flex flex-col gap-2">
      <Link
        to={`/${mSection}/study-years`}
        className={`p-2 outline-0 ${pageName == "studyYears" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] hover:ps-3 dark:hover:text-white duration-150"} text-md rounded-lg flex ${!closeSide && "md:justify-center lg:justify-center"} justify-center md:justify-start items-center gap-2`}
      >
        <MdTimer />
        <span className={`${!closeSide && "md:hidden"} hidden md:block shrink-0`}>
          سنيين دراسية
        </span>
      </Link>
      {/* <Link
        to={`/${mSection}/sections`}
        className={`p-2 outline-0 ${pageName == "sections" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] hover:ps-3 dark:hover:text-white duration-150"} text-md rounded-lg flex ${!closeSide && "md:justify-center lg:justify-center"} justify-center md:justify-start items-center gap-2`}
      >
        <PiChartPieSliceFill />
        <span className={`${!closeSide && "md:hidden"} hidden md:block shrink-0`}>
          تخصصات
        </span>
      </Link> */}
      <Link
        to={`/${mSection}/doctors`}
        className={`p-2 outline-0 ${pageName == "doctors" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] hover:ps-3 dark:hover:text-white duration-150"} text-md rounded-lg flex ${!closeSide && "md:justify-center lg:justify-center"} justify-center md:justify-start items-center gap-2`}
      >
        <FaUserTie />
        <span className={`${!closeSide && "md:hidden"} hidden md:block shrink-0`}>
          الدكاترة
        </span>
      </Link>
      <Link
        to={`/${mSection}/subjects`}
        className={`p-2 outline-0 ${pageName == "subjects" || pageName == "markes" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] hover:ps-3 dark:hover:text-white duration-150"} text-md rounded-lg flex ${!closeSide && "md:justify-center lg:justify-center"} justify-center md:justify-start items-center gap-2`}
      >
        <PiBooksFill />
        <span className={`${!closeSide && "md:hidden"} hidden md:block shrink-0`}>
          المواد
        </span>
      </Link>
      <Link
        to={`/${mSection}/students`}
        className={`p-2 outline-0 ${pageName == "students" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] hover:ps-3 dark:hover:text-white duration-150"} text-md rounded-lg flex ${!closeSide && "md:justify-center lg:justify-center"} justify-center md:justify-start items-center gap-2`}
      >
        <FaUserGraduate />
        <span className={`${!closeSide && "md:hidden"} hidden md:block shrink-0`}>
          الطلاب
        </span>
      </Link>
    </ul>
  )
}

export default EmployeeSide