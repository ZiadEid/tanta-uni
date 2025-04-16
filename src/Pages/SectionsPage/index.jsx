import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import { useStore } from "../../Store";
import PopUpSections from "../../Components/PopUpSections";

const SectionsPage = () => {
  const [sections, setSections] = useState([]);
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
  useEffect(() => {
    getData();
  }, []);

  // Delete Subject
  const deleteRow = (index) => {
    const newSections = sections.filter((el, i) => i !== index);
    setSections([...newSections])
  }

  // PopUp Toggle
  const { popUpToggel } = useStore();

  return (
    <div>
      {
        popUpToggel &&
        <div className="fixed top-0 end-0 bottom-0 start-0 flex justify-center items-center bg-[#171e2e61] backdrop-blur">
          <PopUpSections setRow={setSections} />
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