import { useNavigate } from "react-router-dom";

const Dashboard=()=>{
    const navigate=useNavigate();
    const Logout=()=>{
        localStorage.removeItem("token");
        navigate('/')
    }
    return (
        <>
        <h1>Admin Dashboard</h1>
        <button onClick={Logout}>Logout</button>
        </>
    )
}
export default Dashboard;