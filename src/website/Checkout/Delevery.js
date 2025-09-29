import { useContext, useEffect, useRef, useState } from "react";
import { WindowSizeContext } from "../../Context/WindowSize";
import Form from "react-bootstrap/Form";
import { baseURL} from "../../Api/Api";
import axios from "axios";
import "../../components/CSS/alert.css";
import "../../components/CSS/Google.css";

export default function Delivery() {
  // page widht
  const { width } = useContext(WindowSizeContext);
 
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
    phone: "",
    town: "",
    apartment: "",
    address: "",
    company: "",
  });

  // handle the form value
  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //handle send form
  async function handleSubmit(e) {
   
    e.preventDefault();
    // send the form data to the server
    try {
       await axios.post(`${baseURL}/${""}`, form);
    } catch (err) {
      console.log(err);
    } 
  }

  console.log(form);

  return (
    <>
      
      <div
        className="d-flex px-5 py-5 align-items-start flex-wrap"
        style={{ justifyContent: width > 900 ? "space-around" : "center" }}
      >
        <div className="me-5">

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
                First Name
              </Form.Label>
            </Form.Group>

            <Form.Group
              className="position-relative my-5"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Control
                type="text"
                required
                name="company"
                value={form.company}
                onChange={handleForm}
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                Company Name
              </Form.Label>
            </Form.Group>

            <Form.Group
              className=" my-5 position-relative"
              controlId="exampleForm.ControlInput3"
            >
              <Form.Control
                type="text"
                name="address"
                value={form.address}
                onChange={handleForm}
                required
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                Street Address
              </Form.Label>
            </Form.Group>

            <Form.Group
              className=" my-5 position-relative"
              controlId="exampleForm.ControlInput3"
            >
              <Form.Control
                type="text"
                name="apartment"
                value={form.apartment}
                onChange={handleForm}
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                Apartment, Floor, etc (optional)
              </Form.Label>
            </Form.Group>

            <Form.Group
              className=" my-5 position-relative"
              controlId="exampleForm.ControlInput3"
            >
              <Form.Control
                type="text"
                name="town"
                value={form.town}
                onChange={handleForm}
                required
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                Town/City
              </Form.Label>
            </Form.Group>

            <Form.Group
              className=" my-5 position-relative"
              controlId="exampleForm.ControlInput3"
            >
              <Form.Control
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleForm}
                required
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                Phone Number
              </Form.Label>
            </Form.Group>

            <Form.Group
              className=" my-5 position-relative"
              controlId="exampleForm.ControlInput3"
            >
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleForm}
                required
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                Email Address
              </Form.Label>
            </Form.Group>

            <div className="mb-3 d-flex gap-3">
              <Form.Check // prettier-ignore
                type="checkbox"
                name="group1"
              />
              <p>save this information for faster check-out next time</p>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
