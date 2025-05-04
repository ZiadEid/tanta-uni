import { useEffect } from "react";
import darkErrorImg from "/Assets/404-dark.svg";
import lightErrorImg from "/Assets/404-light.svg";
import { useStore } from "../../Store";
import BackToHome from "../../Components/BackToHome";

const Error = ({message}) => {
  const { theme, errorActive } = useStore();
  useEffect(() => {
    errorActive();
  }, []);

  return (
    <div className="max-h-full h-[550px] flex justify-center items-center">
      <div className="max-w-full w-[500px] flex flex-col items-center gap-3">
        <img src={theme == "light" ? lightErrorImg : darkErrorImg} alt="not found" />
        <h2 className="text-gray-900 dark:text-white text-xl 3xl:text-2xl font-medium tracking-wide">خطاء! لا توجد نتائج</h2>
        <p className="w-2/3 max-w-full text-center leading-loose text-gray-600 dark:text-gray-400">
          {message}.
        </p>
        <BackToHome />
      </div>
    </div>
  )
}

export default Error