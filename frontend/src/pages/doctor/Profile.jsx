import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const url = import.meta.env.VITE_URL;
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);  
  const [aboutdr, setAboutDr] = useState();
  const [fees, setFees] = useState();
  const [address, setAddress] = useState();
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
  const updateDoctor=async()=>{
    try {
      const res=await axios.post(`${url}doctor/updatedoctor`,{
        AboutDoctor:aboutdr,
        Fees:fees,
        Address:address
      },{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      });
      toast.success("Profile Updated Successfully");
      setUser({
        ...user,
        AboutDoctor:aboutdr,
        Fees:fees,
        Address:address,
      });
      setEdit(false);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  useEffect(() => {
    fetchDoctor();
  }, []);
  useEffect(() => {
  if (user) {
    setAboutDr(user.AboutDoctor);
    setFees(user.Fees);
    setAddress(user.Address);
  }
}, [user]);



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
              <textarea onChange={(e)=>setAboutDr(e.target.value)} name="aboutdr" id="" cols="50" rows="5" value={aboutdr}></textarea>
              </>):(<p>{user?.AboutDoctor }</p>)}
              
            </div>

            <div>
              <span className="font-semibold">Appointment Fee:</span>{" "}
                {edit?(<>
                <input type="number" onChange={(e)=>setFees(e.target.value)} name="fees" id="fees" value={fees} />
                </>):(<p>₹{user?.Fees}</p>)}
              
            </div>

            <div>
                <span className="font-semibold">Address:</span>{" "}
                {edit ?(<><textarea name="address" onChange={(e)=>setAddress(e.target.value)} id="address" value={address} cols="50" rows="5"></textarea></>):(<p>{user?.Address}</p>)}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 flex justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition" onClick={()=>{
              if(edit)
              {
                updateDoctor();
              }
              else{
                setEdit(true);
              }
            }}>
              {edit ? "Update": "Edit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
