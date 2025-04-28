import React, { useEffect, useState } from 'react'
import { useStore } from '../../Store';
import Table from '../../Components/Table';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import PopUpSubjects from '../../Components/PopUpSubjects';
import SubmitSheet from '../../Components/SubmitSheet';
import SearchInput from '../../Components/SearchInput';
import AddNewBtn from '../../Components/AddNewBtn';

const SingleSubject = () => {
  const navigate = useNavigate();
  const { subjectsId } = useParams()
  const { BASE_URL, token, singleSubjectActive } = useStore();
  const [marks, setMarks] = useState([]);
  const [id, setId] = useState([]);
  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}subject/getSubjectStudents/${subjectsId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newMarks = [];
      const newId = [];
      res.data.students.forEach((el) => {
        newMarks.push({
          name: el.name,
          universityId: el.universityId,
        });
        newId.push(el._id);
      })
      setMarks(newMarks);
      setId(newId);
    } catch (error) {
      navigate("/error")
    }
  }

  // Get Subjects
  useEffect(() => {
    getData();
    singleSubjectActive();
  }, []);

  return (
    <div>
      {/* <div
        className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2 px-6 mt-2"
      >
        <SearchInput />
        <AddNewBtn />
      </div> */}
      <SubmitSheet
        getData={getData}
        headers={["#", "الطالب", "رقم الجلوس", "الدرجة"]}
        tableData={marks}
        id={id}
      />
      <ToastContainer />
    </div>
  )
}

export default SingleSubject