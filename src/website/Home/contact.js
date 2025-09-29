import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import "../../components/CSS/Form.css";
import { useState } from "react";
import { baseURL } from "../../Api/Api";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Contact() {
  //set data
  const [form, setForm] = useState({
    email: "",
    name: "",
    massege: "",
    phone: "",
  });
  //handle data
  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  //send data
  // async function handleSubmit() {
  //   try {
  //     await axios.post(`${baseURL}/`, form);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (

      <Container className="py-5 mt-5" style={{ minHeight: "100vh" }}>
        <div className="d-flex my-5">
          <NavLink className="nav-link text-black-50 me-2" to="/">
            Home /{" "}
          </NavLink>
          <NavLink className="nav-link fw-bold" to="/contact">
            {" "}
            Contact{" "}
          </NavLink>
        </div>

        <div className="row gap-md-5">
          {/* // contact method */}
          <div className="col-lg-4 col-md-5 col-12 shadow-lg p-5 mb-5 mb-md-0 animate__animated animate__fadeInLeftBig ">
            <div className="gap-3 gap-md-0">
              <div>
                <div className="d-flex align-items-center my-2">
                  <FontAwesomeIcon
                    className="bg-danger text-white p-2 rounded-circle me-2"
                    icon={faPhone}
                  />
                  <h5>Call To Us</h5>
                </div>
                <p>We are available 24/7, 7 days a week.</p>
                <a href="tel:+201069392346" className="nav-link">
                  Phone: +01069392346
                </a>
              </div>
              <hr />
              <div>
                <div className=" d-flex align-items-center my-2">
                  <FontAwesomeIcon
                    className="bg-danger text-white p-2 rounded-circle me-2"
                    icon={faEnvelope}
                  />
                  <h5>Write To US</h5>
                </div>
                <p>
                  Fill out our form and we will contact you within 24 hours..
                </p>
                <a href="mailto:mohamdayman35@gmail.com" className="nav-link">
                  {" "}
                  Emails: mohamdayman35@gmail.com
                </a>
                <a href="mailto:mohamdayman35@gmail.com" className="nav-link">
                  {" "}
                  Emails: mohamdayman35@gmail.com
                </a>
              </div>
            </div>
          </div>
          {/* // form */}
          <div className="col-lg-7 col-md-6 col-12 shadow-lg p-5 mb-5 mb-md-0 animate__animated animate__fadeInRightBig">
            <Form action="https://formsubmit.co/mohamdayman35@gmail.com" method="POST" className="auth-form" >
              <div className="row">
                <Form.Group
                  className="mb-3 col-12 col-lg-4 position-relative"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    required
                    minLength={3}
                    name="name"
                    value={form.name}
                    onChange={handleForm}
                  />
                  <Form.Label className="position-absolute top-0 start-25 ">
                    your Name
                  </Form.Label>
                </Form.Group>

                <Form.Group
                  className="mb-3 col-12 col-lg-4 position-relative"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Control
                    type="email"
                    required
                    name="email"
                    value={form.email}
                    onChange={handleForm}
                  />
                  <Form.Label className="position-absolute top-0 start-25 ">
                    Email address
                  </Form.Label>
                </Form.Group>

                <Form.Group
                  className="mb-3 col-12 col-lg-4 position-relative"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Control
                    type="number"
                    minLength={7}
                    required
                    name="phone"
                    value={form.phone}
                    onChange={handleForm}
                  />
                  <Form.Label className="position-absolute top-0 start-25 ">
                    Phone
                  </Form.Label>
                </Form.Group>
              </div>
              <Form.Group
                className="my-3 position-relative"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  rows={3}
                  minLength={10}
                  required
                  name="massege"
                  value={form.massege}
                  onChange={handleForm}
                />
                <Form.Label className="position-absolute top-0 start-25 ">
                  Example textarea
                </Form.Label>
              </Form.Group>

              <div className="w-100 d-flex">
                <button
                  className="btn btn-danger ms-auto mt-3 px-4 py-2 " style = {{width: '200px'}}
                  type="submit"
                >
                  Send Massage
                </button>
              </div>
            </Form>
          </div>
        </div>
      </Container>

  );
}
