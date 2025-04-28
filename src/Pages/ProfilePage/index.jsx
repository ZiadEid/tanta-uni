import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../Components/ProfileCard";
import { useStore } from "../../Store";
import axios from "axios";


const ProfilePage = () => {
  const { profileActive, token } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    profileActive();
    if (!token) {
      navigate("/login");
    }
  }, [token])
  return (
    <div
      className="grow pt-5 px-5 md:px-10 xl:px-50 dark:bg-gray-900 flex justify-center items-center gap-5">
      <ProfileCard />
    </div>
  )
}

export default ProfilePage