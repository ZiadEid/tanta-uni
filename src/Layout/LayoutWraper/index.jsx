import Sidebar from '../Sidebar'
import Navbar from '../Navbar'

const LayoutWraper = ({children}) => {
  return (
    <div className="flex dark:bg-gray-900">
      <Sidebar />
      <div className="w-[80%] overflow-auto h-screen">
        <Navbar />
        {children}
      </div>
    </div>
  )
}

export default LayoutWraper