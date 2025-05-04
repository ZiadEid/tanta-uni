import { useEffect, useState } from "react";
import { useStore } from "../../Store"
import NoContent from "../../Components/NoContent";
import { ToastContainer, toast } from "react-toastify";
import UpdateYear from "../../Components/UpdateYear";
import PopUpYears from "../../Components/PopUpYears";
import Loader from "../../Layout/Loader";
import axios from "axios";

const Finance = () => {
  // Global State
  const { BASE_URL, token, financeActive } = useStore();
  // Local State
  const [finance, setFinance] = useState([]);
  const [loader, setLoader] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}year/findAll/${mSection}?page=1&limit=`, {
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
    financeActive();
  }, []);

  // Delete Finance
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

  // get One Finance
  const getOneFinance = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}year/findOne/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newFinance = {};
      newFinance.id = res.data.year._id;
      newFinance.name = res.data.year.name;
      setYear({ ...newFinance });
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
                  finance.length != 0
                  &&
                  <SearchInput data={years} setData={setFilterdYears} />
                }
                <AddNewBtn />
              </div>
              {
                finance.length != 0
                  ?
                  <>
                    <Table
                      headers={["#", "الطالب", "المصاريف", ""]}
                      tableData={filterdYears.length == 0 ? years : filterdYears}
                      id={id}
                      deleteRow={deleteRow}
                      getOneData={getOneFinance}
                      pagenation={pagenation}
                    />
                    <ToastContainer />
                  </>
                  :
                  <NoContent data="مصاريف" />
              }
            </div>
          </>
      }
    </div>
  )
}

export default Finance