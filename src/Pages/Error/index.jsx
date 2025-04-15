import darkErrorImg from "../../Assets/404-dark.svg";
import lightErrorImg from "../../Assets/404-light.svg";
import { useStore } from "../../Store";

const Error = () => {
  const {theme} = useStore();
  return (
    <div className="max-h-full h-[550px] flex justify-center items-center">
      <div className="max-w-full w-[500px] flex flex-col items-center gap-4">
        <img src={theme == "light" ? lightErrorImg : darkErrorImg} alt="not found" />
        <h2 className="text-gray-900 dark:text-white text-xl 3xl:text-2xl font-medium tracking-wide">خطاء! لا توجد نتائج</h2>
        <p className="w-1/2 max-w-full text-center text-sm leading-loose text-gray-600 dark:text-gray-400">
          تعذر الوصول للصفحة التي تبحث عنها، ربما تغير اسمها او لم تكن موجودة من الاساس.
        </p>
        <button className="px-6 py-2 rounded-lg text-white font-semibold bg-[#2a52be] hover:bg-[#1a43b3] hover:shadow-lg duration-300 tracking-wider outline-none">
          الرجوع للرئيسية
        </button>
      </div>
    </div>
  )
}

export default Error