import style from "./index.module.css"
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { HiOutlineArrowLongRight, HiOutlineArrowLongLeft } from "react-icons/hi2";
import { TiPlus } from "react-icons/ti";
import { useStore } from "../../Store";


const Table = ({ headers, tableData }) => {
  // PopUp Toggle
  const { popUpIsOpen } = useStore();

  return (
    <div className='px-6 mt-2'>
      <div>
        <div className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2">
          <div className="search-btn">
            <input className="w-full text-center md:text-start p-2 bg-gray-100 dark:bg-[#171e2e] shadow text-[#171e2e] dark:text-white rounded" type="search" name="search" placeholder="Search" />
          </div>
          <div
            onClick={popUpIsOpen}
            className="addnew group flex items-center justify-center gap-4 bg-gray-100 dark:bg-[#171e2e] md:w-fit sm:w-full px-4 py-2 text-[#171e2e] dark:text-gray-400 rounded-lg border-2 border-gray-500 dark:border-gray-600 border-dashed cursor-pointer"
          >
            <div className="group-hover:shadow dark:group-hover:text-white duration-150 p-[5px] text-sm bg-white shadow dark:bg-gray-900 rounded-full">
              <TiPlus />
            </div>
            <span className="group-hover:text-gray-900 dark:group-hover:text-white duration-150">Add New</span>
          </div>
        </div>
        <div className="overflow-auto">
          <table className="min-w-[800px] table-auto w-full border-separate border-spacing-y-4">
            <thead>
              <tr className={`${style.shadowCustomed} rounded bg-white dark:bg-[#171e2e] shadow-lg text-gray-500 dark:text-gray-300`}>
                {
                  headers.map((header, index) => (
                    <th key={index} className={`text-start text-sm px-4 py-6`}>{header}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                tableData.map((el, index) => (
                  <tr key={index} className={`${style.shadowCustomed} rounded-lg bg-white dark:bg-[#171e2e] shadow text-gray-900 dark:text-white`}>
                    <td className="text-sm px-4 py-6">{el.id}</td>
                    <td className="max-w-[250px] text-sm px-4 py-6">{el.yearName}</td>
                    <td className="max-w-[300px] text-sm px-4 py-6">{el.adress}</td>
                    <td className="max-w-[300px] text-sm px-4 py-6">{el.specialty}</td>
                    <td className="max-w-[250px] text-sm px-4 py-6">{el.feild}</td>
                    <td className="flex items-center gap-2">
                      <div className="text-lg px-2 py-6 text-orange-500 dark:text-yellow-500 cursor-pointer">
                        <BiSolidEdit />
                      </div>
                      <div className="text-lg px-2 py-6 text-red-500 hover:text-red-600 duration-150 cursor-pointer">
                        <MdDelete />
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className={`${style.shadowCustomed} mb-4 px-4 py-6 bg-white dark:bg-[#171e2e] shadow-lg text-gray-900 dark:text-gray-400 rounded flex justify-center items-center md:gap-2`}>
          <div className="cursor-pointer hover:text-white hover:bg-gray-900 p-2 rounded-full">
            <HiOutlineArrowLongRight />
          </div>
          <p>صفحة <span className="px-2 py-px text-gray-900 dark:text-white">1</span> من <span className="px-2 py-px text-gray-500">4</span></p>
          <div className="cursor-pointer hover:text-white hover:bg-gray-900 p-2 rounded-full">
            <HiOutlineArrowLongLeft />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table