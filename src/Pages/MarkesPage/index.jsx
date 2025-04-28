import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../Store";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../Components/Table";
import PopUpSubjects from "../../Components/PopUpSubjects";
import { ToastContainer } from "react-toastify";
import SearchInput from "../../Components/SearchInput";

const MarkesPage = () => {
  const navigate = useNavigate();
  const { subjectsId } = useParams()
  const { BASE_URL, token, markesActive } = useStore();
  const [marks, setMarks] = useState([]);
  const [id, setId] = useState([]);
  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}degree/showSubjectDegrees/${subjectsId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newMarks = [];
      const newId = [];
      res.data.degrees.forEach((el) => {
        newMarks.push({
          studentName: el.studentName,
          subjectDegree: el.subjectDegree,
          GBA: el.GBA,
        });
        newId.push(el._id);
      })
      setMarks(newMarks);
      setId(newId);
    } catch (error) {
      navigate("/error")
      console.log(error)
    }
  }

  // Get Subjects
  useEffect(() => {
    getData();
    markesActive();
  }, []);

  return (
    <div>
      <div
        className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2 px-6 mt-2"
      >
        <SearchInput />
      </div>
      <Table
        headers={["#", "الطالب", "الدرجة", "GPA", ""]}
        tableData={marks}
        id={id}
      />
      <ToastContainer />
    </div>
  )
}

export default MarkesPage