import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import { useStore } from "../../Store";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PopUpYears from "../../Components/PopUpYears";
import { ToastContainer, toast } from "react-toastify";
import AddNewBtn from "../../Components/AddNewBtn";
import SearchInput from "../../Components/SearchInput";
import NoContent from "../../Components/NoContent";
import Loader from "../../Layout/Loader";
import UpdateYear from "../../Components/UpdateYear";

const StudyYearsPage = () => {
  const navigate = useNavigate();
  // Global State
  const { BASE_URL,
    token,
    popUpToggel,
    popUpIsClosed,
    popUpUpdateToggel,
    popUpUpdateIsClosed,
    confirmationPopUpIsClosed,
    yearsActive,
  } = useStore();
  const { mSection } = useParams();
  // loader
  const [loader, setLoader] = useState(true)
  // Data
  const [id, setId] = useState([]);
  const [years, setYears] = useState([]);
  const [filterdYears, setFilterdYears] = useState([]);
  const [year, setYear] = useState({});
  const [pagenation, setPagenation] = useState(null);


  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}year/findAll/${mSection}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res.data)
      setPagenation({
        current: res.data.currentPage,
        total: res.data.totalPages
      });
      const newYears = [];
      const newId = [];
      res.data.years.forEach((el) => {
        newYears.push({
          name: el.name
        });
        newId.push(el._id);
      })
      setYears(newYears);
      setId(newId);
      setTimeout(() => {
        setLoader(false);
      }, 200);
    } catch (error) {
      navigate("/error");
    }
  }

  useEffect(() => {
    getData();
    yearsActive();
  }, []);

  // Delete Year
  const deleteRow = async (index) => {
    try {
      const res = await axios.delete(`${BASE_URL}year/deleteOne/${index}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const notify = () => toast.success(`${res.data.message}`, { autoClose: 1000 });
      notify();
      getData();
      confirmationPopUpIsClosed();
    } catch (error) {
      const notify = () => toast.error(`${error.response.data.message}`, { autoClose: 2000 });
      notify();
      confirmationPopUpIsClosed();
    }
  }

  // get Year
  const getYear = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}year/findOne/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newYear = {};
      newYear.id = res.data.year._id;
      newYear.name = res.data.year.name;
      setYear({ ...newYear });
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
              popUpToggel &&
              <div
                onClick={popUpIsClosed}
                className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] backdrop-blur"
              >
                <PopUpYears getData={getData} />
              </div>
            }
            {
              popUpUpdateToggel &&
              <div
                onClick={popUpUpdateIsClosed}
                className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] backdrop-blur"
              >
                <UpdateYear data={year} getData={getData} />
              </div>
            }
            <div className="min-h-full pt-2 flex flex-col gap-2">
              <div
                className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2 px-6"
              >
                {
                  years.length != 0
                  &&
                  <SearchInput data={years} setData={setFilterdYears} />
                }
                <AddNewBtn />
              </div>
              {
                years.length != 0
                  ?
                  <>
                    <Table
                      headers={["#", "السـنة الدراسية", ""]}
                      tableData={filterdYears.length == 0 ? years : filterdYears}
                      id={id}
                      deleteRow={deleteRow}
                      getOneData={getYear}
                      pagenation={pagenation}
                    />
                    <ToastContainer />
                  </>
                  :
                  <NoContent data="سنين" />
              }
            </div>
          </>
      }
    </div>
  )
}

export default StudyYearsPage