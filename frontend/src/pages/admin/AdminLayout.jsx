import { Link, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard,ClipboardClock ,Plus,List } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6 text-center">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-3">
          <Link className="p-2 rounded hover:bg-blue-500 hover:text-white flex justify-left items-center gap-2" to="dashboard">
            <LayoutDashboard/><span>Dashboard</span>
          </Link>
          <Link className="p-2 rounded hover:bg-blue-500 hover:text-white  flex justify-left items-center gap-2" to="appointments">
           <ClipboardClock/> <span>Appointments</span>
          </Link>
          <Link className="p-2 rounded hover:bg-blue-500 hover:text-white  flex justify-left items-center gap-2" to="adddoctor">
            <Plus/><span>Add Doctor</span>
          </Link>
          <Link className="p-2 rounded hover:bg-blue-500 hover:text-white  flex justify-left items-center gap-2" to="doctorlist">
            <List/><span>Doctor List</span>
          </Link>
        </nav>

        <button
          onClick={Logout}
          className="mt-10 w-full bg-red-500 text-white py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Right Side Content */}
      <div className="flex-1 p-6">
        <div className="bg-white p-6 rounded shadow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
