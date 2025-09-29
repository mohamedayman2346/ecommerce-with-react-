import { useEffect, useState } from "react";
import LoadingPage from "../components/Loading/loading";
import { Axios } from "../Api/Axios";
import { PRODUCTS } from "../Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import ShowTopRated from "./TopRated/ShowTopRated";
import PaginatedItems from "../components/Pagination/pagination";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function AllProoduct() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  //pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(21);
  const [total, setTotal] = useState(0);

  function handleUp() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    Axios.get(`/${PRODUCTS}?limit=${limit}&page=${page}`)
      .then((res) => {
        setProducts(res.data.data);
        setTotal(res.data.total);
      })
      .catch((rej) => console.log(rej))
      .finally(() => setLoading(false));
  }, [limit, page]);

  const showProduct = products?.map((product) => (
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
          <h1>All Products</h1>
        </div>
        <div
          className="d-flex flex-wrap justify-content-start align-items-center last "
          style={{ overflowX: "hidden" }}
        >
          {showProduct}
        </div>
        <div
          className="d-flex align-items-center justify-content-center ms-auto me-auto my-4"
          style={{ width: "250px" }}
        >
          <PaginatedItems
            itemsPerPage={limit}
            setPage={setPage}
            total={total}
          />
        </div>

        {/* <ArrowUp /> */}
        <div
          className="position-fixed rounded-circle p-2 arrow"
          onClick={handleUp}
          style={{ top: "85vh", right: "30px", background: "whitesmoke" }}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </div>
      </Container>
    </>
  );
}
