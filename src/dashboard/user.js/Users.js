import { useEffect, useState } from "react";
import TableShow from "../../components/table/Table";
import { USER, USERS } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import LoadingPage from "../../components/Loading/loading";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  // pagination
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // table header
  const header = [
    { name: "Name", key: "name" },
    { name: "Email", key: "email" },
    { name: "Role", key: "role" },
  ];

  // get all Users
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${USERS}?limit=${limit}&page=${page}`)
      .then((res) => {
        setUsers(res.data.data);
        setTotal(res.data.total)
        setLoading(false);
      })
      .catch((rej) => console.log(rej));
  }, [page,limit]);

  // get current user
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((rej) => console.log(rej));
  }, []);
  
  // delete user
  async function handleDelete(id) {
    try {
      await Axios.delete(`${USER}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
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
          <h1 className="text-center mb-3">All Users</h1>
          <Link to="/dashboard/user/add" className="btn btn-primary">
            Add User
          </Link>
        </div>
        {/* table */}
        <TableShow
          data={users}
          currentUser={user}
          header={header}
          delete={handleDelete}
          loading={loading}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          total={total}
          search='name'
          searchLink={USER}
        />
      </div>
    </>
  );
}
