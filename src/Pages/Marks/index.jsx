import React, { useEffect } from 'react'
import { useStore } from '../../Store';
import PopUpForm from '../../Components/PopUpForm';
import Table from '../../Components/Table';

const Marks = () => {
  // PopUp Toggle
  const { popUpToggel, marks, setMarks, marksActive, setPopUpInitValues } = useStore();
  const getData = () => {
    setMarks([
      {
        subjectName: "bussnise",
        studentName: "محمد فؤاد",
        mark: "60",
        highestDegree: "100",
        doctorId: "محمد عبدالسميع",
        sectionId: "محاسبة",
        yearId: "رابعة"
      },
      {
        subjectName: "Marketing",
        studentName: "وليد السيد",
        mark: "80",
        highestDegree: "100",
        doctorId: "محمد عبدالسميع",
        sectionId: "محاسبة",
        yearId: "رابعة"
      },
      {
        subjectName: "bussnise",
        studentName: "زياد مصطفي عيد",
        mark: "70",
        highestDegree: "100",
        doctorId: "محمد عبدالسميع",
        sectionId: "محاسبة",
        yearId: "رابعة"
      },
    ]);
  }

  // Set PopUp InitValues
  const setPopUpInialtValues = () => {
    setPopUpInitValues({
      subjectName: "",
      studentName: "",
      mark: "",
      highestDegree: "",
      doctorId: "محمد عبدالسميع",
      sectionId: "محاسبة",
      yearId: "اولي"
    })
  }

  // Get Subjects
  useEffect(() => {
    getData();
    setPopUpInialtValues();
    marksActive();
  }, []);

  // Delete Subject
  const deleteRow = (index) => {
    const newSubjects = subjects.filter((el, i) => i !== index);
    setMarks([...newSubjects])
  }

  return (
    <div>
      {
        popUpToggel &&
        <div className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] backdrop-blur">
          <PopUpForm />
        </div>
      }
      <Table
        headers={["#", "المادة", "الطالب", "الدرجة", "اعلي درجة", "دكتور", "القسم", "السنة", ""]}
        tableData={marks}
        deleteRow={deleteRow}
      />
    </div>
  )
}

export default Marks