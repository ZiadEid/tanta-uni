import { Link } from 'react-router-dom'
import { useStore } from '../../Store';
import { PiBooksFill } from "react-icons/pi";
import { useEffect, useState } from 'react';
import axios from 'axios';

const StudentSide = () => {
  const { BASE_URL, token, user, pageName, closeSide } = useStore();
  const [years, setYears] = useState([]);
  const getData = async () => {
    try {
      if (user) {
        const res = await axios.get(`${BASE_URL}student/getYearsByName/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setYears(res.data.years);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <ul className="flex flex-col gap-2">
      {
        years.map((el) => (
          <Link
            key={el.id}
            to={`/${el.id}`}
            className={`p-2 outline-0 ${pageName == "studentSubjects" ? "bg-[#2a52be] text-white text-lg" : "text-gray-500 hover:text-[#2a52be] hover:ps-3 dark:hover:text-white duration-150"} text-md rounded-lg flex ${!closeSide && "md:justify-center lg:justify-center"} justify-center md:justify-start items-center gap-2`}
          >
            <PiBooksFill />
            <span className={`${!closeSide && "md:hidden"} hidden md:block shrink-0`}>
              {el.name}
            </span>
          </Link>
        ))
      }
    </ul>
  )
}

export default StudentSide