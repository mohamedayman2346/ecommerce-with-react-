import { useContext, useEffect, useState } from "react";
import LoadingPage from "../../components/Loading/loading";
import { Best } from "../../Context/BestChange";
import { Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import ShowWishList from "./ShowWishlist";
import LastProduct from "../../ShowProduct/LastProduct/LastProduct";

export default function Wishlist() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  //   get product data
  const { BestChanger } = useContext(Best);

  useEffect(() => {
    const getProduct = JSON.parse(localStorage.getItem("bestProduct"));
    setProduct(getProduct);
    setLoading(false);
  }, [BestChanger]);

  const ShowProduct = product?.map((product) => (
    <ShowWishList
      title={product.title}
      rating={product.rating}
      id={product.id}
      image={product.images[0].image}
      price={product.price}
      discount={product.discount}
      col={5}
      stock={product.stock}
      product={product}
    />
  ));

  function handleAddCart() {
    const getItemFromCart = JSON.parse(localStorage.getItem("product")) || [];
    const getItemFromWhislist =
      JSON.parse(localStorage.getItem("bestProduct")) || [];
    const filterProduct = getItemFromCart.map((cart) =>
      getItemFromWhislist.filter((whis) => cart.id !== whis.id)
    );
    filterProduct[1].map((item) => getItemFromCart.push(item));
    localStorage.setItem("product", JSON.stringify(getItemFromCart));
  }

  return (
    <>
      {loading && <LoadingPage />}
      <Container style={{ minHeight: "100vh" }}>
        <div className="d-flex align-items-center justify-content-between px-3">
          <div className="d-flex my-5 ">
            <NavLink className="nav-link text-black-50 me-2" to="/">
              Home /{" "}
            </NavLink>
            <NavLink className="nav-link fw-bold" to="/Wishlist">
              {" "}
              Wishlist{" "}
            </NavLink>
          </div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleAddCart}
          >
            Add To Cart
          </button>
        </div>
        <h3>Wishlist ( {product.length} )</h3>
        {product == "" ? (
          <div className="d-flex align-items-center flex-column vh-100">
            {" "}
            <h1 className="text-center my-5">No Product</h1>
            <Link to="/All-products" className="btn btn-danger px-5 py-2 ">
              GO to Add Product
            </Link>
          </div>
        ) : (
          <div
            className="d-flex align-items-center"
            style={{ overflowX: "scroll" }}
          >
            {ShowProduct}
          </div>
        )}
        <LastProduct />
      </Container>
    </>
  );
}
