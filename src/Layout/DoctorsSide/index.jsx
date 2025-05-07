import { Link } from 'react-router-dom'
import { useStore } from '../../Store';
import { PiBooksFill } from "react-icons/pi";

const DoctorsSide = () => {
  const { pageName, closeSide } = useStore();

  return (
    <ul className="flex flex-col gap-2">
      <Link
        to={`/doctor-subjects`}
        className={`p-2 outline-0 ${pageName == "doctorSubjects" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] hover:ps-3 dark:hover:text-white duration-150"} text-md rounded-lg flex ${!closeSide && "md:justify-center lg:justify-center"} justify-center md:justify-start items-center gap-2`}
      >
        <PiBooksFill />
        <span className={`${!closeSide && "md:hidden"} hidden md:block shrink-0`}>
         المواد الدراسية
        </span>
      </Link>
    </ul>
  )
}

export default DoctorsSide