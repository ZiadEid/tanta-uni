import style from "./index.module.css"
import { FaBarsStaggered } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6";
import { useStore } from "../../Store";
import UserSide from "../../Components/userSide";
import EmployeeSide from "../EmployeeSide";
import DoctorsSide from "../DoctorsSide";
import StudentSide from "../StudentSide";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const Sidebar = () => {
  const { closeSide, setCloseSide, user } = useStore();

  return (
    <motion.div
      animate={{
        width: closeSide ? "fit-content" : "fit-content"
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="h-screen flex flex-col bg-[#fcfcfc] dark:bg-gray-900 text-gray-500 dark:text-white border-e border-gray-200 dark:border-gray-700 border-dashed font-semibold relative"
    >
      <motion.div
        key={closeSide ? "open" : "closed"}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ ease: "easeOut", duration: 0.3 }}
        onClick={setCloseSide}
        className="open-icon text-md text-black dark:text-white bg-[#fcfcfc] dark:bg-[#171e2e] p-2 border border-gray-200 dark:border-gray-700 border-dashed rounded-e absolute start-[100%] top-[20px] z-40 cursor-pointer hidden md:block
    hover:shadow-lg transition-shadow duration-300"
      >
        {closeSide ? <FaBarsStaggered /> : <FaBars />}
      </motion.div>

      <Link
        to={"/"}
        className="logo flex justify-center items-center gap-2 xl:text-xl lg:text-lg px-2 md:px-4 py-6"
      >
        {
          closeSide
          &&
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: closeSide ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 hidden md:block">
            Tanta University
          </motion.h1>
        }
        <FaGraduationCap className="xl:text-5xl text-4xl text-[#2a52be] shrink-0" />
      </Link>
      <div
        className={`grow overflow-auto px-2 md:px-4 bg-[url('/Assets/side.jpg')] bg-cover bg-center relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#ffffffde] dark:before:bg-[#101828de]`}
      >
        <div className="relative">
          <UserSide />
          {
            user && user.role === "employee"
              ?
              <EmployeeSide />
              :
              user && user.role === "doctor"
                ?
                <DoctorsSide />
                :
                <StudentSide />
          }
        </div>
      </div>
    </motion.div>
  )
}

export default Sidebar