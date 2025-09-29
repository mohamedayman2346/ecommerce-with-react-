import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import "../components/dashboard/dashboard.css";
export default function DashboardContainer() {
  return (
    <div className="d-flex gap-2 mt-4  position-relative overflow-hidden dashboard-conteiner">
      <Sidebar />
      <Outlet />
    </div>
  );
}
