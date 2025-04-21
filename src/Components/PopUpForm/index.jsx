import { useFormik } from 'formik';
import { IoClose } from "react-icons/io5";
import { BsAlphabet } from "react-icons/bs";
import { TbNumbers } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";
import { useStore } from '../../Store';
import { PopUpSectionsSchema } from '../PopUpSections/PopUpSectionsSchema';
import { PopUpSubjectsSchema } from './../PopUpSubjects/PopUpSubjectsSchema';
import { PopUpDoctorsSchema } from './../PopUpDoctors/PopUpDoctorsSchema';
import { PopUpYearsSchema } from './../PopUpYears/PopUpYearsSchema';
import { useEffect } from 'react';
import { PopUpStudentsSchema } from './../PopUpStudents/PopUpStudentsSchema';

const PopUpForm = () => {
  // PopUp Toggle
  const { pageName, popUpIsClosed, popUpInitValues } = useStore();

  // form on submit function
  const onSubmit = (values, actions) => {
    console.log(values)
    // popUpIsClosed()
    actions.resetForm();
  }

  useEffect(()=>{
    console.log(popUpInitValues)
  },[])

  // formik hook for handling login form actions
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      ...popUpInitValues
    },
    validationSchema: (
      pageName == "studyYears" ? PopUpYearsSchema
        :
        pageName == "sections" ? PopUpSectionsSchema
          :
          pageName == "subjects" ? PopUpSubjectsSchema
            :
            pageName == "doctors" ? PopUpDoctorsSchema
              :
              PopUpStudentsSchema
    ),
    onSubmit
  });

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-full w-[400px] flex flex-col gap-3 p-8 bg-[#f6f3f454] dark:bg-gray-800 text-dark rounded-lg shadow-lg relative'>
      <span
        onClick={popUpIsClosed}
        className='absolute top-[5px] start-[5px] text-gray-900 dark:text-white hover:text-white hover:bg-red-500 duration-150 rounded-full text-sm p-[2px] cursor-pointer'
      >
        <IoClose />
      </span>
      {
        pageName == "studyYears"
        &&
        <div className='flex'>
          <input
            className={`h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow`}
            type="text"
            name='yearName'
            placeholder='اسم السنة'
            value={values.yearName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
            <BsAlphabet />
          </div>
        </div>
      }
      {
        errors.yearName && touched.yearName &&
        <p className='error text-[#dc3545]'>{errors.yearName}</p>
      }
      {
        pageName == "sections"
        &&
        <div className='flex'>
          <input
            className={`h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow`}
            type="text"
            name='sectionName'
            placeholder='اسم المادة'
            value={values.sectionName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
            <BsAlphabet />
          </div>
        </div>
      }
      {
        errors.sectionName && touched.sectionName &&
        <p className='error text-[#dc3545]'>{errors.sectionName}</p>
      }
      {
        pageName == "sections"
        &&
        <div className='relative'>
          <select
            name="sectionYear"
            value={values.sectionYear}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full h-[40px] text-lg bg-white border border-[#2b6cb033] rounded ps-3`}
          >
            <option value="اولي">اولي</option>
            <option value="ثانية">ثانية</option>
            <option value="ثالثة">ثالثة</option>
            <option value="رابعة">رابعة</option>
          </select>
          <div className='absolute top-1/2 -translate-y-1/2 end-[10px] pointer-events-none'>
            <IoMdArrowDropdown />
          </div>
        </div>
      }
      {
        errors.sectionYear && touched.sectionYear &&
        <p className='error text-[#dc3545]'>{errors.sectionYear}</p>
      }
      {
        pageName == "subjects"
        &&
        <div className='flex'>
          <input
            className={`h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow`}
            type="text"
            name='subjectName'
            placeholder='اسم المادة'
            value={values.subjectName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
            <BsAlphabet />
          </div>
        </div>
      }
      {
        errors.subjectName && touched.subjectName &&
        <p className='error text-[#dc3545]'>{errors.subjectName}</p>
      }
      {
        pageName == "subjects"
        &&
        <div className='flex'>
          <input
            className={`h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow`}
            type="text"
            name='subjectCode'
            placeholder='كود المادة'
            value={values.subjectCode}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
            <BsAlphabet />
          </div>
        </div>
      }
      {
        errors.subjectCode && touched.subjectCode &&
        <p className='error text-[#dc3545]'>{errors.subjectCode}</p>
      }
      {
        pageName == "subjects"
        &&
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
      }
      {
        errors.hoursNumber && touched.hoursNumber &&
        <p className='error text-[#dc3545]'>{errors.hoursNumber}</p>
      }
      {
        pageName == "subjects"
        &&
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
      }
      {
        errors.highestDegree && touched.highestDegree &&
        <p className='error text-[#dc3545]'>{errors.highestDegree}</p>
      }
      {
        pageName == "subjects"
        &&
        <div className='relative'>
          <select
            name="doctorId"
            value={values.doctorId}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full h-[40px] text-lg bg-white border border-[#2b6cb033] rounded ps-3`}
          >
            <option value="محمد عبدالسميع">محمد عبدالسميع</option>
            <option value="محمود اسماعيل">محمود اسماعيل</option>
            <option value="ربيع منصور">ربيع منصور</option>
          </select>
          <div className='absolute top-1/2 -translate-y-1/2 end-[10px] pointer-events-none'>
            <IoMdArrowDropdown />
          </div>
        </div>
      }
      {
        errors.doctorId && touched.doctorId &&
        <p className='error text-[#dc3545]'>{errors.doctorId}</p>
      }
      {
        pageName == "subjects"
        &&
        <div className='relative'>
          <select
            name="sectionId"
            value={values.sectionId}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full h-[40px] text-lg bg-white border border-[#2b6cb033] rounded ps-3`}
          >
            <option value="محاسبة">محاسبة</option>
            <option value="تسويق">تسويق</option>
          </select>
          <div className='absolute top-1/2 -translate-y-1/2 end-[10px] pointer-events-none'>
            <IoMdArrowDropdown />
          </div>
        </div>
      }
      {
        errors.sectionId && touched.sectionId &&
        <p className='error text-[#dc3545]'>{errors.sectionId}</p>
      }
      {
        pageName == "subjects"
        &&
        <div className='relative'>
          <select
            name="yearId"
            value={values.yearId}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full h-[40px] text-lg bg-white border border-[#2b6cb033] rounded ps-3`}
          >
            <option value="اولي">اولي</option>
            <option value="ثانية">ثانية</option>
            <option value="ثالثة">ثالثة</option>
            <option value="رابعة">رابعة</option>
          </select>
          <div className='absolute top-1/2 -translate-y-1/2 end-[10px] pointer-events-none'>
            <IoMdArrowDropdown />
          </div>
        </div>
      }
      {
        errors.yearId && touched.yearId &&
        <p className='error text-[#dc3545]'>{errors.yearId}</p>
      }
      {
        pageName == "doctors"
        &&
        <div className='flex'>
          <input
            className={`h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow`}
            type="text"
            name='doctorName'
            placeholder='اسم الدكتور'
            value={values.doctorName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
            <BsAlphabet />
          </div>
        </div>
      }
      {
        errors.doctorName && touched.doctorName &&
        <p className='error text-[#dc3545]'>{errors.doctorName}</p>
      }
      {
        pageName == "doctors"
        &&
        <div className='relative'>
          <select
            name="doctorMajor"
            value={values.doctorMajor}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full h-[40px] text-lg bg-white border border-[#2b6cb033] rounded ps-3`}
          >
            <option value="محاسبة">محاسبة</option>
            <option value="تسويق">تسويق</option>
          </select>
          <div className='absolute top-1/2 -translate-y-1/2 end-[10px] pointer-events-none'>
            <IoMdArrowDropdown />
          </div>
        </div>
      }
      {
        errors.doctorMajor && touched.doctorMajor &&
        <p className='error text-[#dc3545]'>{errors.doctorMajor}</p>
      }
      {
        pageName == "students"
        &&
        <div className='flex'>
          <input
            className={`h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow`}
            type="text"
            name='studentName'
            placeholder='اسم الطالب'
            value={values.studentName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
            <BsAlphabet />
          </div>
        </div>
      }
      {
        errors.studentName && touched.studentName &&
        <p className='error text-[#dc3545]'>{errors.studentName}</p>
      }
      {
        pageName == "students"
        &&
        <div className='relative'>
          <select
            name="studentMajor"
            value={values.studentMajor}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full h-[40px] text-lg bg-white border border-[#2b6cb033] rounded ps-3`}
          >
            <option value="محاسبة">محاسبة</option>
            <option value="تسويق">تسويق</option>
          </select>
          <div className='absolute top-1/2 -translate-y-1/2 end-[10px] pointer-events-none'>
            <IoMdArrowDropdown />
          </div>
        </div>
      }
      {
        errors.studentMajor && touched.studentMajor &&
        <p className='error text-[#dc3545]'>{errors.studentMajor}</p>
      }
      {
        pageName == "students"
        &&
        <div className='relative'>
          <select
            name="yearId"
            value={values.yearId}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full h-[40px] text-lg bg-white border border-[#2b6cb033] rounded ps-3`}
          >
            <option value="اولي">اولي</option>
            <option value="ثانية">ثانية</option>
            <option value="ثالثة">ثالثة</option>
            <option value="رابعة">رابعة</option>
          </select>
          <div className='absolute top-1/2 -translate-y-1/2 end-[10px] pointer-events-none'>
            <IoMdArrowDropdown />
          </div>
        </div>
      }
      {
        errors.yearId && touched.yearId &&
        <p className='error text-[#dc3545]'>{errors.yearId}</p>
      }
      <button
        disabled={isSubmitting}
        type='submit'
        className='h-[40px] mt-3 relative flex items-center justify-center gap-4 bg-[#3182ce] hover:bg-[#2b6cb0] text-white border border-[#3182ce] rounded duration-200 overflow-hidden cursor-pointer'
      >
        submit
      </button>
    </form>
  )
}

export default PopUpForm