import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../Store";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../Components/Table";
import { ToastContainer } from "react-toastify";
import SearchInput from "../../Components/SearchInput";
import NoContent from "../../Components/NoContent";
import Loader from './../../Layout/Loader';
import UpdateDegree from "../../Components/UpdateDegree";

const MarkesPage = () => {
  const navigate = useNavigate();
  const { subjectsName } = useParams();
  // Global State
  const {
    BASE_URL,
    token,
    popUpUpdateToggel,
    popUpUpdateIsClosed

  } = useStore();
  // Local State
  const [loader, setLoader] = useState(true);
  const [id, setId] = useState([]);
  const [marks, setMarks] = useState([]);
  const [filterdMarks, setFilterdMarks] = useState([]);
  const [degree, setDegree] = useState({});



  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}degree/showSubjectDegrees/${subjectsName}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newMarks = [];
      const newId = [];
      res.data.degrees.forEach((el) => {
        newMarks.push({
          name: el.studentName,
          subjectDegree: el.subjectDegree,
          GBA: el.GBA,
          grade: el.grade,
        });
        newId.push(el._id);
      })
      setMarks(newMarks);
      setId(newId);
      setTimeout(() => {
        setLoader(false);
      }, 200);
    } catch (error) {
      // navigate("/error")
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // get degree
  const getDegree = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}degree/findOne/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newdegree = {};
      newdegree.id = res.data.subjectDegree._id;
      newdegree.subjectDegree = res.data.subjectDegree.subjectDegree;
      setDegree({ ...newdegree });
    } catch (error) {
      navigate("/error");
    }
  }

  return (
    <div className="grow relative">
      {
        loader
          ?
          <Loader />
          :
          <>
            {
              popUpUpdateToggel &&
              <div
                onClick={popUpUpdateIsClosed}
                className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] backdrop-blur"
              >
                <UpdateDegree data={degree} getData={getData} />
              </div>
            }
            <div className="min-h-full pt-2 flex flex-col gap-2">

              {
                marks.length !== 0
                  ?
                  <>
                    <div
                      className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2 px-6 mt-2"
                    >
                      <SearchInput data={marks} setData={setFilterdMarks} />
                    </div>
                    <Table
                      headers={["#", "الطالب", "الدرجة", "GPA", "grade", ""]}
                      tableData={filterdMarks.length == 0 ? marks : filterdMarks}
                      id={id}
                      getOneData={getDegree}
                    />
                    <ToastContainer />
                  </>
                  :
                  <div className="h-full flex justify-center items-center">
                    <NoContent data="درجات لهذه المادة" />
                  </div>
              }
            </div>
          </>
      }
    </div>
  )
}

export default MarkesPage