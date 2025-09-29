import { useContext, useEffect, useRef, useState } from "react";
import LoadingPage from "../../components/Loading/loading";
import { Container, Form } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { cart } from "../../Context/IsChanger";
import PlusMinusBtn from "../../components/PlusMinusBtn.js/PlusMinusBtn";

export default function CartPage() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(1);
  let total = 0;
  const { isChanger } = useContext(cart);
  //   get product data
  useEffect(() => {
    const getProduct = JSON.parse(localStorage.getItem("product"));
    setProduct(getProduct);
    setLoading(false);
  }, [isChanger]);
  //   change count
  function changeCount(id, btnCount) {
    const getproduct = JSON.parse(localStorage.getItem("product")) || [];
    const findProdcut = getproduct.find((item) => item.id == id);
    findProdcut.count = btnCount;
    localStorage.setItem("product", JSON.stringify(getproduct));
  }

  // delete product
  function handleDelete(id) {
    const filterProduct = product.filter((item) => item.id !== id);
    setProduct(filterProduct);
    localStorage.setItem("product", JSON.stringify(filterProduct));
  }

  // console.log(total.current + 1)

  const productShow = product?.map((product, key) => (
    <div
      key={key}
      className="d-flex align-items-center flex-wrap justify-content-between shadow-lg my-4 p-3 rounded"
    >
      <p style={{ display: "none" }}>
        {" "}
        {(total += product.count * product.discount)}
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
        <h3>Price</h3>
        <p>${product.discount} </p>
      </div>
      <div>
        <h3>Quantity</h3>
        <PlusMinusBtn
          setCount={setCount}
          id={product.id}
          count={product.count || 1}
          changeCount={changeCount}
        />
      </div>
      <div>
        <h3>Total</h3>
        <p>${product.count * product.discount}</p>
      </div>
      <span className="btn btn-danger" onClick={() => handleDelete(product.id)}>
        Delete
      </span>
    </div>
  ));

  return (
    <>
      {loading && <LoadingPage />}
      <Container style={{ minHeight: "100vh" }}>
        <div className="d-flex my-5 ">
          <NavLink className="nav-link text-black-50 me-2" to="/">
            Home /{" "}
          </NavLink>
          <NavLink className="nav-link fw-bold" to="/cart">
            {" "}
            Cart{" "}
          </NavLink>
        </div>
        <h3 className="product-container p-3 my-5 shadow-lg text-center">
          Prodcut on cart
        </h3>
        {productShow}
        <div className="d-flex justify-content-between align-items-center w-100">
          <Link to="/All-Products" className="btn btn-outline-white border">
            Return to Shop
          </Link>
          <Link to="#" className="btn btn-outline-white border">
            Update Cart
          </Link>
        </div>
        <div className="d-flex justify-content-around align-items-start flex-wrap  my-5">
          <div className="d-flex gap-3 mb-5">
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Coupon Code"
                className="p-2"
              />
            </Form.Group>
            <button type="button" className="btn btn-danger text-black-50">
              Apply Coupon
            </button>
          </div>

          <div
            className=" border border-3 border-black p-5"
            style={{ width: "400px" }}
          >
            <div>
              <h3>Cart Total</h3>
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
            <Link
              to="/checkout"
              className="btn btn-danger px-5 py-3 text-white-50 mt-2 ms-4"
            >
              Procees to checkout
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
