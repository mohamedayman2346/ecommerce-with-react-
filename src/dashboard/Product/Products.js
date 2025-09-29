import { useEffect, useState } from "react";
import TableShow from "../../components/table/Table";
import { Axios } from "../../Api/Axios";
import LoadingPage from "../../components/Loading/loading";
import { Link } from "react-router-dom";
import { PRODUCT, PRODUCTS } from "../../Api/Api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // pagination tool
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  // table header
  const header = [
    { key: "images", name: "images" },
    { name: "Title", key: "title" },
    { name: "Description", key: "description" },
    { name: "Price", key: "price" },
    { name: "Rating", key: "rating" },
    { name: "Created", key: "created_at" },
    { name: "Updated", key: "updated_at" },
  ];

  // get all Users
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${PRODUCTS}?limit=${limit}&page=${page}`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.data);
        setTotal(res.data.total);
        setLoading(false);
      })
      .catch((rej) => console.log(rej));
  }, [page, limit]);

  // delete user
  async function handleDelete(id) {
    try {
      await Axios.delete(`${PRODUCT}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {loading && <LoadingPage />}
      <div className="w-100">
        {/* page title */}
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-center mb-3">All Products</h1>
          <Link to="/dashboard/product/add" className="btn btn-primary">
            Add Products
          </Link>
        </div>
        {/* table */}
        <TableShow
          data={products}
          header={header}
          delete={handleDelete}
          loading={loading}
          limit={limit}
          setLimit={setLimit}
          page={page}
          setPage={setPage}
          total={total}
          search="title"
          searchLink={PRODUCT}
        />
      </div>
    </>
  );
}
