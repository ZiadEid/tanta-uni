import { useParams } from "react-router-dom";
import { useStore } from "../../Store";
import style from "./index.module.css";
import { HiOutlineArrowLongRight, HiOutlineArrowLongLeft } from "react-icons/hi2";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SubmitSheet = ({ getData, headers, tableData, id }) => {
  const { BASE_URL, token, singleSubject } = useStore();
  const { subjectsId } = useParams();
  const [studentDegrees, setStudentDegrees] = useState([]);
  const inputRefs = useRef([]);

  const collectValues = () => {
    const inputValues = inputRefs.current.map((input) => input?.value || "0");
    const newvalues = []
    id.forEach((id, index) => {
      newvalues.push({
        studentId: id,
        subjectDegree: inputValues[index],
      })
      setStudentDegrees([...newvalues])
    });
  };

  const postDegree = async () => {
    const values = {
      subjectId: subjectsId,
      highestDegree: singleSubject.highestDegree,
      studentDegrees: studentDegrees,
    }

    console.log(values)

    try {
      const res = await axios.post(`${BASE_URL}degree/createDegree`, values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const notify = () => toast.success(`${res.data.message}`, { autoClose: 2000 });
      notify();
      getData();
    } catch (error) {
      const notify = () => toast.error(`${error.response.data.message}`, { autoClose: 2000 });
      notify();
      
    }
  }

  return (
    <div className='px-6 mt-2'>
      <div>
        <div className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2">
          <div>
            <p
              className="px-10 py-3 text-center md:text-start p-2 bg-gray-100 dark:bg-gray-800 shadow text-[#171e2e] dark:text-gray-300 rounded"
            >
              <span>{singleSubject.name}</span> - <span>{singleSubject.highestDegree} درجة</span>
            </p>
          </div>
          <div
            onClick={() => collectValues()}
            className="addnew group flex items-center justify-center gap-4 bg-gray-100 dark:bg-gray-800 md:w-fit sm:w-full px-4 py-2 text-[#171e2e] dark:text-gray-400 rounded-lg border-2 border-gray-500 dark:border-gray-600 border-dashed cursor-pointer"
          >
            <span className="group-hover:text-gray-900 dark:group-hover:text-white duration-150">
              رفع الدرجات
            </span>
          </div>
          <div
            onClick={() => postDegree()}
            className="addnew group flex items-center justify-center gap-4 bg-gray-100 dark:bg-gray-800 md:w-fit sm:w-full px-4 py-2 text-[#171e2e] dark:text-gray-400 rounded-lg border-2 border-gray-500 dark:border-gray-600 border-dashed cursor-pointer"
          >
            <span className="group-hover:text-gray-900 dark:group-hover:text-white duration-150">
              تاكيد الدرجات
            </span>
          </div>
        </div>
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
                    <td>
                      <input
                        className="text-sm px-4 py-6"
                        ref={(input) => (inputRefs.current[0] = input)}
                        placeholder="0"
                      />
                    </td>
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

export default SubmitSheet