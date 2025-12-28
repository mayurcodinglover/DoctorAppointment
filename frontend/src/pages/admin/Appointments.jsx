import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config/api";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${API_URL}admin/allAppointmentsAdmin`);
      if (res.status) {
        setAppointments(res.data.appointment);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load appointments");
    }
  };
  const cancelAppointment=async(id)=>{
    try {
        const res=await axios.post(`${API_URL}admin/cancelappointment`,{id:id});
        if(res.status)
        {
          toast.success(res.data.message);
          fetchAppointments();
        }
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Appointments</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Age</th>
              <th className="p-3 text-left">Date & Time</th>
              <th className="p-3 text-left">Doctor</th>
              <th className="p-3 text-left">Fees</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  No appointments found
                </td>
              </tr>
            ) : (
              appointments.map((app, index) => (
                <tr
                  key={app._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={app?.drid?.image || "/default.png"}
                      alt="doctor"
                      className="w-10 h-10 rounded-full object-cover border"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default.png";
                      }}
                    />
                    <span>{app?.uid?.name}</span>
                  </td>

                  <td className="p-3">{app?.uid?.age}</td>

                  <td className="p-3">
                    {new Date(app?.date).toLocaleDateString()}{" "}
                    {app?.time}
                  </td>

                  <td className="p-3">
                    {app?.drid?.userid?.name}
                  </td>

                  <td className="p-3 font-medium">
                    ₹{app?.drid?.Fees}
                  </td>

                  <td className="p-3">
                    {app.status==="cancelled"?<span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-600">
                      Canceled
                    </span>:<button
  onClick={() => cancelAppointment(app._id)}
  className="px-3 py-1 text-sm rounded-full bg-red-500 text-white hover:bg-red-600 transition"
>
  Cancel
</button>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
