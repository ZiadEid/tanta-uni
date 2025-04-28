import React, { useEffect, useState } from 'react'
import Table from '../../Components/Table';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../Store';
import SearchInput from '../../Components/SearchInput';
import axios from 'axios';

const DoctorSubjects = () => {
  const navigate = useNavigate();
  const { BASE_URL, token, doctorSubjectActive } = useStore();
  const [subjects, setSubjects] = useState([]);
  const [id, setId] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}subject/getDoctorSubjects/${"680d9582fff3ac77ec538f57"}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newSubjects = [];
      const newId = [];
      res.data.subjects.forEach((el) => {
        newSubjects.push({
          name: el.name,
          code: el.code,
          hoursNumber: el.hoursNumber,
          highestDegree: el.highestDegree,
          term: el.term,
        });
        newId.push(el._id);
      })
      setSubjects(newSubjects);
      setId(newId);
    } catch (error) {
      navigate("/error")
      console.log(error)
    }
  }

  // Get Subjects
  useEffect(() => {
    getData();
    doctorSubjectActive();
  }, []);

  return (
    <div>
      <div
        className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2 px-6 mt-2"
      >
        <SearchInput />
      </div>
      <Table
        headers={["#", "اسم المادة", "كود المادة", "عدد الساعات", "اعلي درجة", "الترم", ""]}
        tableData={subjects}
        id={id}
      />
    </div>
  )
}

export default DoctorSubjects