import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import { useStore } from "../../Store";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PopUpYears from "../../Components/PopUpYears";
import { ToastContainer, toast } from "react-toastify";
import AddNewBtn from "../../Components/AddNewBtn";
import SearchInput from "../../Components/SearchInput";

const StudyYearsPage = () => {
  const { BASE_URL, token, popUpToggel, yearsActive } = useStore();
  const { mSection } = useParams();
  const [years, setYears] = useState([]);
  const [id, setId] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}year/findAll/${mSection}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setYears(res.data.years)
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
    } catch (error) {
      navigate("/error")
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
      const notify = () => toast.success(`${res.data.message}`, { autoClose: 2000 });
      notify();
      getData();
    } catch (error) {
      const notify = () => toast.error(`${error.response.data.message}`, { autoClose: 2000 });
      notify();
    }
  }

  return (
    <div>
      {
        popUpToggel &&
        <div className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] backdrop-blur">
          <PopUpYears getData={getData} />
        </div>
      }
      <div
        className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2 px-6 mt-2"
      >
        <SearchInput />
        <AddNewBtn />
      </div>
      <Table
        headers={["#", "السـنة الدراسية", ""]}
        tableData={years}
        id={id}
        deleteRow={deleteRow}
      />
      <ToastContainer />
    </div>
  )
}

export default StudyYearsPage