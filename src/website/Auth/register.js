import { useContext, useEffect, useRef, useState } from "react";
import { WindowSizeContext } from "../../Context/WindowSize";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
import { baseURL, REGISTER } from "../../Api/Api";
import axios from "axios";
import Cookie from "universal-cookie";
import "../../components/CSS/alert.css";
import "../../components/CSS/Google.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingPage from "../../components/Loading/loading";

export default function Register() {
  // page widht
  const { width } = useContext(WindowSizeContext);
  // cookie instance
  const cookie = new Cookie();
  //loading
  const [loading, setLoading] = useState(true);
  //error state
  const [error, setError] = useState(null);
  // show password
  const [show, setShow] = useState(false);
  const [passwordShow, setPasswordShow] = useState("password");
  // focus
  const focus = useRef("");
  // handel foucs
  useEffect(() => {
    focus.current.focus();
  }, []);

  // form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // handle the form value
  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  //handle send form
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    // send the form data to the server
    try {
      const res = await axios.post(`${baseURL}/${REGISTER}`, form);
      let token = res.data.token;
      cookie.set("ecommerce", token);
      let role = res.data.user.role;
      window.location.pathname =
        role === "1995" ? "/dashboard/dashboardPage" : "/";
    } catch (err) {
      if (err.status === 422) setError("email already been take");
      else setError("there is an error, please try again later");
    } finally {
      setLoading(false);
    }
  }

  //handle show
  function handleShow() {
    setShow((e) => !e);
    if (passwordShow === "password") setPasswordShow("text");
    else setPasswordShow("password");
  }

  return (
    <>
      {loading && <LoadingPage />}

      <div
        className="d-flex form px-5 py-5 align-items-start flex-wrap"
        style={{ justifyContent: width > 900 ? "space-around" : "center" }}
      >
        {width > 965 && (
          <div>
            <img
              src={require("../../Access/images/Auth.png")}
              alt="login"
              style={{ maxWidth: width > 1200 ? "700px" : "500px" }}
              className=" animate__animated animate__fadeInUp animate__delay-1s"
            />
          </div>
        )}

        <div className="me-5  animate__animated animate__fadeInUp">
          <div className="mb-5">
            <h1>Create An Account</h1>
            <p>Enter your details below</p>
          </div>

          <Form className="auth-form my-5" onSubmit={handleSubmit}>
            <Form.Group
              className="position-relative"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                type="text"
                required
                name="name"
                value={form.name}
                onChange={handleForm}
                minLength="3"
                ref={focus}
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                Name
              </Form.Label>
            </Form.Group>

            <Form.Group
              className="position-relative my-5"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Control
                type="email"
                required
                name="email"
                value={form.email}
                onChange={handleForm}
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                Email or Phone Numbers
              </Form.Label>
            </Form.Group>

            <Form.Group
              className=" my-5 position-relative"
              controlId="exampleForm.ControlInput3"
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

            <button className="btn btn-danger px-4 py-2 w-100" type="submit">
              Create Account
            </button>

            <a
              href={"http://127.0.0.1:8000/login-google"}
              className="google-btn w-100 my-3"
            >
              <div className="d-flex justify-content-center align-items-center gap-3">
                <img
                  src={require("../../Access/images/Logo-google-icon-PNG.png")}
                  alt="google"
                  width={"30px"}
                />
                <span>Sing Up With Google</span>
              </div>
            </a>

            <p className="mt-3">
              Already have an account?
              <NavLink to="/login" className="text-black ms-2">
                Log in
              </NavLink>
            </p>
          </Form>
        </div>
      </div>
    </>
  );
}
