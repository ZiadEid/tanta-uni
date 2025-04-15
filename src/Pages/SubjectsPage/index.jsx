import React, { useEffect, useState } from 'react'
import Table from '../../Components/Table';
import { useStore } from '../../Store';
import PopUpForm from '../../Components/PopUpFrom';

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const getData = () => {
    setSubjects([{
      id: 1,
      yearName: "زياد مصطفي عيد",
      adress: "طنطا شارع المامون مع النحاس",
      specialty: "متخصص وجهات الكترونية",
      feild: "قسم البرمجيات والتطوير",
    },
    {
      id: 2,
      yearName: "زياد مصطفي عيد",
      adress: "طنطا شارع المامون مع النحاس",
      specialty: "متخصص وجهات الكترونية",
      feild: "قسم البرمجيات والتطوير",
    },
    {
      id: 3,
      yearName: "زياد مصطفي عيد",
      adress: "طنطا شارع المامون مع النحاس",
      specialty: "متخصص وجهات الكترونية",
      feild: "قسم البرمجيات والتطوير",
    }
    ])
  }
  useEffect(() => {
    getData();
  }, []);

  // PopUp Toggle
  const { popUpToggel } = useStore();

  return (
    <div>
      {
        popUpToggel &&
        <div className="fixed top-0 end-0 bottom-0 start-0 flex justify-center items-center bg-[#171e2e61] backdrop-blur">
          <PopUpForm />
        </div>
      }
      <Table headers={["#", "الأسم", "العنوان", "التخصص", "الاقسام", "",]} tableData={subjects} />
    </div>
  )
}

export default SubjectsPage