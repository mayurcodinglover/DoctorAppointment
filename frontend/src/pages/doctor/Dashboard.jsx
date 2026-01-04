import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
    const [countdata, setCountData] = useState();
    const [latestBooking, setlatestBooking] = useState();
    const url = import.meta.env.VITE_URL;
    const token = localStorage.getItem("token");
    const fetchDatacount = async () => {
        try {

            const res = await axios.get(`${url}doctor/doctordatacount`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setCountData(res.data.data);
            console.log(res.data.counts);

        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }
    const cancelAppointment = async (id,status) => {
        try {
            const res = await axios.post(`${url}doctor/changeappointmentstatus`, { id:id,status:status });
            if (res.status) {
                toast.success(res.data.message);
                fetchLatestBookingDcotor();
            }
        } catch (error) {
            toast.error(error);
        }
    }
    const confirmAppointment=async(id,status)=>{
        try {
            const res=await axios.post(`${url}doctor/changeappointmentstatus`,{
                id:id,status:status
            });
            toast.success(res.data.message);
            fetchLatestBookingDcotor();
        } catch (error) {
            console.log(error);
            toast.error(error);
        }

    }
    const fetchLatestBookingDcotor = async () => {
        try {

            const res = await axios.get(`${url}doctor/latestbookingdoctor`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data.appointment);
            
            if (res.status) {
                setlatestBooking(res.data.appointment);
            }
        } catch (error) {
            console.log(error);
            toast.error(error)
        }
    }
    console.log(latestBooking);

    useEffect(() => {
        fetchDatacount();
        fetchLatestBookingDcotor();
    }, []);
    return (
    <div className="p-6 bg-gray-100 min-h-screen">
        {/* ===== Stats Section ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow">
                <p className="text-gray-500">Earning</p>
                <p className="text-3xl font-bold text-blue-600">
                    {countdata?.totalEarning}
                </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
                <p className="text-gray-500">Appointments</p>
                <p className="text-3xl font-bold text-green-600">
                    {countdata?.totalAppointments}
                </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
                <p className="text-gray-500">Patients</p>
                <p className="text-3xl font-bold text-purple-600">
                    {countdata?.totalPatients}
                </p>
            </div>
        </div>

        {/* ===== Latest Booking Section ===== */}
        <div className="bg-white rounded-xl shadow p-6">
            <h1 className="text-xl font-semibold mb-4">Latest Booking</h1>

            {latestBooking?.length === 0 && (
                <p className="text-gray-500">No bookings found</p>
            )}

            <div className="space-y-4">
                {latestBooking?.map((lb) => (
                    <div
                        key={lb._id}
                        className="flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50 transition"
                    >
                        {/* Left */}
                        <div className="flex items-center gap-4">
                            <img
                                src={
        lb?.drid?.image
            ? `${url}uploads/${lb.drid.image}`
            : "/default.png"
    }
                                alt="doctorimage"
                                className="w-14 h-14 rounded-full object-cover border"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/default.png";
                                }}
                            />

                            <div>
                                <p className="font-medium text-gray-800">
                                    {lb?.drid?.userid?.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {new Date(lb.booking_date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {/* Right */}
                        {lb.status === "pending" ? (
                            <div className="flex justify-center items-center">
                                <button
                                    onClick={() => cancelAppointment(lb._id,"cancelled")}
                                    className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => confirmAppointment(lb._id,"confirmed")}
                                    className="px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition ml-2"
                                >
                                    Confirm
                                </button>
                            </div>
                        ) : lb.status === "cancelled" ? (
                            <span className="text-red-600 font-medium">Canceled</span>
                        ) : (
                            <span className="text-green-600 font-medium">Confirmed</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>
);
}

export default Dashboard; 
