import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Appointments = () => {
  const [data, setData] = useState([]);
  const url = import.meta.env.VITE_URL;

  const fetchData = async () => {
    try {
      const res = await axios.get(`${url}doctor/allappointmentsdoctor`);
      if (res.data.status) {
        setData(res.data.allappointment);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const handleStatus=async(id,status)=>{
    try {
        const res=await axios.post(`${url}doctor/changeappointmentstatus`,{id,status})
        if(res.data.status)
        {
            toast.success(res.data.message);
            fetchData();
        }
        else{
            toast.error(res.data.message);
        }
        
    } catch (error) {
        toast.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  console.log(data);
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        All Appointments
      </h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-center">#</th>
              <th className="px-4 py-3 text-center">Patient</th>
              <th className="px-4 py-3 text-center">Payment</th>
              <th className="px-4 py-3 text-center">Age</th>
              <th className="px-4 py-3 text-center">Date & Time</th>
              <th className="px-4 py-3 text-center">Fees</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500"
                >
                  No appointments found
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{index + 1}</td>

                  <td className="px-4 py-3 font-medium text-gray-700">
                    {item.uid.name}
                  </td>

                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-700">
                      {item.payment_mode}
                    </span>
                  </td>

                  <td className="px-4 py-3">{item.uid.age}</td>

                  <td className="px-4 py-3 text-gray-600">
                    {new Date(item.date)
                      .toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })
                      .replace(",", "")}
                  </td>

                  <td className="px-4 py-3 font-semibold">
                    ₹{item.drid.Fees}
                  </td>

                  <td className="px-4 py-3 text-center space-x-2">
                    {item.status==="pending"?<>
                    <button className="px-3 py-1 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 transition" onClick={()=>handleStatus(item._id,'confirmed')}>
                      Confirm
                    </button>
                    <button className="px-3 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"onClick={()=>handleStatus(item._id,'cancelled')}>
                      Cancel
                    </button>
                    </>:item.status==="confirmed" ? <p className="text-green-900 font-bold">Confirmed</p>:<p className="text-red-900 font-bold">Cancelled</p>}
                    
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
