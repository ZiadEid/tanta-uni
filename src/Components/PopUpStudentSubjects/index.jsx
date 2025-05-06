import { useFormik } from 'formik';
import { IoClose } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { PopUpStudentSubjectsSchema } from './PopUpStudentSubjectsSchema';
import { useStore } from '../../Store';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PopUpStudentSubjects = ({ data, getData }) => {
  const { yearId } = useParams();
  const navigate = useNavigate();
  // Global State
  const { BASE_URL, token, user, popUpIsClosed } = useStore();
  // Local State
  const [yearSubjectsId, setYearSubjectsId] = useState([]);
  const [yearSubjects, setYearSubjects] = useState([]);

  const getYearSubjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}subject/getYearSubjects/${yearId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newYearSubjects = [];
      const newId = [];
      res.data.subjects.forEach((el, index) => {
        if (data[index] !== el._id) {
          newYearSubjects.push(el.name);
          newId.push(el._id);
        }
      })
      setYearSubjects(newYearSubjects);
      setYearSubjectsId(newId);
    } catch (error) {
      navigate("/error")
    }
  }

  useEffect(() => {
    getYearSubjects();
  }, []);

  // form on submit function
  const onSubmit = async (values, actions) => {
    const newValues = {
      ...values,
      subjectId: `${values.subjectId === "undefined" ? yearSubjectsId[0] : values.subjectId}`,
      studentId: `${user.id}`
    }
    try {
      const res = await axios.post(`${BASE_URL}student/addSubjectToStudent`, newValues, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      popUpIsClosed();
      const notify = () => toast.success(`${res.data.message}`, { autoClose: 1000 });
      notify();
      actions.resetForm();
      getData();
    } catch (error) {
      const notify = () => toast.error(`${error.response.data.message}`, { autoClose: 2000 });
      notify();
    }
  }

  // formik hook for handling login form actions
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      subjectId: `${yearSubjectsId[0]}`,
    },
    validationSchema: PopUpStudentSubjectsSchema,
    onSubmit
  });

  return (
    <form
      onClick={(e) => { e.stopPropagation() }}
      onSubmit={handleSubmit}
      className='max-w-full w-[400px] flex flex-col gap-3 p-8 bg-[#f6f3f454] dark:bg-gray-800 text-dark rounded-lg shadow-lg relative'>
      <span
        onClick={popUpIsClosed}
        className='absolute top-[5px] start-[5px] text-gray-900 dark:text-white hover:text-white hover:bg-red-500 duration-150 rounded-full text-sm p-[2px] cursor-pointer'
      >
        <IoClose />
      </span>
      <div className='relative'>
        <select
          name="subjectId"
          value={values.subjectId}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full h-[40px] text-lg bg-white border border-[#2b6cb033] rounded ps-3 cursor-pointer`}
        >
          {
            yearSubjects.map((subject, index) => (
              <option key={yearSubjectsId[index]} value={yearSubjectsId[index]}>{subject}</option>
            ))
          }
        </select>
        <div className='absolute top-1/2 -translate-y-1/2 end-[10px] pointer-events-none'>
          <IoMdArrowDropdown />
        </div>
      </div>
      {
        errors.subjectId && touched.subjectId &&
        <p className='error text-[#dc3545]'>{errors.subjectId}</p>
      }
      <button
        disabled={isSubmitting}
        type='submit'
        className='h-[40px] mt-3 relative flex items-center justify-center gap-4 bg-[#3182ce] hover:bg-[#2b6cb0] text-white border border-[#3182ce] rounded duration-200 overflow-hidden cursor-pointer outline-none'
      >
        submit
      </button>
    </form>
  )
}

export default PopUpStudentSubjects