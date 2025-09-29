import { NavLink } from "react-router-dom";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import NavControll from "./NavControll";

export default function Navbar() {
  const [lang, setLang] = useState("En");

  return (
    // sales navbar
    <div className="navbar w-100 m-0 p-0  animate__animated animate__fadeInDown">
      <div className="top-nav d-flex justify-content-around  align-items-center flex-wrap w-100 bg-black px-5 py-2">
        <div className="d-flex align-items-center justify-content-start mb-md-0 mb-2">
          <p className="text-white-50 my-0 me-2">
            Summer Sale For All Swim Suits And Free Express Delivery - Off 50%!
          </p>
          <NavLink to="/All-products" className="text-white ">
            ShopNow
          </NavLink>
        </div>

        <Form.Select
          className="bg-dark text-white"
          style={{ width: "150px", border: "none" }}
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          <option disabled>Select Language</option>
          <option value="En">English</option>
          <option value="AR">Arabic</option>
        </Form.Select>
      </div>
      <NavControll />
    </div>
  );
}
