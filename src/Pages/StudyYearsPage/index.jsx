import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import PopUpYears from "../../Components/PopUpYears";
import { useStore } from "../../Store";

const StudyYearsPage = () => {
  const [years, setYears] = useState([]);
  useEffect(() => {
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
  }, [])

  // Delete Year
  const deleteRow = (index) => {
    const newYears = years.filter((el, i) => i !== index);
    setYears([...newYears])
  }

  // PopUp Toggle
  const { popUpToggel, yearInitalValues } = useStore();

  return (
    <div>
      {
        popUpToggel &&
        <div className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] backdrop-blur">
          <PopUpYears setRow={setYears} />
        </div>
      }
      <Table
        headers={["#", "السـنة الدراسية",""]}
        tableData={years}
        deleteRow={deleteRow}
        changeInitalValues={yearInitalValues}
      />
    </div>
  )
}

export default StudyYearsPage