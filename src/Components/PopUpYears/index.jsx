import { useFormik } from 'formik';
import { IoClose } from "react-icons/io5";
import { BsAlphabet } from "react-icons/bs";
import { PopUpYearsSchema } from './PopUpYearsSchema';
import { useStore } from '../../Store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const PopUpYears = ({ getData }) => {
  const { mSection } = useParams();
  const { BASE_URL, token, popUpIsClosed } = useStore();

  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.post(`${BASE_URL}year/createYear`, values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      popUpIsClosed();
      toast.success(res.data.message, { autoClose: 1000 });
      getData();
      actions.resetForm();
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 2000 });
    }
  }

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      sectionName: `${mSection}`
    },
    validationSchema: PopUpYearsSchema,
    onSubmit
  });

  // Framer Motion variants for animation
  const formVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.3, ease: "easeIn" } }
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: "#2b6cb0" },
    tap: { scale: 0.95 }
  };

  return (
    <motion.form
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit}
      className='max-w-full w-[400px] flex flex-col gap-3 p-8 bg-[#f6f3f454] dark:bg-gray-800 text-dark rounded-lg shadow-lg relative'
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <span
        onClick={popUpIsClosed}
        className='absolute top-[5px] start-[5px] text-gray-900 dark:text-white hover:text-white hover:bg-red-500 duration-150 rounded-full text-sm p-[2px] cursor-pointer'
      >
        <IoClose />
      </span>
      <div className='flex'>
        <input
          className='h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow'
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
      {errors.name && touched.name && (
        <p className='error text-[#dc3545]'>{errors.name}</p>
      )}
      <motion.button
        disabled={isSubmitting}
        type='submit'
        className='h-[40px] mt-3 relative flex items-center justify-center gap-4 bg-[#3182ce] hover:bg-[#2b6cb0] text-white border border-[#3182ce] rounded duration-200 overflow-hidden cursor-pointer outline-none'
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        submit
      </motion.button>
    </motion.form>
  )
}

export default PopUpYears;
