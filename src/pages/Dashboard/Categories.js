import { useEffect, useState } from "react";
import { CATEGORIE, CATEGORY } from "../../Api/api";
import { Axios } from "../../Api/Axios";
import { Link } from "react-router-dom";
import TableShow from "../../components/Dashboard/Table";

export default function Categories() {
  // get users data
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // get All categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CATEGORIE}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCategories(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  // delete function
  async function handleDelete(id) {
    try {
      await Axios.delete(`${CATEGORY}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  const header = [
    { name: "Title", key: "title" },
    { name: "Image", key: "image" },
    { name: "Created", key: "created_at" },
    { name: "Updated", key: "updated_at" },
  ];

  return (
    <div className="bg-white w-100">
      <div className="d-flex align-items-center justify-content-between p-2">
        <h1 className="text-center py-3">Categories Page</h1>
        <Link className="btn btn-primary" to="/dashboard/category/add">
          Add Categorie
        </Link>
      </div>

      <TableShow
        header={header}
        data={categories}
        delete={handleDelete}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        loading={loading}
        total={total}
        search="title"
        searchLink={CATEGORY}
      />
    </div>
  );
}
