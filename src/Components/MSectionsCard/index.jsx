import { Link } from "react-router-dom"

const MSectionsCard = ({ name }) => {
  return (
    <Link
      to={`${name}`}
      className="min-h-[270px] w-full md:w-[45%] lg:w-[30%] flex justify-center items-center bg-[#171e2e26] dark:bg-gray-800 backdrop-blur text-lg text-dark border-t-3  border-[#2a52be] outline-0 rounded shadow-lg"
    >
      <span className="w-[130px] h-[130px] flex justify-center items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-semibold rounded-full">{name}</span>
    </Link>
  )
}

export default MSectionsCard