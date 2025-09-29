import { NavLink } from "react-router-dom";
import "./ErrorPage.css";
export default function Err403() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="title">403 Access Denied</h1>
        <p>Your don't have acess to visit this page. You may go home page.</p>
        <NavLink to="/" className="btn btn-danger error-btn">
          Back To Home
        </NavLink>
      </div>
    </div>
  );
}
