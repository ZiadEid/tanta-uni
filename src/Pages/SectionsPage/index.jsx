import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import { useStore } from "../../Store";
import PopUpSections from "../../Components/PopUpSections";
import PopUpForm from "../../Components/PopUpForm";

const SectionsPage = () => {
  // PopUp Toggle
  const { popUpToggel, sections, setSections, sectionsActive, setPopUpInitValues } = useStore();
  const getData = () => {
    setSections([
      {
        name: "محاسبة",
        year: "رابعة"
      },
      {
        name: "تسويق",
        year: "رابعة"
      },
    ])
  }

  // Set PopUp InitValues
  const setPopUpInialtValues = () => {
    setPopUpInitValues({
      sectionName: "",
      sectionYear: "اولي",
    })
  }

  useEffect(() => {
    getData();
    setPopUpInialtValues();
    sectionsActive();
  }, []);

  // Delete Subject
  const deleteRow = (index) => {
    const newSections = sections.filter((el, i) => i !== index);
    setSections([...newSections])
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
        headers={["#", "التخصص", "سنة التخصص", "",]}
        tableData={sections}
        deleteRow={deleteRow}
      />
    </div>
  )
}

export default SectionsPage