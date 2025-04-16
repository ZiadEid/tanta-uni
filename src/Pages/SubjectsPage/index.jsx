import { useEffect, useState } from 'react'
import Table from '../../Components/Table';
import { useStore } from '../../Store';
import PopUpSubjects from '../../Components/PopUpSubjects';

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const getData = () => {
    setSubjects([
      {
        subjectName: "bussnise",
        code: "12FG",
        hoursNumber: "25",
        highestDegree: "100",
        doctorId: "محمد عبدالسميع",
        sectionId: "محاسبة",
        yearId: "السنة الرابعة"
      },
      {
        subjectName: "marketing",
        code: "12FG",
        hoursNumber: "25",
        highestDegree: "100",
        doctorId: "محمود اسماعيل",
        sectionId: "تسويق",
        yearId: "سنة رابعة"
      },
      {
        subjectName: "Taxes",
        code: "12FG",
        hoursNumber: "25",
        highestDegree: "100",
        doctorId: "ربيع منصور",
        sectionId: "محاسبة",
        yearId: "سنة رابعة"
      },
    ]);
  }

  // Get Subjects
  useEffect(() => {
    getData();
  }, []);

  // Delete Subject
  const deleteRow = (index) => {
    const newSubjects = subjects.filter((el, i) => i !== index);
    setSubjects([...newSubjects])
  }

  // PopUp Toggle
  const { popUpToggel } = useStore();

  return (
    <div>
      {
        popUpToggel &&
        <div className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] backdrop-blur">
          <PopUpSubjects setRow={setSubjects} />
        </div>
      }
      <Table
        headers={["#", "الأسم", "الكود", "عدد الساعات", "اعلي درجة", "دكتور", "القسم", "السنة", ""]}
        tableData={subjects}
        deleteRow={deleteRow}
      />
    </div>
  )
}

export default SubjectsPage