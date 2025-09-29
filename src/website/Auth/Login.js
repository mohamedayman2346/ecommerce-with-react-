import { useContext, useEffect, useRef, useState } from "react";
import { WindowSizeContext } from "../../Context/WindowSize";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
import { baseURL, LOGIN } from "../../Api/Api";
import axios from "axios";
import Cookie from "universal-cookie";
import "../../components/CSS/alert.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingPage from "../../components/Loading/loading";

export default function Login() {
  // page widht
  const { width } = useContext(WindowSizeContext);
  // cookie instance
  const cookie = new Cookie();
  const [loading, setLoading] = useState(true);
  //error state
  const [error, setError] = useState(null);
  // show password
  const [show, setShow] = useState(false);
  const [passwordShow, setPasswordShow] = useState("password");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

    //handle show
  function handleShow() {
    setShow((e) => !e);
    if (passwordShow === "password") setPasswordShow("text");
    else setPasswordShow("password");
  }
  // focus
  const focus = useRef("");
  // handel foucs
  useEffect(() => {
    focus.current.focus();
  }, []);

  // form state
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // handle the form value
  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //handle send form
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    // send the form data to the server
    try {
      const res = await axios.post(`${baseURL}/${LOGIN}`, form);
      let token = res.data.token;
      cookie.set("ecommerce", token);
      let role = res.data.user.role;
      window.location.pathname = role === "1995" ? "/dashboard/dashboardPage" : "/";
    } catch (err) {
      if (err.status === 401) setError("email or password is wrong");
      else setError("there is an error, please try again later");
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      {loading && <LoadingPage />}

      <div
        className="d-flex form  py-5 align-items-start flex-wrap"
        style={{ justifyContent: width > 900 ? "space-around" : "center" }}
      >
        {width > 965 && (
          <div className=" animate__animated animate__fadeInUp animate__delay-1s">
            <img
              src={require("../../Access/images/Auth.png")}
              alt="login"
              style={{ maxWidth: width > 1200 ? "700px" : "500px" }}

            />
          </div>
        )}
        <div className="me-5 animate__animated animate__fadeInUp">
          <div className="mb-5">
            <h1>Log in to Exclusive</h1>
            <p>Enter your details below</p>
          </div>

          <Form className="auth-form my-5 " onSubmit={handleSubmit}>
            <Form.Group
              className="position-relative"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                type="email"
                required
                name="email"
                value={form.email}
                onChange={handleForm}
                ref={focus}
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                Email or Phone Numbers
              </Form.Label>
            </Form.Group>

            <Form.Group
              className=" my-5 position-relative"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Control
                type={passwordShow}
                name="password"
                value={form.password}
                onChange={handleForm}
                minLength={"8"}
                required
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                Password
              </Form.Label>
              <p onClick={handleShow} className="eye">
                {show ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </p>
            </Form.Group>

            {error && <span className="error">{error}</span>}

            <div className="d-flex justify-content-between algin-items-center w-100">
              <button className="btn btn-danger px-4 py-2" type="submit">
                Log In
              </button>
              <NavLink
                to="/forget-password"
                className="text-decoration-none text-danger"
              >
                Forget Password
              </NavLink>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
