import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import { useStore } from "../../Store";
import PopUpDoctors from "../../Components/PopUpDoctors";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import SearchInput from "../../Components/SearchInput";
import AddNewBtn from "../../Components/AddNewBtn";

const DoctorsPage = () => {
  const { BASE_URL, token, popUpToggel, doctorsActive } = useStore();
  const navigate = useNavigate();
  const { mSection } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [id, setId] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}doctor/findAll/${mSection}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newDoctors = [];
      const newId = [];
      res.data.doctors.forEach((el) => {
        newDoctors.push({
          name: el.name,
          nationalId: el.nationalId,
          phoneNumber: el.phoneNumber,
          email: el.email,
        });
        newId.push(el._id);
      })
      setDoctors(newDoctors);
      setId(newId);
    } catch (error) {
      navigate("/error")
    }
  }

  useEffect(() => {
    getData();
    doctorsActive();
  }, []);

  // Delete Doctor
  const deleteRow = async (index) => {
    try {
      const res = await axios.delete(`${BASE_URL}doctor/deleteOne/${index}`, {
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
          <PopUpDoctors getData={getData} />
        </div>
      }
      <div
        className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2 px-6 mt-2"
      >
        <SearchInput />
        <AddNewBtn />
      </div>
      <Table
        headers={["#", "الأسم", "الرقم القومي", "الهاتف", "البريد الالكتروني", ""]}
        tableData={doctors}
        id={id}
        deleteRow={deleteRow}
      />
      <ToastContainer />
    </div>
  )
}

export default DoctorsPage