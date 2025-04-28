import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import { useStore } from "../../Store";
import PopUpSections from "../../Components/PopUpSections";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../Components/SearchInput";
import AddNewBtn from "../../Components/AddNewBtn";

const SectionsPage = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [id, setId] = useState([]);
  const { BASE_URL, token, popUpToggel, sectionsActive } = useStore();
  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}section/findAll`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newSection = [];
      const newId = [];
      res.data.newSections.forEach((el) => {
        newSection.push({
          name: el.name,
          year: el.yearName,
        });
        newId.push(el._id);
      })
      setSections(newSection);
      setId(newId);
    } catch (error) {
      console.log(error);
      navigate("/error")
    }
  }

  useEffect(() => {
    getData();
    sectionsActive();
  }, []);

  // Delete Section
  const deleteRow = async (index) => {
    try {
      const res = await axios.delete(`${BASE_URL}section/deleteOne/${index}`, {
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
          <PopUpSections getData={getData} />
        </div>
      }
      <div
        className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2 px-6 mt-2"
      >
        <SearchInput />
        <AddNewBtn />
      </div>
      <Table
        headers={["#", "التخصص", "سنة التخصص", "",]}
        tableData={sections}
        id={id}
        deleteRow={deleteRow}
      />
      <ToastContainer />
    </div>
  )
}

export default SectionsPage