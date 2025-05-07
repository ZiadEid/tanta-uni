import { useEffect, useState } from 'react'
import Table from '../../Components/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../Store';
import SearchInput from '../../Components/SearchInput';
import axios from 'axios';
import NoContent from '../../Components/NoContent';
import Loader from '../../Layout/Loader';

const GeneralGPAPage = () => {
  // Hooks
  const navigate = useNavigate();
  const { yearId } = useParams();
  // Global State
  const { BASE_URL, token, generalGPAActive, user } = useStore();
  // Local State
  const [loader, setLoader] = useState(true);
  const [id, setId] = useState([]);
  const [generalGPA, setGeneralGPA] = useState([]);
  const [singleSubject, setSingleSubject] = useState({});

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}degree/studentDegrees/${user.id}/${yearId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newGeneralGPA = [];
      const newId = [];
      res.data.studentDegrees.forEach((el) => {
        newGeneralGPA.push({
          name: el.subjectId.name,
          term: el.subjectId.term === "FirstTerm" ? "الاول" : "الثاني",
          highestDegree: el.subjectId.highestDegree,
          subjectDegree: el.subjectDegree,
          GBA: el.GBA,
          grade: el.grade,
          hoursNumber: el.hoursNumber,
        });
        newId.push(el._id);
      })
      console.log(res.data)
      setSingleSubject({
        yearGba: res.data.yearGba,
        yearGrade: res.data.yearGrade,
      })
      setGeneralGPA(newGeneralGPA);
      setId(newId);
      setTimeout(() => {
        setLoader(false);
      }, 200);
    } catch (error) {
      navigate("/error")
    }
  }

  useEffect(() => {
    getData();
    generalGPAActive();
  }, [])
  return (
    <div className='grow relative px-6 py-4'>
      {
        loader
          ?
          <Loader />
          :
          <>
            {
              generalGPA.length != 0
                ?
                <>
                  <div className="actions w-fit mx-auto bg-[#2a52be] px-6 py-4 text-xl text-center md:text-start shadow text-[#171e2e] dark:text-gray-300 rounded">
                    <div>
                      التقدير العام:
                      <span className='ms-2'>{singleSubject.yearGrade}</span> - {singleSubject.yearGba}
                    </div>
                  </div>
                  <Table
                    headers={["#", "المادة", "الترم", "الدرجة النهائية", "درجة الطالب", "GPA", "التقدير", ""]}
                    tableData={generalGPA}
                    id={id}
                  />
                </>
                :
                <NoContent data="طلاب لهذه المادة" />
            }
          </>
      }
    </div>
  )
}

export default GeneralGPAPage