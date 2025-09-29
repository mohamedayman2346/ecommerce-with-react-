import { useEffect, useState } from "react";
import Cookie from "universal-cookie";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "../../components/Loading/loading";
import Err403 from "./Error/Err403";

export default function RequireAuth({ allowedRole }) {
  // store user data
  const [user, setUser] = useState("");
  // navigate
  const navigate = useNavigate();

  // cookie instance
  const cookie = new Cookie();
  const token = cookie.get("ecommerce");

  // get user data
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((res) => setUser(res.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  return token ? (
    user === "" ? (
      <LoadingPage />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Err403 />
    )
  ) : (
    <Navigate to="/login" replace={true} />
  );
}
