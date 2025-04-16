import { useFormik } from 'formik';
import { IoClose } from "react-icons/io5";
import { BsAlphabet } from "react-icons/bs";
import { TbNumbers } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";
import { PopUpSubjectsSchema } from './PopUpSubjectsSchema';
import { useStore } from '../../Store';

const PopUpSubjects = ({ setRow }) => {
  // PopUp Toggle
  const { popUpIsClosed } = useStore();

  // form on submit function
  const onSubmit = (values, actions) => {
    setRow((prev) => [values, ...prev,]);
    popUpIsClosed()
    actions.resetForm();
  }

  // formik hook for handling login form actions
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      subjectName: "",
      subjectCode: "",
      hoursNumber: "",
      highestDegree: "",
      doctorId: "محمد عبدالسميع",
      sectionId: "محاسبة",
      yearId: "اولي"
    },
    validationSchema: PopUpSubjectsSchema,
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
      {
        errors.subjectName && touched.subjectName &&
        <p className='error text-[#dc3545]'>{errors.subjectName}</p>
      }
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
      {
        errors.subjectCode && touched.subjectCode &&
        <p className='error text-[#dc3545]'>{errors.subjectCode}</p>
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
      {
        errors.doctorId && touched.doctorId &&
        <p className='error text-[#dc3545]'>{errors.doctorId}</p>
      }
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
      {
        errors.sectionId && touched.sectionId &&
        <p className='error text-[#dc3545]'>{errors.sectionId}</p>
      }
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

export default PopUpSubjects