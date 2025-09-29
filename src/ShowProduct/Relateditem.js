import { useEffect, useState } from "react";
import { TOPRATED } from "../Api/Api";
import ShowTopRated from "./TopRated/ShowTopRated";
import { Axios } from "../Api/Axios";
import LoadingPage from "../components/Loading/loading";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function RelatedItem() {
  const [products, setPtoducts] = useState([]);
  const [limit, setLimit] = useState(4);

  useEffect(() => {
    Axios.get(`${TOPRATED}?limit=${limit}`)
      .then((res) => {
        console.log((res.data.length = 4), setPtoducts(res.data));
      })
  }, []);

  const showProduct = products.map((product) => (
    <ShowTopRated
      title={product.title}
      rating={product.rating}
      id={product.id}
      image={product.images[0].image}
      price={product.price}
      discount={product.discount}
      col={3}
      stock={product.stock}
      product={product}
    />
  ));

  return (
    <>
      <Container className="mt-5 " >
        <h5 className="section-title text-danger">Related Item</h5>
        <div
          className="d-flex flex-wrap justify-content-start align-items-center last "
          style={{ overflowX: "hidden" }}
        >
          {showProduct}
        </div>
        <div className="buttom mt-5 d-flex align-items-center justify-content-center">
        </div>
      </Container>
    </>
  );
}
