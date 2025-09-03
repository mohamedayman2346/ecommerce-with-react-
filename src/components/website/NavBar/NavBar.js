import { Button, Container, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CATEGORIE } from "../../../Api/api";
import { useContext, useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import "./navbar.css";
import StringSlice from "../../../helpers/StringSlice";
import SkeletonShow from "../Skeleton/Skeleton";
import { Cart } from "../../../context/CartChangerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PlusMinusBtn from "../../../pages/website/plusMinusbtn/PlusMinusBtn";

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { isChanger } = useContext(Cart);
  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [count, setCount] = useState(1);

  // data on navbar
  useEffect(() => {
    Axios.get(`${CATEGORIE}`)
      .then((res) => setCategories(res.data.slice(-8)))
      .finally((_) => setLoading(false));
  }, []);

  //data in modal
  useEffect(() => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(getProducts);
  }, [isChanger]);

  const HandleDelete = (id) => {
    const filterProduct = products.filter((product) => product.id !== id);
    setProducts(filterProduct);
    localStorage.setItem("product", JSON.stringify(filterProduct));
  };

  const changeCount = (id, btnCount) => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    const findProduct = getProducts.find( product => product.id == id);
    findProduct.count = btnCount;
    localStorage.setItem("product", JSON.stringify(getProducts));
  }

  const categoriesShow = categories.map((categorie, key) => (
    <p key={key} className="m-0 category-title text-black">
      {StringSlice(categorie.title, 15)}
    </p>
  ));

  const productsShow = products?.map((product, key) => (
    <div className="mb-4 position-relative" key={key}>
      <div
        className="position-absolute top-0 end-0 rounded-circle d-flex align-items-center justify-content-center bg-danger text-white"
        style={{ width: "20px", height: "20px", cursor: "pointer" }}
        onClick={() => HandleDelete(product.id)}
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>
      <div className="d-flex align-items-start gap-2 flex-wrap">
        <img
          src={product.images[0].image}
          height={"80px"}
          style={{ objectFit: "cover" }}
          className="rounded col-sm-3 col-12"
          alt="img"
        />
        <div className="col-sm-6 col-12">
          <h6>{product.title}</h6>
          <p className="m-0 text-truncate"> {product.description} </p>
          <div className="d-flex align-items-center gap-3">
            <h5 className="m-0 text-primary"> {product.discount} </h5>
            <h6
              className="m-0"
              style={{ color: "gray", textDecoration: "line-through" }}
            >
              {" "}
              {product.price}{" "}
            </h6>
          </div>
        </div>
        <PlusMinusBtn
          count={product.count || 1}
          id={product.id}
          setCount={setCount}
          changeCount = {changeCount}
        />
      </div>
    </div>
  ));

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>{productsShow}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Checkout</Button>
        </Modal.Footer>
      </Modal>
      <nav className="py-3">
        <Container>
          <div className="d-flex aligm-items-center justify-content-between flex-wrap">
            <Link className="col-3" to="/">
              <img
                width="200px"
                src={require("../../../images/ecommerce-logo.png")}
                alt="logo"
              />
            </Link>

            <div className="col-12 col-md-6  order-md-2 order-3 mt-md-0 mt-3 position-relative">
              <Form.Control
                type="search"
                className="form-control custom-search py-3 rounded-0"
                placeholder="search Product"
              />
              <h3 className="btn btn-primary position-absolute top-0 end-0 h-100 line-height  m-0 px-4 rounded-0 d-flex align-items-center justify-content-center">
                search
              </h3>
            </div>
            <div className="col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1">
              <div onClick={handleShow}>
                <img
                  width="50px"
                  src={require("../../../images/cart-icon.png")}
                  alt="cart"
                />
              </div>
              <Link to="/profile">
                <img
                  width="55px"
                  src={require("../../../images/profile icon.png")}
                  alt="cart"
                />
              </Link>
            </div>
          </div>

          <div className="mt-3">
            <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
              {loading ? (
                <SkeletonShow width="70px" length="8" height="30px" />
              ) : (
                categoriesShow
              )}
              <Link className="text-black category-title" to="/categoriesShow">
                Show All
              </Link>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}
