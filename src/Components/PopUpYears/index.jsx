import { useFormik } from 'formik';
import { IoClose } from "react-icons/io5";
import { BsAlphabet } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { PopUpYearsSchema } from './PopUpYearsSchema';
import { useStore } from '../../Store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const PopUpYears = ({ getData }) => {
  const { BASE_URL, token, popUpIsClosed } = useStore();
  const { mSection } = useParams();

  // form on submit function
  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.post(`${BASE_URL}year/createYear`, values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      popUpIsClosed();
      const notify = () => toast.success(`${res.data.message}`, { autoClose: 2000 });
      notify();
      getData();
      actions.resetForm();
    } catch (error) {
      const notify = () => toast.error(`${error.response.data.message}`, { autoClose: 2000 });
      notify();
    }
  }

  // formik hook for handling login form actions
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      sectionName: `${mSection}`
    },
    validationSchema: PopUpYearsSchema,
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
          name='name'
          placeholder='اسم السنة'
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

export default PopUpYears