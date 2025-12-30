import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../config/api";

const AddUser = () => {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    roleid: "",
    age: ""
  });

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}admin/listusers`);
      if (res.data?.status) {
        setUsers(res.data.data);
      } else {
        toast.error(res.data?.message || "Failed to fetch users");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}admin/insertuser`, data);
      toast.success(res.data.message || "User added successfully");
      fetchUsers(); // refresh list

      setData({
        name: "",
        email: "",
        password: "",
        roleid: "",
        age: ""
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  const deletelUser=async(id)=>{
      try {
          const res=await axios.delete(`${API_URL}admin/deleteuser/${id}`);
          console.log(res);
          if(res.status)
          {
            toast.success(res.data.message);
          }
          fetchUsers();
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* FORM */}
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mb-10">
        <h1 className="text-2xl font-bold text-center mb-6">
          Add User
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name + Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Password + Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Age</label>
              <input
                type="number"
                name="age"
                value={data.age}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium">Role</label>
            <select
              name="roleid"
              value={data.roleid}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Select Role --</option>
              <option value="6929c41b374701cef30d6cfc">Doctor</option>
              <option value="6929c41b374701cef30d6cfb">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Add User
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u, index) => (
                <tr
                  key={u._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{u.name}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{u.age || "-"}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                      {u.roleid?.rolename || "N/A"}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <button className="px-3 py-1 text-xs bg-yellow-400 text-white rounded hover:bg-yellow-500">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600" onClick={()=>deletelUser(u._id)}>
                      Delete
                    </button>
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

export default AddUser;
