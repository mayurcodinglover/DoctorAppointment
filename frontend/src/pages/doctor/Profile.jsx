import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const url = import.meta.env.VITE_URL;
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);  
  const [edit, setEdit] = useState(false); 

  const fetchDoctor = async () => {
    try {
      const res = await axios.get(`${url}doctor/getdoctoruser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.doctorUser[0]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {user && (
        <div className="bg-white shadow-lg rounded-2xl max-w-md w-full p-6">
          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              src={
                user?.image
                  ? `${url}uploads/${user.image}`
                  : "/default.png"
              }
              alt="Doctor"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />
          </div>

          {/* Name */}
          <h2 className="text-2xl font-bold text-center mt-4">
            {user?.userid?.name}
          </h2>

          {/* Degree / Speciality / Experience */}
          <div className="flex justify-center gap-4 mt-3 text-sm text-gray-600">
            <span className="bg-blue-100 px-3 py-1 rounded-full">
              {user?.degree}
            </span>
            <span className="bg-green-100 px-3 py-1 rounded-full">
              {user?.speciality}
            </span>
            <span className="bg-purple-100 px-3 py-1 rounded-full">
              {user?.Experience} yrs
            </span>
          </div>

          {/* Details */}
          <div className="mt-6 space-y-3 text-gray-700">
            <div>
              <span className="font-semibold">About:</span>{" "}
              {edit ? (<>
              <textarea name="address" id="" cols="50" rows="5" value={user?.AboutDoctor}></textarea>
              </>):(<p>{user?.AboutDoctor }</p>)}
              
            </div>

            <div>
              <span className="font-semibold">Appointment Fee:</span>{" "}
                {edit?(<>
                <input type="number" name="fees" id="fees" value={user?.Fees} />
                </>):(<p>₹{user?.Fees}</p>)}
              
            </div>

            <div>
                <span className="font-semibold">Address:</span>{" "}
                {edit ?(<><textarea name="address" id="address" value={user?.Address} cols="50" rows="5"></textarea></>):(<p>{user?.Address}</p>)}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 flex justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition" onClick={()=>setEdit(!edit)}>
              {edit ? "Update": "Edit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
