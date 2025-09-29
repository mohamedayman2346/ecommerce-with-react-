import { useEffect, useState } from "react";
import { CATEGORIE, PRODUCTS, USER, USERS } from "../Api/Api";
import { Axios } from "../Api/Axios";
import LoadingPage from "../components/Loading/loading";

export default function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [product, setProsuct] = useState([]);
  const [categorie, setcategorie] = useState([]);
  const [loading, setLoading] = useState(false);

  // get all Users
  useEffect(() => {
    Axios.get(`/${USERS}`)
      .then((res) => setUsers(res.data.data))
      .catch((rej) => console.log(rej));
  }, []);

  // get all categories
  useEffect(() => {
    Axios.get(`/${CATEGORIE}`)
      .then((res) => setcategorie(res.data))
      .catch((rej) => console.log(rej));
  }, []);

  // get all product
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${PRODUCTS}`)
      .then((res) => {
        setProsuct(res.data);
        setLoading(false);
      })
      .catch((rej) => console.log(rej));
  }, []);

   //get user data
    useEffect(() => {
      setLoading(true);
      Axios.get(`/${USER}`)
        .then((res) => {
        setUser(res.data)
        })
        .catch((rej) => console.log(rej))
        .finally(setLoading(false));
    }, []);

  return (
    <>
      {loading && <LoadingPage />}
      <div className="dashboard w-100 shadow-lg me-3 mb-3 p-4">
          <div className="animate__animated animate__fadeInUp text-center my-5 py-5">
            <h1>Welcome to the Dashboard Page </h1>
            <p>Welcome {user.name}</p>
          </div>
        <div className="table d-flex text-center justify-content-center align-items-center flex-wrap gap-5 mt-5">
          <div className="dashboard-card ">
            <h1>Users</h1>
            <span>{users.length}</span>
          </div>
          <div className="dashboard-card">
            <h1>Product</h1>
            <span>{product.length}</span>
          </div>
          <div className="dashboard-card">
            <h1>categories</h1>
            <span>{categorie.length}</span>
          </div>
        </div>
      </div>
    </>
  );
}
