import { useParams } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6";
import { useStore } from "../../Store";
import UserSide from "../../Components/userSide";
import EmployeeSide from "../EmployeeSide";
import DoctorsSide from "../DoctorsSide";


const Sidebar = () => {
  const { mSection } = useParams();
  const {
    closeSide,
    setCloseSide,
    user,
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
        <UserSide mSection={mSection} />
        {
          user && user.role === "employee"
          ?
          <EmployeeSide mSection={mSection} />
          :
          user.role === "doctor"
          ?
          <DoctorsSide />
          :
          <DoctorsSide />
        }
      </div>
    </div>
  )
}

export default Sidebar