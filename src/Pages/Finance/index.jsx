import { useEffect, useState } from "react";
import { useStore } from "../../Store"
import NoContent from "../../Components/NoContent";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Layout/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";
import SearchInput from './../../Components/SearchInput/';
import Table from './../../Components/Table';
import Confirmation from "../../Components/Confirmation";

const Finance = () => {
  const { yearId } = useParams();
  // Global State
  const {
    BASE_URL,
    token,
    financeActive,
  } = useStore();
  // Local State
  const [loader, setLoader] = useState([]);
  const [id, setId] = useState([]);
  const [finance, setFinance] = useState([]);
  const [financeId, setFinanceId] = useState([]);
  const [filterdFinance, setFilterdFinance] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}payment/getStudentsYearCost/${yearId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newFinance = [];
      const newId = [];
      res.data.payments.forEach((el) => {
        newFinance.push({
          name: el.studentId.name,
          yearCost: el.yearCost,
          isPaid: el.isPaid ? "مدفوع" : "غير مدفوع",
        });
        newId.push(el._id);
      })
      setFinance(newFinance);
      setId(newId);
      setTimeout(() => {
        setLoader(false);
      }, 200);
    } catch (error) {
      // navigate("/error");
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
    financeActive();
  }, []);

  const confirmPayment = async (id) => {
    const value = {
      paymentId: `${id}`
    }
    try {
      const res = await axios.post(`${BASE_URL}payment/confirmPayment`, value, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const notify = () => toast.success(`${res.data.message}`, { autoClose: 1000 });
      notify();
      getData();
    } catch (error) {
      const notify = () => toast.error(`${error.response.data.message}`, { autoClose: 2000 });
      notify();
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
            <div className="min-h-full pt-2 flex flex-col gap-2">
              <div
                className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2"
              >
                {
                  finance.length != 0
                  &&
                  <SearchInput data={finance} setData={setFilterdFinance} />
                }
              </div>
              {
                finance.length != 0
                  ?
                  <>
                    <Table
                      headers={["#", "الطالب", "سعر السنة", "الحالة", "", ""]}
                      tableData={filterdFinance.length == 0 ? finance : filterdFinance}
                      id={id}
                      confirmPayment={confirmPayment}
                    />
                    <ToastContainer />
                  </>
                  :
                  <NoContent data="مصاريف" />
              }
            </div>
          </>
      }
    </div>
  )
}

export default Finance