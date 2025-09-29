import { useEffect, useState } from "react";
import { LATESTSALE } from "../../Api/Api";
import LoadingPage from "../../components/Loading/loading";
import { Axios } from "../../Api/Axios";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ShowLastProduct from "../LastProduct/ShowLastProduct";

export default function LastSaleProduct() {
  const [products, setPtoducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${LATESTSALE}`)
      .then((res) => setPtoducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  // console.log(product.images[0].image)
  const showProduct = products.map((product) => (
    <ShowLastProduct
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
        <h5 className="section-title text-danger">This Month</h5>
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <h1>Best Selling Products</h1>

          <div className="buttom mt-5 d-flex align-items-center justify-content-center">
            <Link
              to="/All-Products"
              className="px-5 py-3 nav-link rounded bg-danger text-center text-white-50"
              style={{ width: "230px" }}
            >
              View All 
            </Link>
          </div>
        </div>
        <div className="d-flex justify-content-start align-items-center last">
          {showProduct}
        </div>
      </Container>
    </>
  );
}
