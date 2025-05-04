import { Link } from "react-router-dom"
import { MdEditDocument } from "react-icons/md";
import { useStore } from "../../Store";
import { useEffect } from "react";

const MSectionsCard = ({ name, id, getOneData }) => {
  const { confirmationUpdate, confirmationPopUpIsOpen } = useStore();
  return (
    <Link
      to={`${name}`}
      className="group min-h-[400px] w-full md:w-[45%] lg:w-[30%] flex justify-center items-center bg-[#171e2e26] dark:bg-gray-800 backdrop-blur text-lg text-dark border-b-3  border-[#2a52be] outline-0 rounded shadow-lg relative"
    >
      <div
        onClick={(e) => {
          e.preventDefault();
          confirmationUpdate();
          confirmationPopUpIsOpen();
          getOneData(id);
        }}
      >
        <MdEditDocument
          className="absolute top-0 end-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl text-blue-600"
        />
      </div>
      <span
        className="w-[170px] h-[170px] p-3 text-center flex justify-center items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-semibold rounded-full"
      >
        {name}
      </span>
    </Link>
  )
}

export default MSectionsCard