import { useEffect, useRef, useState } from "react";
import { baseURL, USER } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import LoadingPage from "../../components/Loading/loading";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./profile.css";
import axios from "axios";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  // user value
  const [fristName, setFristName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [id, setId] = useState();

  // input focus
  const focus = useRef();
  useEffect(() => {
    focus.current.focus();
  }, []);
  //get user data
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${USER}`)
      .then((res) => {
        setFristName(res.data.name.split(' ').slice(0,1));
        setLastName(res.data.name.split(' ').slice(1));
        setEmail(res.data.email);
        setId(res.data.id);
        // setLastName(res.data)
        // setAddress(res.data)
      })
      .catch((rej) => console.log(rej))
      .finally(setLoading(false));
  }, []);

  async function handleSubmit(e) {
    setLoading(true)
    e.preventDefault();
    try{
        await axios.post(`${baseURL}/${USER}/edit/${id}`,{
        name: fristName + lastName,
        email: email,
      })
    } catch(err) {
      console.log(err);
    } finally{
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <LoadingPage />}
      <div className="p-5">
        {/* page navigate */}
        <div className="d-flex justify-content-between flex-wrap px-5 my-5">
          <div className="direction d-flex">
            <NavLink className="nav-link text-black-50 me-2" to="/">
              Home /{" "}
            </NavLink>
            <NavLink className="nav-link fw-bold" to="/profile">
              {" "}
              Profile{" "}
            </NavLink>
          </div>
          <div className="userName">
            <h6>
              Welcome! <span className="text-danger">{fristName}</span>
            </h6>
          </div>
        </div>

        {/* div page contact */}
        <Container className="row my-5">
          <div className="col-12 col-md-4 col-lg-4 mb-4 animate__animated animate__fadeInLeft ">
            <div className="navigate me-3">
              {/* account setting */}
              <div className="account">
                <h5 className="ms-3">Manage My Account</h5>
                <NavLink to="/profile" className="nav-link ms-5 text-danger">
                  My Profile
                </NavLink>
                <NavLink to="/" className="nav-link ms-5">
                  {" "}
                  Address Book{" "}
                </NavLink>
                <NavLink to="/" className="nav-link ms-5">
                  {" "}
                  My Payment Options{" "}
                </NavLink>
              </div>
              {/* order setting */}
              <div className="order my-4">
                <h5 className="ms-3">My Orders</h5>
                <NavLink to="/" className="nav-link ms-5 ">
                  My Returns
                </NavLink>
                <NavLink to="/cancellation" className="nav-link ms-5">
                  My Cancellations
                </NavLink>
              </div>
              {/* WishList */}
              <div className="WishList">
                <h5>
                  <NavLink className="nav-link ms-3" to="/WishList">
                    My WishList
                  </NavLink>
                </h5>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8 shadow-lg p-5 animate__animated animate__fadeInRight">
            <Form onSubmit={handleSubmit}>
              <h5 className="text-danger">Edit Your Profile</h5>
              {/* user name */}
              <div className="row gap-5">
                <Form.Group
                  controlId="exampleForm.ControlInput1"
                  className="col-12 col-md-5"
                >
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="first-name"
                    value={fristName}
                    onChange={(e) => setFristName(e.target.value)}
                    minLength="3"
                    ref={focus}
                  />{" "}
                </Form.Group>
                <Form.Group
                  controlId="exampleForm.ControlInput2"
                  className="col-12 col-md-5"
                >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    minLength="3"
                  />
                </Form.Group>
              </div>
              {/* User Email && Adreess */}
              <div className="row gap-5">
                <Form.Group
                  controlId="exampleForm.ControlInput3"
                  className="col-12 col-md-5"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />{" "}
                </Form.Group>
                <Form.Group
                  controlId="exampleForm.ControlInput5"
                  className="col-12 col-md-5"
                >
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    minLength="3"
                  />
                </Form.Group>
              </div>
              {/* password */}
              <div className="mt-4">
                <h6>Password Changes</h6>
                <Form.Group controlId="exampleForm.ControlInput7">
                  <Form.Control
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    minLength={"8"}
                    placeholder="Current Password"
                    required
                  />
                </Form.Group>
                <Form.Group
                  controlId="exampleForm.ControlInput8"
                  className="my-4"
                >
                  <Form.Control
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    minLength={"8"}
                    placeholder="New Password"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput9">
                  <Form.Control
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    minLength={"8"}
                    placeholder="Confirm New Passwod"
                    required
                  />
                </Form.Group>
              </div>
              {/* button */}
              <div className="d-flex justify-content-end gap-3 w-100 my-4">
                <button className="btn  px-4 py-2" type="button">
                  Cancel
                </button>
                <button className="btn btn-danger px-5 py-2" type="submit">
                  Save Changes
                </button>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </>
  );
}
