import React, { useEffect, useState } from 'react'
import Table from '../../Components/Table';
import { useStore } from '../../Store';
import { ToastContainer, toast } from 'react-toastify';
import PopUpStudents from '../../Components/PopUpStudents';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import SearchInput from '../../Components/SearchInput';
import AddNewBtn from '../../Components/AddNewBtn';

const StudentsPage = () => {
  const { mSection } = useParams();
  const navigate = useNavigate();
  const { BASE_URL, token, popUpToggel, studentsActive } = useStore();

  const [students, setStudents] = useState([]);
  const [id, setId] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}student/findAll/${mSection}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newStudents = [];
      const newId = [];
      res.data.newStudents.forEach((el) => {
        newStudents.push({
          name: el.name,
          nationalId: el.nationalId,
          gender: el.gender,
          universityId: el.universityId,
          phoneNumber: el.phoneNumber,
          email: el.email,
          yearName: el.yearName,
        });
        newId.push(el._id);
      })
      setStudents(newStudents);
      setId(newId);
    } catch (error) {
      console.log(error);
      navigate("/error")
    }
  }

  useEffect(() => {
    getData();
    studentsActive();
  }, []);

  // Delete Student
  const deleteRow = async (index) => {
    try {
      const res = await axios.delete(`${BASE_URL}student/deleteOne/${index}`, {
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
          <PopUpStudents getData={getData} />
        </div>
      }
      <div
        className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2 px-6 mt-2"
      >
        <SearchInput />
        <AddNewBtn />
      </div>
      <Table
        headers={["#", "الأسم", "الرقم القومي", "الجنس", "كود الجامعة", "الهاتف", "البريد الالكتروني", "السنة", ""]}
        tableData={students}
        id={id}
        deleteRow={deleteRow}
      />
      <ToastContainer />
    </div>
  )
}

export default StudentsPage