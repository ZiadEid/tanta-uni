import React, { useEffect, useState } from 'react'
import Table from '../../Components/Table';
import { useStore } from '../../Store';
import { ToastContainer, toast } from 'react-toastify';
import PopUpStudents from '../../Components/PopUpStudents';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import SearchInput from '../../Components/SearchInput';
import AddNewBtn from '../../Components/AddNewBtn';
import NoContent from '../../Components/NoContent';
import Loader from '../../Layout/Loader';
import UpdateStudent from '../../Components/UpdateStudent';

const StudentsPage = () => {
  const navigate = useNavigate();
  const { mSection } = useParams();
  // Global State
  const { BASE_URL,
    token,
    popUpToggel,
    popUpIsClosed,
    popUpUpdateToggel,
    popUpUpdateIsClosed,
    studentsActive,
    confirmationPopUpIsClosed,
    mSections,
  } = useStore();
  // Local State
  const [loader, setLoader] = useState(true);
  const [id, setId] = useState([]);
  const [students, setStudents] = useState([]);
  const [filterdStudents, setFilterdStudents] = useState([]);
  const [student, setStudent] = useState({});
  const [slug, setSlug] = useState(null);

  const getCurrentSlug = () => {
    mSections.forEach((el) => {
      if (mSection === el.name) {
        setSlug(el.slug);
      }
    })
  }

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
      setTimeout(() => {
        setLoader(false)
      }, 200);
    } catch (error) {
      navigate("/error")
    }
  }

  useEffect(() => {
    getData();
    studentsActive();
    getCurrentSlug();
  }, []);

  // Delete Student
  const deleteRow = async (index) => {
    try {
      const res = await axios.delete(`${BASE_URL}student/deleteOne/${index}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const notify = () => toast.success(`${res.data.message}`, { autoClose: 1000 });
      notify();
      getData();
      confirmationPopUpIsClosed();
    } catch (error) {
      const notify = () => toast.error(`${error.response.data.message}`, { autoClose: 1000 });
      notify();
      confirmationPopUpIsClosed();
    }
  }

  // get Student
  const getStudent = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}student/findOne/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newStudent = {};
      newStudent.id = res.data.newStudent._id;
      newStudent.name = res.data.newStudent.name;
      newStudent.email = res.data.newStudent.email;
      newStudent.nationalId = res.data.newStudent.nationalId;
      newStudent.phoneNumber = res.data.newStudent.phoneNumber;
      newStudent.universityId = res.data.newStudent.universityId;
      newStudent.hourCost = res.data.newStudent.hourCost;
      setStudent({ ...newStudent });
    } catch (error) {
      navigate("/error");
    }
  }

  return (
    <div className='grow relative'>
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
                <PopUpStudents slug={slug} getData={getData} />
              </div>
            }
            {
              popUpUpdateToggel &&
              <div
                onClick={popUpUpdateIsClosed}
                className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] backdrop-blur"
              >
                <UpdateStudent data={student} getData={getData} />
              </div>
            }
            <div className='min-h-full pt-2 flex flex-col gap-2'>
              <div
                className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2 px-6 mt-2"
              >
                {
                  students.length !== 0
                  &&
                  <SearchInput data={students} setData={setFilterdStudents} />
                }
                <AddNewBtn />
              </div>
              {
                students.length !== 0
                  ?
                  <>
                    <Table
                      headers={["#", "الأسم", "الرقم القومي", "الجنس", "كود الجامعة", "الهاتف", "البريد الالكتروني", "السنة", ""]}
                      tableData={filterdStudents.length == 0 ? students : filterdStudents}
                      id={id}
                      deleteRow={deleteRow}
                      getOneData={getStudent}
                    />
                    <ToastContainer />
                  </>
                  :
                  <NoContent data="طلاب" />
              }
            </div>
          </>
      }
    </div>
  )
}

export default StudentsPage