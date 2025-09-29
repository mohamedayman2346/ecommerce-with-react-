import { useEffect, useState } from "react";
import TableShow from "../../components/table/Table";
import { CATEGORIE, CATEGORY } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import LoadingPage from "../../components/Loading/loading";
import { Link } from "react-router-dom";

export default function Categories() {
  const [Categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  // pagination tool
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  // table header
  const header = [
    { name: "Title", key: "title" },
    { name: "Image", key: "image" },
    { name: "Created", key: "created_at" },
    { name: "Updated", key: "updated_at" },
  ];

  // get all Users
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CATEGORIE}?limit=${limit}&page=${page}`)
      .then((res) => {
        setCategories(res.data.data);
        setTotal(res.data.total);
        setLoading(false);
      })
      .catch((rej) => console.log(rej));
  }, [limit, page]);
  
  // delete user
  async function handleDelete(id) {
    try {
      await Axios.delete(`${CATEGORY}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
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
         <h1 className="text-center mb-3">All Categories</h1>
         <Link to = '/dashboard/category/add' className = 'btn btn-primary'>Add Categories</Link>
       </div>
    {/* table */}
        <TableShow
          data={Categories}
          header={header}
          delete={handleDelete}
          loading={loading}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          total={total}
          search='title'
          searchLink={CATEGORY}
        />
      </div>
    </>
  );
}
