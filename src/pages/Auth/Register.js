import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL, REGISTER } from "../../Api/api";
import LoadingSubmit from "../../components/Loading/Loading";
import Cookie from "universal-cookie";
import { Form } from "react-bootstrap";

export default function Register() {
  // states
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Loading
  const [loading, setLoading] = useState(false);

  // Ref
  const focus = useRef("");

  //handle ref
  useEffect(() => {
    focus.current.focus();
  }, []);

  //cookie
  const cookie = new Cookie();

  //error
  const [err, setErr] = useState("");

  // handle form change
  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // handle Submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(`${baseURL}/${REGISTER}`, form);
      setLoading(false);
      window.location.pathname = "/dashboard/users";
      const token = res.data.token;
      cookie.set("e-commerce", token);
    } catch (err) {
      console.log(err);
      if (err.response.status === 422) setErr("Email is already been taken");
      else setErr("Internal Server Error");

      setLoading(false);
    }
  }

  console.log(form);
  return (
    <>
      {loading && <LoadingSubmit />}
      <div className="container">
        <div className="row" style={{ height: "100vh" }}>
          <Form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1>Register Now</h1>

              <Form.Group className="mb-3 form-custom mt-5">
                <Form.Control
                  ref={focus}
                  type="text"
                  id="name"
                  placeholder="Enter your Name..."
                  value={form.name}
                  onChange={handleForm}
                  name="name"
                  required
                />
                <Form.Label htmlFor="name">Name</Form.Label>
              </Form.Group>

              <Form.Group className="mb-3 form-custom">
                <Form.Control
                  type="email"
                  id="email"
                  placeholder="Enter your Email..."
                  value={form.email}
                  onChange={handleForm}
                  name="email"
                  required
                />
                <Form.Label htmlFor="email">Email</Form.Label>
              </Form.Group>

              <Form.Group className="mb-3 form-custom">
                <Form.Control
                  type="password"
                  id="password"
                  placeholder="Enter your Password..."
                  value={form.password}
                  onChange={handleForm}
                  name="password"
                  required
                  minLength="6"
                />
                <Form.Label htmlFor="password">password</Form.Label>
              </Form.Group>

              <button className="btn btn-primary">Register</button>

              <div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      alt="sign in with google"
                      src={require("../../Logo-google-icon-PNG.png")}
                    />
                  </div>
                  <p className="btn-text me-1">
                    <b>Register With Google</b>
                  </p>
                </a>
              </div>

              {err !== "" && <span className="err">{err}</span>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
