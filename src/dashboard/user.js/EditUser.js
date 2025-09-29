import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { USER } from "../../Api/Api";
import "../../components/CSS/alert.css";
import LoadingPage from "../../components/Loading/loading";
import { Axios } from "../../Api/Axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  // data
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const { id } = useParams("");

  useEffect(() => {
    setLoading(true);
    Axios.get(`${USER}/${id}`)
      .then((res) => {
        setEmail(res.data.email);
        setName(res.data.name);
        setRole(res.data.role);
        setDisable(false);
        setLoading(false);
      })
      .catch(() => navigate("/dashboard/users/page/404", { replace: true }));
  }, []);

  // focus
  const focus = useRef("");
  // handel foucs
  useEffect(() => {
    focus.current.focus();
  }, []);

  // Handle submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    // send user data
    try {
      await Axios.post(`${USER}/edit/${id}`, {
        name: name,
        email: email,
        role: role,
      });
      navigate("/dashboard/users");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <>
      {loading && <LoadingPage />}

      <div className="d-flex w-100 py-5 align-items-center justify-content-center">
        <div className="me-5">
          <div className="mb-5">
            <h1>Edit User to Exclusive</h1>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                Email or Phone Numbers
              </Form.Label>
            </Form.Group>

            <Form.Group className=" my-5 position-relative" id="role">
              <Form.Label htmlFor="role">Role:</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
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

            <button
              disabled={disable}
              className="btn btn-danger px-4 py-2 w-100"
              type="submit"
            >
              Save
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
