import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import "./Footer.css";
import { NavLink } from "react-router-dom";

export default function Footer() {
    const date = new Date();
    const year = date.getFullYear();

  return (
    <div className="p-5  bg-dark text-white row justify-content-center gap-2 m-0">
      <div className="col-12 col-md-4 col-lg-2">
        <h2>Exclusive</h2>
        <h4>Subscibe</h4>
        <p>Get 10% off your first order</p>
        <Form.Group
          className="position-relative "
          controlId="exampleForm.ControlInput4"
        >
          <Form.Control
            type="email"
            className="bg-transparent text-white-50"
            required
            placeholder="Enter your email "
          />
          <Form.Label className="position-absolute top-0 end-0 m-2 ">
            <FontAwesomeIcon icon={faPaperPlane} />
          </Form.Label>
        </Form.Group>
      </div>

      <div className="col-12 col-md-4 col-lg-3">
        <h3>Support</h3>
        <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
        <a
          href="mailto:mohamdayman35@gmail.com"
          className="d-block text-white text-decoration-none"
        >
          mohamdayman35@gmail.com
        </a>
        <a
          href="tel:+201069392346"
          className="d-block text-white text-decoration-none"
        >
          +201069392346
        </a>
      </div>

      <div className="col-12 col-md-4 col-lg-2">
        <h3>Account</h3>
        <NavLink className= 'nav-link' to="/profile">My Account</NavLink>
        <div className ='d-flex'>
          <NavLink className= 'nav-link' to="/login">Login / </NavLink>
          <NavLink className= 'nav-link' to="/register"> Register</NavLink>
        </div>
        <NavLink className= 'nav-link' to="/cart">Cart</NavLink>
        <NavLink className= 'nav-link' to="/Wishlist">Wishlist</NavLink>
        <NavLink className= 'nav-link' to="/All-products">Shop</NavLink>
      </div>

      <div className="col-12 col-md-4 col-lg-2">
        <h3>Quick Link</h3>
        <NavLink className= 'nav-link' to="/#">Privacy Policy</NavLink>
        <NavLink className= 'nav-link' to="/#">Terms of Use</NavLink>
        <NavLink className= 'nav-link' to="/#">FAQ</NavLink>
        <NavLink className= 'nav-link' to="/contact">Contact</NavLink>
      </div>

      <div className = 'col-12 col-md-4 col-lg-2'>
        <h3>Download App</h3>
        <p>save $3 with App New User Order</p>
        <div className = 'd-flex justify-content-start align-items-center gap-2'>
            <img src = {require('../../Access/images/Qr Code.png')} alt = 'QR Code' width = {'100px'} />
            <div className = 'd-flex flex-column gap-2'>
                <img src = {require('../../Access/images/GooglePlay.png')} alt = 'Google Play' width = {'120px'} />
                <img src = {require('../../Access/images/download-appstore.png')} alt = 'App Store' width = {'120px'} />
            </div>
        </div>
      </div>
      <hr />
        <p className = 'text-center m-0 text-white-50'> &copy; Copyright Rimel {year}, All right reserved</p>
    </div>
  );
}
