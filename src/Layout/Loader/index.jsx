import { useEffect, useState } from "react";
import { useStore } from "../../Store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Loader = () => {
  const navigate = useNavigate();
  const { BASE_URL, token, setUser } = useStore();

  const getUser = async () => {
    let newUser = {}
    try {
      const res = await axios.get(`${BASE_URL}auth/userData`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      newUser = {
        role: res.data.role,
        id: res.data.data._id,
        name: res.data.data.name,
        nationalId: res.data.data.nationalId,
        phoneNumber: res.data.data.phoneNumber,
        email: res.data.data.email,
      }
      setUser(newUser)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getUser();
  }, [])

  return (
    <div>Loader</div>
  )
}

export default Loader