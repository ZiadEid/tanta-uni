import { useFormik } from 'formik';
import { MdOutlineLockOpen } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { BsAlphabet } from "react-icons/bs";
import { TbNumbers } from "react-icons/tb";
import { PopUpSchema } from './PopUpSchema';
import { useStore } from '../../Store';

const PopUpForm = () => {
  // form on submit function
  const onSubmit = async (values, actions) => {
    // setIsLoading(true)
    try {
      console.log(values)
      actions.resetForm();
      setTimeout(() => {
      }, 300);
    }
    catch (error) {
      // toast.error(error.response.data.message, { autoClose: 3000 });
      // setIsLoading(false);
    }
  }

  // formik hook for handling login form actions
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      yearName: '',
      yearNumber: ''
    },
    validationSchema: PopUpSchema,
    onSubmit
  });

  // PopUp Toggle
  const {popUpIsClosed} = useStore();

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
      {
        errors.yearName && touched.yearName &&
        <p className='error text-[#dc3545]'>{errors.yearName}</p>
      }
      <div className='flex'>
        <input
          className={`h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow`}
          type="password"
          name='yearNumber'
          placeholder='رقم السنة'
          value={values.yearNumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
          <TbNumbers />
        </div>
      </div>
      {
        errors.yearNumber && touched.yearNumber &&
        <p className='error text-[#dc3545]'>{errors.yearNumber}</p>
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