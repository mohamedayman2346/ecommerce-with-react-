import { useEffect, useState } from "react";
import { PRODUCT, PRODUCTS } from "../../Api/api";
import { Axios } from "../../Api/Axios";
import { Link } from "react-router-dom";
import TableShow from "../../components/Dashboard/Table";

export default function Products() {
  // get users data
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // get All categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${PRODUCTS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setProducts(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // delete function
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${PRODUCT}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  const header = [
    { key: "images", name: "images" },
    { name: "Title", key: "title" },
    { name: "Description", key: "description" },
    { name: "Price", key: "price" },
    { name: "Rating", key: "rating" },
    { name: "Created", key: "created_at" },
    { name: "Updated", key: "updated_at" },
  ];

  return (
    <div className="bg-white w-100">
      <div className="d-flex align-items-center justify-content-between p-2">
        <h1 className="text-center py-3">Products Page</h1>
        <Link className="btn btn-primary" to="/dashboard/product/add">
          Add product
        </Link>
      </div>

      <TableShow
        header={header}
        data={products}
        delete={handleDelete}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        loading={loading}
        total={total}
        search='title'
        searchLink={PRODUCT}
      />
    </div>
  );
}
