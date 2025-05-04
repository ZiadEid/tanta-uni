import { useFormik } from 'formik';
import { IoClose } from "react-icons/io5";
import { BsAlphabet } from "react-icons/bs";
import { TbNumbers } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";
import { PopUpSubjectsSchema } from './PopUpSubjectsSchema';
import { useStore } from '../../Store';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PopUpSubjects = ({ slug, getData }) => {
  const { mSection } = useParams();
  const navigate = useNavigate();
  // Global State
  const { BASE_URL, token, popUpIsClosed } = useStore();
  // Local State
  const [yearId, setYearId] = useState([]);
  const [years, setYears] = useState([]);
  const [doctorId, setDoctorId] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const getYears = async () => {
    try {
      const res = await axios.get(`${BASE_URL}year/findAll/${mSection}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newYears = [];
      const newId = [];
      res.data.years.forEach((el) => {
        newYears.push(el.name);
        newId.push(el._id);
      })
      setYears(newYears);
      setYearId(newId);
    } catch (error) {
      navigate("/error")
    }
  }

  const getDoctors = async () => {
    try {
      const res = await axios.get(`${BASE_URL}doctor/findAll/${mSection}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newDoctors = [];
      const newId = [];
      res.data.doctors.forEach((el) => {
        newDoctors.push(el.name);
        newId.push(el._id);
      })
      setDoctors(newDoctors);
      setDoctorId(newId);
    } catch (error) {
      navigate("/error")
    }
  }

  useEffect(() => {
    getYears();
    getDoctors();
  }, []);

  // form on submit function
  const onSubmit = async (values, actions) => {
    const newValues = {
      ...values,
      code: `${slug}${values.code}`,
      hoursNumber: `${values.hoursNumber}`,
      highestDegree: `${values.highestDegree}`,
      sectionName: `${mSection}`,
      doctorId: values.doctorId === "undefined" ? `${doctorId[0]}` : `${values.doctorId}`,
      yearId: values.yearId === "undefined" ? `${yearId[0]}` : `${values.yearId}`,
    }
    try {
      const res = await axios.post(`${BASE_URL}subject/createSubject`, newValues, {
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
      name: "",
      term: "FirstTerm",
      code: "",
      hoursNumber: "",
      highestDegree: "",
      doctorId: `${doctorId[0]}`,
      yearId: `${yearId[0]}`
    },
    validationSchema: PopUpSubjectsSchema,
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
      <div className='flex'>
        <input
          className={`h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow`}
          type="text"
          name='name'
          placeholder='اسم المادة'
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
          <BsAlphabet />
        </div>
      </div>
      {
        errors.name && touched.name &&
        <p className='error text-[#dc3545]'>{errors.name}</p>
      }
      <div className='relative'>
        <select
          name="term"
          value={values.term}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full h-[40px] text-lg bg-white border border-[#2b6cb033] rounded ps-3 cursor-pointer`}
        >
          <option value="FirstTerm">الترم الاول</option>
          <option value="SecondTerm">الترم الثاني</option>
        </select>
        <div className='absolute top-1/2 -translate-y-1/2 end-[10px] pointer-events-none'>
          <IoMdArrowDropdown />
        </div>
      </div>
      {
        errors.term && touched.term &&
        <p className='error text-[#dc3545]'>{errors.term}</p>
      }
      <div className='flex'>
        <input
          className={`h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow`}
          type="text"
          name='code'
          placeholder='كود المادة'
          value={values.code}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
          <BsAlphabet />
        </div>
      </div>
      {
        errors.code && touched.code &&
        <p className='error text-[#dc3545]'>{errors.code}</p>
      }
      <div className='flex'>
        <input
          className={`h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow`}
          type="number"
          name='hoursNumber'
          placeholder='ساعات المادة'
          value={values.hoursNumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
          <TbNumbers />
        </div>
      </div>
      {
        errors.hoursNumber && touched.hoursNumber &&
        <p className='error text-[#dc3545]'>{errors.hoursNumber}</p>
      }
      <div className='flex'>
        <input
          className={`h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow`}
          type="number"
          name='highestDegree'
          placeholder='اعلي درجة للمادة'
          value={values.highestDegree}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
          <TbNumbers />
        </div>
      </div>
      {
        errors.highestDegree && touched.highestDegree &&
        <p className='error text-[#dc3545]'>{errors.highestDegree}</p>
      }
      <div className='relative'>
        <select
          name="doctorId"
          value={values.doctorId}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full h-[40px] text-lg bg-white border border-[#2b6cb033] rounded ps-3 cursor-pointer`}
        >
          {
            doctors.map((doctor, index) => (
              <option key={doctorId[index]} value={doctorId[index]}>{doctor}</option>
            ))
          }
        </select>
        <div className='absolute top-1/2 -translate-y-1/2 end-[10px] pointer-events-none'>
          <IoMdArrowDropdown />
        </div>
      </div>
      {
        errors.doctorId && touched.doctorId &&
        <p className='error text-[#dc3545]'>{errors.doctorId}</p>
      }
      <div className='relative'>
        <select
          name="yearId"
          value={values.yearId}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full h-[40px] text-lg bg-white border border-[#2b6cb033] rounded ps-3 cursor-pointer`}
        >
          {
            years.map((year, index) => (
              <option key={yearId[index]} value={yearId[index]}>{year}</option>
            ))
          }
        </select>
        <div className='absolute top-1/2 -translate-y-1/2 end-[10px] pointer-events-none'>
          <IoMdArrowDropdown />
        </div>
      </div>
      {
        errors.yearId && touched.yearId &&
        <p className='error text-[#dc3545]'>{errors.yearId}</p>
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

export default PopUpSubjects