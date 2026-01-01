import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config/api";
import { toast } from "react-toastify";

const ListDoctor = () => {
  const [data, setData] = useState([]);

  const fetchDoctor = async () => {
    try {
      const res = await axios.get(`${API_URL}admin/listdoctor`);
      if (res.data) {
        setData(res.data.allDoctor);
      }
    } catch (error) {
      toast.error("Failed to load doctors");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">All Doctors</h1>

      {/* Doctor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((d) => (
          <div
            key={d._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-4 text-center"
          >
            {/* Doctor Image */}
            <img
              src={`${API_URL}uploads/${d.image}`}
              alt={d.userid?.name}
              className="w-32 h-32 mx-auto rounded-lg object-cover mb-4"
            />

            {/* Doctor Name */}
            <h2 className="text-lg font-semibold">
              {d.userid?.name}
            </h2>

            {/* Speciality */}
            <p className="text-gray-500 text-sm mb-2">
              {d.speciality}
            </p>

            {/* Availability */}
            <div className="flex justify-center items-center gap-2 text-sm text-green-600">
              <input type="checkbox" checked readOnly />
              <span>Available</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListDoctor;
