import { useFormik } from 'formik';
import logo from '../../Assets/logo.png';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaIdCard } from "react-icons/fa6";
import { MdOutlineLockOpen } from "react-icons/md";
import { loginSchema } from './LoginSchema';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  // form on submit function
  const onSubmit = async (values, actions) => {
    // setIsLoading(true)
    try {
      console.log(values)
      actions.resetForm();
      setTimeout(() => {
        navigate("/")
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
      userType: 'employee',
      nationalID: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit
  });
  return (
    <div className='max-w-full w-[400px] p-8 pt-[80px] bg-[#171e2e26] dark:bg-gray-800 backdrop-blur text-dark border-b-3 border-[#3182ce] rounded shadow-lg relative'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-3'
      >
        <img src={logo} alt="Tanta Universaty" className='w-30 h-30 rounded-full absolute top-0 left-50 -translate-1/2 border-6 border-[#fcfcfc] dark:border-gray-900 bg-gray-800 shadow' />
        <div className='relative'>
          <select
            name="userType"
            value={values.userType}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full h-[40px] text-lg bg-white border border-[#2b6cb033] rounded ps-3`}
          >
            <option value="employee">شؤون ادارية</option>
            <option value="doctor">دكتور جامعي</option>
            <option value="student">طالب جامعي</option>
          </select>
          <div className='absolute top-1/2 -translate-y-1/2 end-[10px] pointer-events-none'>
            <IoMdArrowDropdown />
          </div>
        </div>
        {
          errors.userType && touched.userType &&
          <p className='error text-[#dc3545]'>{errors.userType}</p>
        }
        <div className='flex'>
          <input
            type="number"
            name='nationalID'
            placeholder='رقم البطاقة (14 رقم)'
            value={values.nationalID}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow`}
          />
          <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
            <FaIdCard />
          </div>
        </div>
        {
          errors.nationalID && touched.nationalID &&
          <p className='error text-[#dc3545]'>{errors.nationalID}</p>
        }
        <div className='flex'>
          <input
            className={`h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow`}
            type="password"
            name='password'
            placeholder='الرقم السري'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
            <MdOutlineLockOpen />
          </div>
        </div>
        {
          errors.password && touched.password &&
          <p className='error text-[#dc3545]'>{errors.password}</p>
        }
        <button
          disabled={isSubmitting}
          type='submit'
          className='h-[40px] mt-3 relative flex items-center justify-center gap-4 bg-[#3182ce] hover:bg-[#2b6cb0] text-white border border-[#3182ce] rounded duration-200 overflow-hidden cursor-pointer'
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm