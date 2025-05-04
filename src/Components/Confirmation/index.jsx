import { useEffect } from "react";
import { useStore } from "../../Store";

const Confirmation = ({ type, passedFunction, id }) => {
  const { confirmationPopUpIsClosed } = useStore();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className='max-w-full w-[400px] flex flex-col gap-3 p-8 bg-[#f6f3f454] dark:bg-gray-800 text-dark rounded-lg shadow-lg relative'>
      <h2 className="text-2xl text-center dark:text-white my-4">تاكيد {type} ؟</h2>
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={ confirmationPopUpIsClosed }
          className='w-[70px] h-[40px] mt-3 relative flex items-center justify-center gap-4 bg-red-800 hover:bg-red-700 text-white border border-red-900 rounded duration-200 overflow-hidden cursor-pointer'
        >
          لا
        </button>
        <button
          onClick={() => id ? passedFunction(id) : passedFunction()}
          className='w-[70px] h-[40px] mt-3 relative flex items-center justify-center gap-4 bg-green-800 hover:bg-green-700 text-white border border-green-900 rounded duration-200 overflow-hidden cursor-pointer'
        >
          نعم
        </button>
      </div>
    </div>
  )
}

export default Confirmation