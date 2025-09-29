import { Container, Form } from "react-bootstrap";
import LoadingPage from "../../components/Loading/loading";
import { useContext, useEffect, useState } from "react";
import Delivery from "./Delevery";
import { NavLink } from "react-router-dom";
import { cart } from "../../Context/IsChanger";
import Bank from "./Bank";

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [pageShow, setPageShow] = useState('delevery')
  let total = 0;
  const { isChanger } = useContext(cart);
  //   get product data
  useEffect(() => {
    const getProduct = JSON.parse(localStorage.getItem("product"));
    setProduct(getProduct);
    setLoading(false);
  }, [isChanger]);

  const productShow = product?.map((product, key) => (
    <div
      key={key}
      className="d-flex align-items-center flex-wrap justify-content-between my-4 p-3 rounded"
    >
      <p style={{ display: "none" }}>
        {" "}
        {(total += product.count * product.discount || 200)}
      </p>

      <div className="d-flex gap-1">
        <img
          src={product.images[0].image}
          alt="img"
          style={{ width: "50px" }}
        />
        <p className="mt-2">{product.title}</p>
      </div>

      <div>
        <p>${product.count * product.discount || 200}</p>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <LoadingPage />}
      <Container>
        <div className="d-flex my-5">
          <NavLink className="nav-link text-black-50 me-2" to="/profile">
            Account /{" "}
          </NavLink>
          <NavLink className="nav-link text-black-50 me-2" to="/All-products">
            Product /{" "}
          </NavLink>
          <NavLink className="nav-link text-black-50 me-2" to="/cart">
            View Cart/{" "}
          </NavLink>
          <NavLink className="nav-link me-2" to="/checkout">
            Checkout{" "}
          </NavLink>
        </div>

        <div className="row">
            {/* form */}
          <div className="col-md-6 col-12">
            <h1>Billing Details</h1>
            {pageShow === 'bank' ? <Bank />   : <Delivery />}
          </div>
          {/* buy  */}
          <div className="col-md-5 col-12">
            <details className="p-5 pb-2">
              <summary>Show Product</summary>
              {productShow}
            </details>
            {/* invoice */}
            <div className=" p-5 pb-0" style={{ width: "400px" }}>
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  <p>SubTotal</p>
                  <p>${total}</p>
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between">
                  <p>Shopping</p>
                  <p>free</p>
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between">
                  <p>Total</p>
                  <p>${total}</p>
                </div>
              </div>
            </div>
            {/* buy method */}
                  {/* page Show */}
            <div className="p-5 pt-2">
              <div className="mb-1 d-flex gap-3">
                <Form.Check // prettier-ignore
                  type="radio"
                  name="group1"
                  id="bank"
                  onChange={() => setPageShow('bank')}
                />
                <Form.Label htmlFor="bank">Bank</Form.Label>
              </div>
              <div className="mb-1 d-flex gap-3">
                <Form.Check // prettier-ignore
                  type="radio"
                  name="group1"
                  id="dele"
                  onChange={() => setPageShow('delevery')}
                />
                <Form.Label htmlFor="dele" >Cash On Delevery</Form.Label>
              </div>
            </div>
            {/* coupon */}
            <div className="d-flex gap-3 ps-5 mb-5">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="text"
                  placeholder="Coupon Code"
                  className="p-2"
                />
              </Form.Group>
              <button
                type="button"
                className="btn btn-danger text-black-50"
                style={{ width: "150px" }}
              >
                Apply Coupon
              </button>
            </div>
            {/* submit */}
            <div className="p-5 pt-2">
            <button type='submit' className="btn btn-danger ">Place Order</button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
