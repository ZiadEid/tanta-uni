import { useEffect } from "react"
import { useStore } from "../../Store"

const ProfilePage = () => {
  const { profileActive } = useStore(); 
  useEffect(() => {
    profileActive();
  }, [])
  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage