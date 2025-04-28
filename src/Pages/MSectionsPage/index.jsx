import { useEffect, useState } from "react";
import MSectionsCard from "../../Components/MSectionsCard"
import Navbar from "../../Layout/Navbar"
import { useStore } from "../../Store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const MSectionsPage = () => {
  const navigate = useNavigate();
  const { BASE_URL, token, sectionsActive, mSections, setMSections } = useStore();

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}section/findAll`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMSections(res.data.sections);
    } catch (error) {
      console.log(error);
      navigate("/error")
    }
  }
  useEffect(() => {
    getData();
    sectionsActive();
  }, []);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="grow px-5 md:px-10 xl:px-50 dark:bg-gray-900 flex items-center gap-5 flex-wrap pt-5">
        {
          mSections.map((section) => (
            <MSectionsCard key={section._id} name={section.name} />
          ))
        }
      </div>
      <ToastContainer />
    </div>
  )
}

export default MSectionsPage