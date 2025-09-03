import { useEffect, useState } from "react";
import { USER, USERS } from "../../Api/api";
import { Axios } from "../../Api/Axios";
import { Link } from "react-router-dom";
import TableShow from "../../components/Dashboard/Table";

export function Users() {
  // get users data
  const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // reload user
  const [del, setDel] = useState(false);

  // get current user
  useEffect(() => {
    Axios.get(`${USER}`).then((res) => setCurrentUser(res.data));
  }, []);

  // get All user
  useEffect(() => {
    setLoading(true)
    Axios.get(`/${USERS}?limit=${limit}&page=${page}`)
      .then((data) => setUser(data.data.data))
      .catch((err) => console.log(err))
      .finally(()=> setLoading(false));
  }, [del]);
//   console.log(user)

  // delete function
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setUser((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  // table header
  const header = [
    { key: "name", name: "Name" },
    { key: "email", name: "Email" },
    { key: "role", name: "Role" },
    { name: "Created", key: "created_at" },
    { name: "Last Login", key: "updated_at" },
  ];

  return (
    <div className="bg-white w-100">
      <div className="d-flex align-items-center justify-content-between p-2">
        <h1 className="text-center py-3">User Page</h1>
        <Link className="btn btn-primary" to="/dashboard/user/add">
          Add User
        </Link>
      </div>

      <TableShow
        header={header}
        data={user}
        delete={handleDelete}
        currentUser={currentUser}
        limit = {limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        loading={loading}
        total={total}
        search='name'
        searchLink={USER}
      />
    </div>
  );
}
