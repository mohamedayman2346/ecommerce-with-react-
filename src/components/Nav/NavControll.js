import {
  faBagShopping,
  faBars,
  faCartShopping,
  faChessBoard,
  faHeart,
  faMagnifyingGlass,
  faRightFromBracket,
  faStar,
  faTableList,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import Cookie from "universal-cookie";
import { useContext, useEffect, useState } from "react";
import { Bars } from "../../Context/IsOpen";
import { LOGOUT, USER } from "../../Api/Api";
import { Axios } from "../../Api/Axios";

export default function NavControll() {
  const cookie = new Cookie();
  const token = cookie.get("ecommerce");
  // show side bar
  const [barrshow, setBarsShow] = useState(false);
  // user data
  const [user, setUser] = useState("");

  // profile
  const [ShowProfile, setShowProfile] = useState(false);

  // get user data
  useEffect(() => {
    if (token) {
      Axios.get(`${USER}`).then((res) => setUser(res.data));
    }
  }, []);

  useEffect(() => {
    if (window.location.pathname.split("/")[1] == "dashboard")
      setBarsShow(true);
  }, []);

  // sing show in navbar
  let sing = true;
  if (token) {
    sing = false;
  } else {
    sing = true;
  }

  //handle LogOut
  async function handleLogOut() {
    try {
      await Axios.get(`${LOGOUT}`)
      cookie.remove("ecommerce");
      window.location.pathname('/');
    } catch (err) {
      console.log(err);
    }
  }

  // sidebar in dashboard
  const bars = useContext(Bars);
  const setIsopen = bars.setIsOpen;
  const isOpen = bars.isOpen;

  return (
    <Navbar className="bg-body-tertiary w-100 d-flex flex-wrap" expand="md">
      <Container fluid>
        <div className="d-flex align-items-center gap-3">
          {/* logo */}
          <NavLink to="/" className="display-6 text-black text-decoration-none">
            Exclusive
          </NavLink>
          {/* Bars */}
          {barrshow && (
            <FontAwesomeIcon
              title={"open sideBar"}
              cursor={"pointer"}
              onClick={() => setIsopen((prev) => !prev)}
              style={{
                color: isOpen ? "#038edc" : "black",
                padding: "8px",
                border: isOpen ? "2px solid #038edc" : "none",
                borderRadius: "10px",
              }}
              icon={faBars}
            />
          )}
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-around">
          <Nav
            className=" my-2 my-lg-0 gap-4 custom-nav"
            style={{ maxHeight: "100px" }}
          >
            <NavLink className="nav-link" title="Go to Home" to="/">
              Home
            </NavLink>

            <NavLink
              className="nav-link"
              title="Keep Your Massege"
              to="/contact"
            >
              Contact
            </NavLink>

            <NavLink
              className="nav-link"
              title="learn more for Exclusive"
              to="/about"
            >
              About
            </NavLink>
            {/* register  */}
            {sing && (
              <NavLink
                className="nav-link text-decoration-underline"
                to="/register"
                title="Go to Register"
              >
                SingUp
              </NavLink>
            )}
          </Nav>

          <Form
            className="position-relative mt-3 mt-lg-0"
            style={{ width: "300px" }}
          >
            <Form.Control
              type="search"
              placeholder="What are you looking for?"
              className="me-2 "
              aria-label="Search"
            />
            <Form.Label>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="position-absolute top-0 end-0 m-2 me-4"
              />
            </Form.Label>
          </Form>
          {/* profile & cart & love */}
          {token && (
            <div className="d-flex justify-content-start align-items-center gap-3">
              <Link to="/Wishlist" className="nav-link fs-4 ">
                <FontAwesomeIcon icon={faHeart} />
              </Link>

              <Link to="/cart" className="nav-link fs-4">
                <FontAwesomeIcon icon={faCartShopping} />
              </Link>

              <div className="position-relative">
                <p
                  className="m-0 fs-4"
                  onClick={() => setShowProfile((prev) => !prev)}
                >
                  <FontAwesomeIcon icon={faUser} className="rounded-circle" />
                </p>
                {ShowProfile && (
                  <div className="profileDetails position-absolute">
                    <ul>
                      {(user.role === "1995" ||
                        user.role === "1999" ||
                        user.role === "1991") && (
                        <li>
                          <Link
                            to="/dashboard/dashboardPage"
                            className="nav-link d-flex align-items-center gap-2"
                          >
                            <FontAwesomeIcon icon={faChessBoard} />
                            <p>Dashboard</p>
                          </Link>
                        </li>
                      )}
                      {/* profile */}
                      <li>
                        <Link
                          to="/profile"
                          className="nav-link d-flex align-items-center gap-2"
                        >
                          {" "}
                          <FontAwesomeIcon icon={faUser} />
                          <p>Manage My Account</p>
                        </Link>
                      </li>
                      {/* shoping */}
                      <li>
                        <Link
                          to="/cart"
                          className="nav-link d-flex align-items-center gap-2"
                        >
                          {" "}
                          <FontAwesomeIcon icon={faBagShopping} />
                          <p> My Order</p>
                        </Link>
                      </li>
                      {/* cancel */}
                      <li>
                        <Link
                          to="/cancellation"
                          className="nav-link d-flex align-items-center gap-2"
                        >
                          {" "}
                          <FontAwesomeIcon
                            icon={faXmark}
                            className="rounded-circle"
                            style={{ border: "2px solid black" }}
                          />
                          <p>My Cancellation</p>
                        </Link>
                      </li>
                      {/* review */}
                      <li>
                        <Link
                          to="/review"
                          className="nav-link d-flex align-items-center gap-2"
                        >
                          {" "}
                          <FontAwesomeIcon icon={faStar} />
                          <p> My Reviews</p>
                        </Link>
                      </li>
                      {/* categories show */}
                      <li>
                        <Link
                          to="/categoriesPage"
                          className="nav-link d-flex align-items-center gap-2"
                        >
                          {" "}
                          <FontAwesomeIcon icon={faTableList} />
                          <p>All categories</p>
                        </Link>
                      </li>
                      {/* logOut */}
                      <li>
                        <div
                          className=" d-flex align-items-center gap-2 log-out rounded"
                          onClick={handleLogOut}
                          style={{ cursor: "pointer" }}
                        >
                          {" "}
                          <FontAwesomeIcon icon={faRightFromBracket} />
                          <p> Log Out</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
