import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import { useStore } from "../../Store";
import PopUpDoctors from "../../Components/PopUpDoctors";

const DoctorsPage = () => {
  // PopUp Toggle
  const { popUpToggel } = useStore();

  const [doctors, setDoctors] = useState([])

  const getData = () => {
    setDoctors([
      {
        doctorName: "محمد عبدالسميع",
        major: "محاسبة"
      },
      {
        doctorName: "محمود اسماعيل",
        major: "تسويق"
      },
      {
        doctorName: "ربيع منصور",
        major: "محاسبة"
      },
    ])
  }
  useEffect(() => {
    getData();
    
  }, []);

  // Delete Subject
  const deleteRow = (index) => {
    const newDoctors = doctors.filter((el, i) => i !== index);
    setDoctors([...newDoctors])
  }

  return (
    <div>
      {
        popUpToggel &&
        <div className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] backdrop-blur">
          <PopUpDoctors setRow={setDoctors} />
        </div>
      }
      <Table
        headers={["#", "الأسم", "التخصص", ""]}
        tableData={doctors}
        deleteRow={deleteRow}
      />
    </div>
  )
}

export default DoctorsPage