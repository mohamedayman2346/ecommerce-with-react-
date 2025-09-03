import { Container } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams } from "react-router-dom";
import { CART, PRODUCT } from "../../../Api/api";
import { Axios } from "../../../Api/Axios";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import {
  faLocationPinLock,
  faStar as solid,
} from "@fortawesome/free-solid-svg-icons";
import SkeletonShow from "../../../components/website/Skeleton/Skeleton";
import { Cart } from "../../../context/CartChangerContext";
import PlusMinusBtn from "../plusMinusbtn/PlusMinusBtn";

export default function SingleProduct() {
  const [product, setProduct] = useState({});
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { setIsChanger } = useContext(Cart);
  const [count, setCount] = useState(0);
  const [loadingCart, setLoadingCart] = useState(false);

  // stars
  const starsRound = Math.round(product.rating);
  const star = Math.min(starsRound, 5);

  const showGoldStart = Array.from({ length: star }).map((_, index) => (
    <FontAwesomeIcon icon={solid} style={{ color: "gold" }} key={index} />
  ));

  const showEmptyStart = Array.from({ length: 5 - star }).map((_, index) => (
    <FontAwesomeIcon icon={regularStar} key={index} />
  ));

  // get data
  useEffect(() => {
    Axios.get(`/${PRODUCT}/${id}`)
      .then((res) => {
        setProductImages(
          res.data[0].images.map((img) => {
            return { original: img.image, thumbnail: img.image };
          })
        );
        setProduct(res.data[0]);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const checkStock = async () => {
    try {
      setLoadingCart(true);
      const getItems = JSON.parse(localStorage.getItem("product")) || [];
      const productCount = getItems.filter(item => item.id !== id)?.[0]?.count;
      await Axios.post(`${CART}/check`, {
        product_id: product.id,
        count: count + (productCount ? productCount : 0),
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      setLoadingCart(false);
    }
  };

  // cart custom
  const HandleCart = async () => {
    const check = await checkStock();
    if (check) {
      const getItems = JSON.parse(localStorage.getItem("product")) || [];

      const productExist = getItems.findIndex((pro) => pro.id == id);

      if (productExist !== -1) {
        if (getItems[productExist].count) {
          getItems[productExist].count += count;
        } else {
          getItems[productExist].count = count;
        }
      } else {
        if (count > 0) {
          product.count = count;
        }
        getItems.push(product);
      }

      localStorage.setItem("product", JSON.stringify(getItems));
      setIsChanger((prev) => !prev);
    }
  };

  return (
    <Container className="mt-5">
      <div className="d-flex aligm-items-start  flex-wrap">
        {loading ? (
          <>
            <div className="col-lg-4 col-md-6 col-12">
              <SkeletonShow height="250px" length="1" classes="col-12" />
              <div className="col-12 mt-1 d-flex">
                <SkeletonShow height="70px" length="1" classes="col-4" />
                <SkeletonShow height="70px" length="1" classes="col-4" />
                <SkeletonShow height="70px" length="1" classes="col-4" />
              </div>
            </div>

            <div className="col-lg-8 col-md-6 col-12">
              <SkeletonShow
                height="30px"
                length="1"
                classes="col-lg-8 col-12"
              />
              <SkeletonShow
                height="220px"
                length="1"
                classes="col-lg-8 col-12 mt-2"
              />
              <hr className="col-lg-8 col-12" />
              <div className="d-flex align-items-center justify-content-between col-lg-8 col-12">
                <SkeletonShow height="20px" length="1" classes="col-4  mt-2" />
                <SkeletonShow height="20px" length="1" classes="col-4  mt-2" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-lg-4 col-md-6 col-12">
              <ImageGallery items={productImages} />
            </div>

            <div className="col-lg-8 col-md-6 col-12">
              <div className="ms-5">
                <h1>{product.title}</h1>
                <p style={{ color: "gray" }}>{product.About}</p>
                <h3 className="fw-normal">{product.description}</h3>

                <div className="d-flex align-items-center justify-content-between mt-2">
                  <div>
                    {product.stock === 1   && <p className="text-danger">there is only 1 left</p>}
                    {product.stock === 0 && <p>product is not avaliable</p>}
                    {showGoldStart}
                    {showEmptyStart}
                    <div className="d-flex align-items-center gap-3">
                      <h5 className="m-0 text-primary">{product.discount}$</h5>
                      <del className="m-0" style={{ color: "gray" }}>
                        {product.price}$
                      </del>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-4">
                    <PlusMinusBtn setCount={(data) => setCount(data)} />
                    {loadingCart ? (
                      <div className="border p-2 rounded">Loading</div>
                    ) : (
                      <div
                        onClick={HandleCart}
                        title="add to cart"
                        className="border p-2 rounded"
                      >
                        <img
                          src={require("../../../images/cart-icon.png")}
                          width="50px"
                          alt="cart"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
