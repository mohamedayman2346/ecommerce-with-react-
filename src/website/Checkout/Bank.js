import { useContext, useEffect, useRef, useState } from "react";
import { WindowSizeContext } from "../../Context/WindowSize";
import Form from "react-bootstrap/Form";
import { baseURL } from "../../Api/Api";
import axios from "axios";
import "../../components/CSS/alert.css";
import "../../components/CSS/Google.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

export default function Bank() {
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
    cardNumber: "",
    Date: "",
    cvc: "",
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
      <div className="d-flex px-5 py-5 align-items-start flex-wrap">
        <div className="me-5 w-100">
          <h3>Credit Card</h3>
          <Form className="auth-form my-5" onSubmit={handleSubmit}>
            <Form.Group
              className="position-relative"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                type="text"
                required
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleForm}
                maxLength="16"
                ref={focus}
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                <div className="d-flex">
                  <FontAwesomeIcon icon={faCreditCard} className="mt-1" />
                  <p className="mb-5">0000 0000 0000 0000</p>
                </div>
              </Form.Label>
            </Form.Group>

            <Form.Group className=" my-5" controlId="exampleForm.ControlInput2">
              <Form.Label>card expire</Form.Label>
              <Form.Control
                type="month"
                required
                name="Date"
                value={form.Date}
                onChange={handleForm}
              />
            </Form.Group>

            <Form.Group
              className=" my-5 position-relative"
              controlId="exampleForm.ControlInput3"
            >
              <Form.Control
                type="number"
                name="cvc"
                value={form.cvc}
                onChange={handleForm}
                maxLength='3'
                pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}"
                required
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                cvc / cvv
              </Form.Label>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
}
