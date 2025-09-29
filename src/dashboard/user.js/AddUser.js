import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { USER } from "../../Api/Api";
import "../../components/CSS/alert.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingPage from "../../components/Loading/loading";
import { Axios } from "../../Api/Axios";

export default function AddUser() {
  const [loading, setLoading] = useState(false);
  // show password
  const [show, setShow] = useState(false);
  const [passwordShow, setPasswordShow] = useState("password");
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
    name: "",
    email: "",
    password: "",
    role: "",
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
      await Axios.post(`${USER}/add`, form);
      window.location.pathname = "/dashboard/users";
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      {loading && <LoadingPage />}

      <div className="d-flex w-100 py-5 align-items-center justify-content-center">
        <div className="me-5">
          <div className="mb-5">
            <h1>Add User to Exclusive</h1>
            <p>Enter User details below</p>
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
                ref={focus}
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                Enter the Name
              </Form.Label>
            </Form.Group>

            <Form.Group
              className="my-5 position-relative"
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
            <Form.Group className=" my-5 position-relative" id="role">
              <Form.Label htmlFor="role">Role:</Form.Label>
              <Form.Select
                value={form.role}
                onChange={handleForm}
                name="role"
                required
              >
                <option disabled value={""}>
                  Select Role
                </option>
                <option value={1995}>Admin</option>
                <option value={2001}>User</option>
                <option value={1991}>Writer</option>
                <option value={1999}>Product manger</option>
              </Form.Select>
            </Form.Group>

            <button className="btn btn-danger px-4 py-2 w-100" type="submit">
              Add User
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
