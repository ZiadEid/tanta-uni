import style from "./index.module.css"
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { HiOutlineArrowLongRight, HiOutlineArrowLongLeft } from "react-icons/hi2";
import { FaEye, FaPlus } from "react-icons/fa";
import { useStore } from "../../Store";
import { Link } from "react-router-dom";
import { useEffect } from "react";


const Table = ({ headers, tableData, id, deleteRow }) => {
  const { user, setSingleSubject, pageName } = useStore();
  useEffect(() => {
    console.log(pageName)
  }, [])

  return (
    <div className='px-6'>
      <div>
        <div className="overflow-auto">
          <table className="min-w-[800px] table-auto w-full border-separate border-spacing-y-4">
            <thead>
              <tr className={`${style.shadowCustomed} rounded bg-gray-100 dark:bg-gray-800 shadow-lg text-gray-800 dark:text-gray-300`}>
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
                  <tr key={id[index]} className={`${style.shadowCustomed} rounded-lg bg-gray-100 dark:bg-gray-800 shadow text-black dark:text-white`}>
                    <td className="text-sm px-4 py-6">{index + 1}</td>
                    {
                      Object.keys(el).map((key) => (
                        <td key={key} className="max-w-[250px] text-sm px-4 py-6">{el[key]}</td>
                      ))
                    }
                    {
                      pageName !== "doctorSubject"
                      &&
                      <td className="flex items-center gap-2">
                        {
                          user.role === "employee"
                          &&
                          <div className="text-lg px-2 py-6 text-orange-500 dark:text-yellow-500 cursor-pointer">
                            <BiSolidEdit />
                          </div>
                        }
                        {
                          pageName !== "markes"
                          &&
                          <div
                            onClick={() => deleteRow(id[index])}
                            className="text-lg px-2 py-6 text-red-500 hover:text-red-600 duration-150 cursor-pointer"
                          >
                            <MdDelete />
                          </div>
                        }
                      </td>
                    }
                    {
                      pageName === "doctorSubject"
                      &&
                      <td>
                        <Link
                          to={`${id[index]}`}
                          onClick={() => {
                            setSingleSubject({
                              name: el.name,
                              highestDegree: el.highestDegree
                            })
                          }}
                          className="text-lg py-6 text-blue-600"
                        >
                          <FaEye />
                        </Link>
                      </td>
                    }
                    {
                      pageName == "subjects"
                      &&
                      <td>
                        <div className="flex items-center gap-2">
                          <Link
                            to={`${id[index]}`}
                            onClick={() => {
                              setSingleSubject({
                                name: el.name,
                                highestDegree: el.highestDegree
                              })
                            }}
                            className="text-sm px-2 py-6 text-green-600"
                          >
                            <FaPlus />
                          </Link>
                          <Link
                            to={`${id[index]}/markes`}
                            onClick={() => {
                              setSingleSubject({
                                name: el.name,
                                highestDegree: el.highestDegree
                              })
                            }}
                            className="text-lg px-2 py-6 text-blue-600"
                          >
                            <FaEye />
                          </Link>
                        </div>
                      </td>
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className={`${style.shadowCustomed} mb-4 px-4 py-6 bg-gray-100 dark:bg-gray-800 shadow-lg text-gray-900 dark:text-gray-400 rounded flex justify-center items-center md:gap-2`}>
          <div className="cursor-pointer hover:text-white hover:bg-gray-900 p-2 rounded-full">
            <HiOutlineArrowLongRight />
          </div>
          <p>صفحة <span className="px-2 py-px text-gray-900 dark:text-white">1</span> من <span className="px-2 py-px text-gray-500">4</span></p>
          <div className="cursor-pointer hover:text-white hover:bg-gray-900 p-2 rounded-full">
            <HiOutlineArrowLongLeft />
          </div>
        </div>
      </div>
    </div >
  )
}

export default Table