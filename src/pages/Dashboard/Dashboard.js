import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import './Dashboard.css';

export default function Dashboard(){
    
    return(
        <div className = "position-relative dashboard ">
            <Topbar />
            <div className = 'd-flex  gap-1' style = {{marginTop: '70px'}}>
            <Sidebar />
            <Outlet />
            </div>
        </div>
    )
}