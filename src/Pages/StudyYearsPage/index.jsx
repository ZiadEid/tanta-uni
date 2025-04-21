import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import { useStore } from "../../Store";
import PopUpForm from './../../Components/PopUpForm';

const StudyYearsPage = () => {
  const { popUpToggel, years, setYears, yearsActive, setPopUpInitValues } = useStore();
  const getData = () => {
    setYears([
      {
        yearName: "سنة اولي جامعة"
      },
      {
        yearName: "سنة ثانية جامعة"
      },
      {
        yearName: "سنة ثالثة جامعة"
      },
      {
        yearName: "سنة رابعة جامعة"
      },
    ])
  }

  // Set PopUp InitValues
  const setPopUpInialtValues = () => {
    setPopUpInitValues({
      yearName: "" 
    })
  }

  useEffect(() => {
    getData();
    setPopUpInialtValues();
    yearsActive();
  }, []);

  // Delete Year
  const deleteRow = (index) => {
    const newYears = years.filter((_, i) => i !== index);
    setYears([...newYears])
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
        headers={["#", "السـنة الدراسية", ""]}
        tableData={years}
        deleteRow={deleteRow}
      />
    </div>
  )
}

export default StudyYearsPage