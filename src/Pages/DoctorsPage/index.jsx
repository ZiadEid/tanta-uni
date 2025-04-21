import { useEffect } from "react";
import Table from "../../Components/Table";
import { useStore } from "../../Store";
import PopUpForm from "../../Components/PopUpForm";

const DoctorsPage = () => {
  // PopUp Toggle
  const { popUpToggel, doctors, setDoctors, doctorsActive, setPopUpInitValues } = useStore();

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

  // Set PopUp InitValues
  const setPopUpInialtValues = () => {
    setPopUpInitValues({
      doctorName: "",
      doctorMajor: "محاسبة",
    })
  }
  useEffect(() => {
    getData();
    setPopUpInialtValues();
    doctorsActive();
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
          <PopUpForm />
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