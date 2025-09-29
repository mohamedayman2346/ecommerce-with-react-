import { useEffect, useState } from "react";
import { TOPRATED } from "../../Api/Api";
import LoadingPage from "../../components/Loading/loading";
import { Axios } from "../../Api/Axios";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import DateShow from "../../components/DateShow/DateShow";
import { Link } from "react-router-dom";
import ShowTopRated from "./ShowTopRated";

export default function TopRated() {
  const [products, setPtoducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(6)

  useEffect(() => {
    Axios.get(`${TOPRATED}?limit=${limit}`)
      .then((res) => {
        console.log((res.data.length = 6 ),
        setPtoducts(res.data)
    )}) 
      .finally(() => setLoading(false))
  }, []);
  
  const showProduct = products.map((product) => (
    <ShowTopRated
      title={product.title}
      rating={product.rating}
      id={product.id}
      image={product.images[0].image}
      price={product.price}
      discount={product.discount}
      col={4}
      stock={product.stock}
      product={product}
    />
  ));

  return (
    <>
      {loading && <LoadingPage />}
      <Container className="mt-5 " style={{ minHeight: "100vh" }}>
        <h5 className="section-title text-danger">Our Product</h5>
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <h1>Explore Our Products</h1>
          <DateShow position = 'upper' />
          <div className="arrow d-flex gap-2">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="p-2  rounded-circle"
              style={{ background: " whitesmoke" }}
              //   onClick={handleLeft}
            />
            <FontAwesomeIcon
              icon={faArrowRight}
              className="p-2 rounded-circle"
              style={{ background: " whitesmoke" }}
              //   onClick={handleRight}
            />
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-start align-items-center last " style = {{overflowX: "hidden"}} >
          {showProduct}
        </div>
        <div className="buttom mt-5 d-flex align-items-center justify-content-center">
          <Link
            to="/All-Products"
            className="px-5 py-3 nav-link rounded bg-danger text-center text-white-50"
            style={{ width: "230px" }}
          >
            View All Products
          </Link>
        </div>
      </Container>
    </>
  );
}
