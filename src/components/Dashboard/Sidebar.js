import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import { Bars } from "../../Context/IsOpen";
import { useContext, useEffect, useState } from "react";
import { WindowSizeContext } from "../../Context/WindowSize";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import { Links } from "./SidebarLink";

export default function Sidebar() {
  const bars = useContext(Bars);
  const isOpen = bars.isOpen;
  const size = useContext(WindowSizeContext);
  const width = size.width;

  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((res) => setUser(res.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          // top: "140px",
          left: "0",
          width: "100%",
          height: "100vh",
          background: "rgba(0, 0 ,0 ,0.2)",
          display: width < "768" && isOpen ? "block" : "none",
        }}
      ></div>

      <div
        className=" sidebar shadow-lg bg-white mb-3 vh-100 py-5 px-4"
        style={{
          left: width < 765 ? (isOpen ? 0 : "-100%") : 0,
          width: isOpen ? "230px" : "85px",
          position: width < 765 ? "fixed" : "sticky",
          overflow: "hidden",
        }}
      >
        {Links.map(
          (item, key) =>
            item.role.includes(user.role) && (
              <NavLink
                to={`${item.path}`}
                key={key}
                className="nav-link d-flex align-items-center my-2 rounded"
                title={item.title}
              >
                <FontAwesomeIcon
                  style={{ padding: isOpen ? "10px 8px 10px 15px" : " 10px" }}
                  icon={item.icon}
                />
                <span style={{ display: isOpen ? "block" : "none" }}>
                  {item.name}
                </span>
              </NavLink>
            )
        )}
      </div>
    </>
  );
}
