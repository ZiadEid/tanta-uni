import React, { useEffect, useState } from 'react'
import Table from '../../Components/Table';
import { useStore } from '../../Store';
import PopUpStudents from '../../Components/PopUpStudents';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const getData = () => {
    setStudents([
      {
        studentName: "علي ممدوح عبدالستار",
        studentMajor: "محاسبة",
        yearId: "رابعة"
      },
      {
        studentName: "محمود السيد حسن",
        studentMajor: "تسويق",
        yearId: "ثانية"
      },
      {
        studentName: "سيد عبدالرحمن البرعي",
        studentMajor: "محاسبة",
        yearId: "اولي"
      },
    ])
  }
  useEffect(() => {
    getData();
  }, []);

  // Delete Subject
  const deleteRow = (index) => {
    const newStudents = students.filter((el, i) => i !== index);
    setStudents([...newStudents])
  }

  // PopUp Toggle
  const { popUpToggel } = useStore();

  return (
    <div>
      {
        popUpToggel &&
        <div className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] backdrop-blur">
          <PopUpStudents setRow={setStudents} />
        </div>
      }
      <Table
        headers={["#", "الأسم", "القسم", "السنة", ""]}
        tableData={students}
        deleteRow={deleteRow}
      />
    </div>
  )
}

export default StudentsPage