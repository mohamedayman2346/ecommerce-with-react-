import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL, LOGIN } from "../../Api/api";
import LoadingSubmit from "../../components/Loading/Loading";
import Cookie from "universal-cookie";
import { Form } from "react-bootstrap";

export default function Login() {
  // states
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //Ref
  const focus = useRef("");

  //handle focus
  useEffect(() => {
    focus.current.focus();
  }, []);

  //Loading
  const [loading, setLoading] = useState(false);

  //cookies
  const cookie = new Cookie();

  // error
  const [err, setErr] = useState("");

  // handle form change
  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${LOGIN}`, form);
      const token = res.data.token;
      const role = res.data.user.role;
      const go = role === "1995" ? "users" : role === "1991" ? "writer" : "/";
      cookie.set("e-commerce", token);
      setLoading(false);
      window.location.pathname = `/dashboard/${go}`;
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err.response.status === 401) setErr("Wrong email or password");
      else {
        setErr("Internal server error");
      }
    }
  }

  console.log(form);
  return (
    <>
      {loading && <LoadingSubmit />}
      <div className="container">
        <div className="row " style={{ height: "100vh" }}>
          <Form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1>Login Now</h1>
              <Form.Group className="form-custom mt-5">
                <Form.Control
                  type="email"
                  id="email"
                  placeholder="Enter your Email..."
                  value={form.email}
                  ref={focus}
                  onChange={handleForm}
                  name="email"
                  required
                />
                <Form.Label htmlFor="email">Email:</Form.Label>
              </Form.Group>

              <Form.Group className="form-custom">
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
                <Form.Label htmlFor="password">password:</Form.Label>
              </Form.Group>

              <button className="btn btn-primary ">Login</button>

              <div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      alt="sign in with google"
                      src={require("../../Logo-google-icon-PNG.png")}
                    />
                  </div>
                  <p className="btn-text">
                    <b>Sign in With Google</b>
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
