import { useEffect, useState } from 'react'
import Table from '../../Components/Table';
import { useStore } from '../../Store';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import PopUpSubjects from '../../Components/PopUpSubjects';
import { useNavigate, useParams } from 'react-router-dom';
import SearchInput from '../../Components/SearchInput';
import AddNewBtn from '../../Components/AddNewBtn';

const SubjectsPage = () => {
  const { mSection } = useParams();
  const navigate = useNavigate();
  const { BASE_URL, token, popUpToggel, subjectsActive } = useStore();
  const [subjects, setSubjects] = useState([]);
  const [id, setId] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}subject/findAll/${mSection}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newSubjects = [];
      const newId = [];
      res.data.newSubjects.forEach((el) => {
        newSubjects.push({
          name: el.name,
          code: el.code,
          hoursNumber: el.hoursNumber,
          highestDegree: el.highestDegree,
          doctorName: el.doctorName,
          yearName: el.yearName,
        });
        newId.push(el._id);
      })
      setSubjects(newSubjects);
      setId(newId);
    } catch (error) {
      navigate("/error")
    }
  }

  // Get Subjects
  useEffect(() => {
    getData();
    subjectsActive();
  }, []);

  // Delete Subject
  const deleteRow = async (index) => {
    try {
      const res = await axios.delete(`${BASE_URL}subject/deleteOne/${index}`, {
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
          <PopUpSubjects getData={getData} />
        </div>
      }
      <div
        className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2 px-6 mt-2"
      >
        <SearchInput />
        <AddNewBtn />
      </div>
      <Table
        headers={["#", "الأسم", "الكود", "عدد الساعات", "اعلي درجة", "دكتور", "السنة", "", "الدرجات"]}
        tableData={subjects}
        id={id}
        deleteRow={deleteRow}
      />
      <ToastContainer />
    </div>
  )
}

export default SubjectsPage