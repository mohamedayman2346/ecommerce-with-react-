import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/website/HomePage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { Users } from "./pages/Dashboard/Users";
import GoogleCallBack from "./pages/Auth/GoogleCallBack";
import Dashboard from "./pages/Dashboard/Dashboard";
import RequireAuth from "./pages/Auth/RequireAuth";
import User from "./pages/Dashboard/User";
import AddUser from "./pages/Dashboard/AddUser";
import Err404 from "./pages/Auth/404";
import Requireback from "./pages/Auth/Requireback";
import Categories from "./pages/Dashboard/Categories";
import AddCategorie from "./pages/Dashboard/AddCategorie";
import Category from "./pages/Dashboard/Category";
import Products from "./pages/Dashboard/Products";
import AddProduct from "./pages/Dashboard/AddProduct";
import UpdateProduct from "./pages/Dashboard/Product";
import CategoriesPage from "./pages/website/Categories/CategoriesPage";
import Website from "./pages/website/Website";
import SingleProduct from "./pages/website/SingleProduct/SingleProduct";
// import Test from './Test'; // to learn useref

export default function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route element={<Website />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categoriesShow" element={<CategoriesPage />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Route>

        <Route element={<Requireback />}>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          {/* <Route path = '/test' element = { <Test /> } /> */}
        </Route>

        <Route path="/auth/google/callback" element={<GoogleCallBack />} />
        <Route path="/*" element={<Err404 />} />

        {/* Producted */}
        <Route element={<RequireAuth allowedRole={["1995", "1991", "1999"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            {/* admin */}
            <Route element={<RequireAuth allowedRole={["1995"]} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<User />} />
              <Route path="user/add" element={<AddUser />} />
            </Route>
            {/* admin and categories */}
            <Route element={<RequireAuth allowedRole={["1999", "1995"]} />}>
              {/* categorie */}
              <Route path="Categories" element={<Categories />} />
              <Route path="Categories/:id" element={<Category />} />
              <Route path="Category/add" element={<AddCategorie />} />
              {/* Products */}
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<UpdateProduct />} />
              <Route path="product/add" element={<AddProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
