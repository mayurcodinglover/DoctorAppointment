import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config/api";

const AddDoctor = () => {
  const [users, setUsers] = useState([]);
  const [preview, setPreview] = useState(null);

  const [data, setData] = useState({
    userid: "",
    degree: "",
    experience: "",
    fees: "",
    address: "",
    aboutdoctor: "",
    speciality: "",
    image: null,
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setData((d) => ({ ...d, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const fetchDoctorUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}admin/getdocutoruser`);
      if (res.status) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch users");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      const res = await axios.post(
        `${API_URL}admin/adddoctor`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status) {
        toast.success("Doctor added successfully");
        setData({
          userid: "",
    degree: "",
    experience: "",
    fees: "",
    address: "",
    aboutdoctor: "",
    speciality: "",
    image: null,
        })
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchDoctorUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Add Doctor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="image"
              className="w-32 h-32 border-2 border-dashed rounded-lg flex justify-center items-center cursor-pointer overflow-hidden"
            >
              <img
                src={preview || "/doctor-placeholder.png"}
                alt="Doctor"
                className="object-cover w-full h-full"
              />
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <p className="text-sm text-gray-500">
              Click image to upload
            </p>
          </div>

          {/* User Select */}
          <div>
            <label className="label">Select User</label>
            <select
              name="userid"
              value={data.userid}
              onChange={handleChange}
              className="input"
            >
              <option value="">-- Select User --</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Grid Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Degree</label>
              <input
                type="text"
                name="degree"
                value={data.degree}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="label">Speciality</label>
              <input
                type="text"
                name="speciality"
                value={data.speciality}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="label">Experience (Years)</label>
              <input
                type="number"
                name="experience"
                value={data.experience}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="label">Fees (₹)</label>
              <input
                type="number"
                name="fees"
                value={data.fees}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="label">Address</label>
            <textarea
              name="address"
              rows="3"
              value={data.address}
              onChange={handleChange}
              className="input"
            ></textarea>
          </div>

          {/* About Doctor */}
          <div>
            <label className="label">About Doctor</label>
            <textarea
              name="aboutdoctor"
              rows="4"
              value={data.aboutdoctor}
              onChange={handleChange}
              className="input"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Doctor
          </button>
        </form>
      </div>

      {/* Tailwind reusable classes */}
      <style>
        {`
          .label {
            display: block;
            margin-bottom: 0.25rem;
            font-weight: 500;
            color: #374151;
          }
          .input {
            width: 100%;
            padding: 0.5rem 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            outline: none;
          }
          .input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 1px #2563eb;
          }
        `}
      </style>
    </div>
  );
};

export default AddDoctor;
