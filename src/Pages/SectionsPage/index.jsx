import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import { useStore } from "../../Store";
import PopUpSections from "../../Components/PopUpSections";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../Components/SearchInput";
import AddNewBtn from "../../Components/AddNewBtn";
import Loader from "../../Layout/Loader";

const SectionsPage = () => {
  const navigate = useNavigate();
  // Global State
  const { BASE_URL,
    token,
    popUpToggel,
    popUpIsClosed,
    sectionsActive,
    confirmationPopUpIsClosed
  } = useStore();
  // Local State
  const [loader, setLoader] = useState(true);
  const [id, setId] = useState([]);
  const [sections, setSections] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}section/findAll`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newSection = [];
      const newId = [];
      res.data.newSections.forEach((el) => {
        newSection.push({
          name: el.name,
          year: el.yearName,
        });
        newId.push(el._id);
      })
      setSections(newSection);
      setId(newId);
      setTimeout(() => {
        setLoader(false)
      }, 200);
    } catch (error) {
      navigate("/error")
    }
  }

  useEffect(() => {
    getData();
    sectionsActive();
  }, []);

  // Delete Section
  const deleteRow = async (index) => {
    try {
      const res = await axios.delete(`${BASE_URL}section/deleteOne/${index}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const notify = () => toast.success(`${res.data.message}`, { autoClose: 1000 });
      notify();
      getData();
      confirmationPopUpIsClosed();
    } catch (error) {
      const notify = () => toast.error(`${error.response.data.message}`, { autoClose: 1000 });
      notify();
      confirmationPopUpIsClosed();
    }
  }

  return (
    <div className="grow relative px-6 py-2">
      {
        loader
          ?
          <Loader />
          :
          <>

            {
              popUpToggel &&
              <div
                onClick={popUpIsClosed}
                className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] backdrop-blur"
              >
                <PopUpSections getData={getData} />
              </div>
            }
            <div className="min-h-full pt-2 flex flex-col gap-2">
              <div
                className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2"
              >
                {
                  sections.length !== 0
                  &&
                  <SearchInput />
                }
                <AddNewBtn />
              </div>

            </div>
            {
              sections.length !== 0
                ?
                <>
                  <Table
                    headers={["#", "التخصص", "سنة التخصص", "",]}
                    tableData={sections}
                    id={id}
                    deleteRow={deleteRow}
                  />
                  <ToastContainer />
                </>
                :
                <NoContent data="اقسام" />
            }
          </>
      }
    </div>
  )
}

export default SectionsPage