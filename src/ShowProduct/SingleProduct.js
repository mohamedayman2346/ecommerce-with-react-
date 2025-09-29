import { Link, NavLink, useParams } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Axios } from "../Api/Axios";
import { CART, PRODUCT } from "../Api/Api";
import LoadingPage from "../components/Loading/loading";
import ImageGallery from "react-image-gallery";
import {
  faHeart,
  faTruck,
  faStar as regularStar,
} from "@fortawesome/free-regular-svg-icons";
import { faRepeat, faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Product.css";
import Size from "../components/Size/Size";
import PlusMinusBtn from "../components/PlusMinusBtn.js/PlusMinusBtn";
import { cart } from "../Context/IsChanger";
import RelatedItem from "./Relateditem";
import SkeletonShow from "../components/Skeleton/Skeleton";

export default function SingleProduct() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const [color, setColor] = useState("");
  const [count, setCount] = useState(0);
  const [cartLoading, setCartLoading] = useState(false);
  const { setIsChanger } = useContext(cart);

  // star
  const starRound = Math.round(product.rating);
  const star = Math.min(starRound, 5);
  const GoldStar = Array.from({ length: star }).map((_, key) => (
    <FontAwesomeIcon icon={solid} style={{ color: "gold" }} key={key} />
  ));
  const blackStar = Array.from({ length: 5 - star }).map((_, key) => (
    <FontAwesomeIcon icon={regularStar} key={key} />
  ));

  const { id } = useParams();

  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`)
      .then((res) => {
        setProduct(res.data[0]);
        setProductImage(
          res.data[0].images.map((img) => {
            return { original: img.image, thumbnail: img.image };
          })
        );
      })
      .catch((rej) => console.log(rej))
    .finally(() => setLoading(false));
  }, [id]);

  //  check product in local or not
  const chechStock = async () => {
    try {
      setCartLoading(true);
      const getItem = JSON.parse(localStorage.getItem("product")) || [];
      const productCount = getItem.filter((item) => item.id !== id)?.[0]?.count;
      await Axios.post(`${CART}/check`, {
        product_id: product.id,
        count: count + (productCount ? productCount : 0),
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      setCartLoading(false);
    }
  };

  //set product in local

  const handleCart = async () => {
    const check = await chechStock();
    if (check) {
      const getItem = JSON.parse(localStorage.getItem("product")) || [];
      const productExist = getItem.findIndex((product) => product.id == id);
      if (productExist !== -1) {
        if (getItem[productExist].count) getItem[productExist].count += count;
        else getItem[productExist].count = count;
      } else {
        if (count > 0) {
          product.count = count;
        }
        getItem.push(product);
      }

      localStorage.setItem("product", JSON.stringify(getItem));
      setIsChanger((prev) => !prev);
      window.location.pathname = "/cart";
    }
  };

  function bestProduct() {
    const getItem = JSON.parse(localStorage.getItem("bestProduct")) || [];
    const productExist = getItem.findIndex((item) => item.id == id);
    if (productExist === -1) {
      getItem.push(product);
    }
    localStorage.setItem("bestProduct", JSON.stringify(getItem));
  }

  return (
    <>
      {loading && <LoadingPage />}
      <Container className="my-5">
        <div className="d-flex my-5">
          <NavLink className="nav-link text-black-50 me-2" to="/All-products">
            All Product /{" "}
          </NavLink>
          <NavLink className="nav-link fw-bold" to={`/product/${id}`}>
            {" "}
            {product.title}{" "}
          </NavLink>
        </div>
        <div className="product-info row justify-content-evenly">
          {/* show product image */}
          <div className="col-12 col-md-7 col-lg-5 animate__animated animate__fadeInUp" >
            <ImageGallery items={productImage} />
          </div>
          <div className="col-12 col-md-5 col-lg-6 animate__animated animate__fadeInUp">
            <h1>{product.title}</h1>
            {/* stars */}
            <div className="d-flex gap-5 align-items-center">
              <div className="d-flex">
                {GoldStar}
                {blackStar}
              </div>
              {product.stock > 0 && (
                <p className="text-success m-0">| in Stock </p>
              )}
            </div>
            {/* price */}
            <div className="d-flex align-items-center gap-3 my-2">
              <h4>{product.discount}</h4>
              <del>{product.price}</del>
            </div>
            {/* desc */}
            <p>{product.description}</p>
            {product.stock == 0 && (
              <p className="text-danget my-2">Not Avaliable</p>
            )}
            {product.stock == 1 && (
              <p className="text-danget my-2">only one stock Avaliable</p>
            )}
            <hr />
            <div className="d-flex gap-3 align-items-center mt-4">
              <h4 className="mb-4">Colors : </h4>
              <Form>
                {["radio"].map((type) => (
                  <div key={`default-${type}`} className="mb-3 d-flex gap-3">
                    <Form.Check // prettier-ignore
                      type={type}
                      name="group1"
                      id={`default-${type}-1`}
                      onClick={() => setColor("blue")}
                    />
                    <Form.Check // prettier-ignore
                      type={type}
                      name="group1"
                      id={`default-${type}-2`}
                      onClick={() => setColor("red")}
                    />
                  </div>
                ))}
              </Form>
            </div>
            <Size />
            <div className="d-flex aling-items-center justify-content-between mt-3 flex-wrap">
              <div>
                <PlusMinusBtn setCount={(data) => setCount(data)} />
              </div>
              <button
                className="btn btn-danger py-2"
                style={{ width: "150px" }}
                onClick={handleCart}
              >
                {cartLoading ? "loading..." : "Buy Now"}
              </button>
              <span
                className="btn btn-outline-danger border rounded p-3  "
                onClick={bestProduct}
              >
                <FontAwesomeIcon icon={faHeart} />
              </span>
            </div>
            {/* delivery */}
            <div className="border p-2 mt-5">
              <Link
                to="#"
                className="d-flex btn justify-content-around align-items-center border-bottom"
              >
                <div>
                  <FontAwesomeIcon className="fs-2" icon={faTruck} />
                </div>
                <div className="">
                  <h5>Free Deleviry</h5>
                  <p className="text-decoration-underline">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </Link>
              <Link
                to="#"
                className="d-flex btn justify-content-around align-items-center"
              >
                <div>
                  <FontAwesomeIcon className="fs-2" icon={faRepeat} />
                </div>
                <div className="">
                  <h5>Return Delivery</h5>
                  <p>
                    Free 30 Days Delivery Returns.{" "}
                    <span className="text-decoration-underline">Details</span>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* related item */}
        <RelatedItem />
      </Container>
    </>
  );
}
