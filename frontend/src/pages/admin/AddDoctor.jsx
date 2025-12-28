import {react} from "react";
import { toast } from "react-toastify";
import { useEffect,useState } from "react";
import { API_URL } from "../../config/api";
import axios from "axios"
const AddDoctor=()=>{
    const [users, setUsers] = useState();
    const [data, setData] = useState({
        userid:"",
        degree:"",
        experience:"",
        fees:"",
        address:"",
        aboutdr:"",
        speciality:""
    });
    const fetchDoctorUsers=async()=>{
        try {
            const res=await axios.get(`${API_URL}admin/getdocutoruser`);
            if(res.status)
            {
                setUsers(res.data.data);
            }
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }
    console.log(data);
    
    const handleSubmit=async()=>{
        try {
            const res=await axios.post(`${API_URL}admin/adddoctor`,data);
            console.log(res);
        } catch (error) {
            toast.error(error);
        }
    }
    const handleChange=async(e)=>{
        const {name,value}=e.target;
        setData((d)=>(
            {...d,[name]:value}
        ));
    }
    useEffect(() => {
        fetchDoctorUsers();
    }, []);
    return (
        <>
            <h1>Add Doctor</h1>
            <div>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="users">Select Users</label>
                    <select name="userid" id="userid" value={data.userid} onChange={handleChange}>
                        <option value="" selected>--Select Users--</option>
                        {users?.map((u,index)=>(
                            <option key={index} value={u._id}>{u.name}</option>
                        ))}
                    </select>
                    <div>
                        <label htmlFor="Degree">Degree</label>
                        <input type="text" name="degree" value={data.degree} id="degree" onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="experience">Experience</label>
                        <input type="number" name="experience" id="experience" value={data.experience} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="fees">Fees</label>
                        <input type="number" name="fees" id="fees" value={data.fees} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="Address">Address</label>
                        <textarea name="address" id="address" cols="50" rows="5" value={data.address} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label htmlFor="About">About Doctor</label>
                        <textarea name="aboutdr" id="aboutdr" cols="50" rows="5" value={data.aboutdr} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label htmlFor="speciality">Speciality</label>
                        <input type="text" name="speciality" id="speciality" onChange={handleChange} value={data.speciality}/>
                    </div>
                    <button type="submit">Add Doctor</button>
                </form>
            </div>
        </>
    )
}
export default AddDoctor;