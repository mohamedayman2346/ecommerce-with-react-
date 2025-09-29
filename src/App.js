import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./website/Auth/Login";
import Home from "./website/Home/Home";
import Register from "./website/Auth/register";
import GoogleCallBack from "./website/Auth/GoogleCallBack";
import Err404 from "./website/Auth/Error/Err404";
import Contact from "./website/Home/contact";
import Website from "./website/Website";
import About from "./About/About";
import Profile from "./website/Profile/Profile";
import DashboardContainer from "./dashboard/DashoardContainer";
import Users from "./dashboard/user.js/Users";
import DashboardPage from "./dashboard/Dashboard";
import RequireBack from "./website/Auth/RequireBack";
import AddUser from "./dashboard/user.js/AddUser";
import Categories from "./dashboard/categorie/Categories";
import EditUser from "./dashboard/user.js/EditUser";
import EditCategorie from "./dashboard/categorie/EditCategorie";
import AddCategorie from "./dashboard/categorie/AddCategorie";
import Products from "./dashboard/Product/Products";
import AddProduct from "./dashboard/Product/AddProduct";
import EditProduct from "./dashboard/Product/EditProduct";
import RequireAuth from "./website/Auth/RequireAuth";
import CategoriesPage from "./website/CategoriesPage/CategoriesPage";
import AllProoduct from "./ShowProduct/AllProduct";
import SingleProduct from "./ShowProduct/SingleProduct";
import CartPage from "./website/Cart/Cart";
import Checkout from "./website/Checkout/Checkout";
import Wishlist from "./website/Wishlist/Wishlist";


export default function App() {
  return (
    <div>
      <Routes>
        <Route element={<Website />}>
          {/* main page */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/Wishlist" element={<Wishlist />} />

          <Route path="/categoriesPage" element={<CategoriesPage />} />
          <Route path="/All-products" element={<AllProoduct />} />
          <Route path="/product/:id" element={<SingleProduct />} />

          <Route path="/checkout" element={<Checkout  />} />
          {/* Sing Page */}
          <Route element={<RequireBack />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          {/* Profile page */}
          <Route path="/profile" element={<Profile />} />
          {/* Error page */}
          <Route path="/*" element={<Err404 />} />
          {/* Google Auth */}
          <Route path="/auth/google/callback" element={GoogleCallBack} />

          {/* Dashboard contact */}
          <Route
            element={<RequireAuth allowedRole={["1995", "1991", "1999"]} />}
          >
            <Route path="/dashboard" element={<DashboardContainer />}>
              <Route path="dashboardPage" element={<DashboardPage />} />
              {/* user control */}
              <Route element={<RequireAuth allowedRole={["1995"]} />}>
                <Route path="users" element={<Users />} />
                <Route path="users/:id" element={<EditUser />} />
                <Route path="user/add" element={<AddUser />} />
              </Route>
              {/* categorie */}
              <Route element={<RequireAuth allowedRole={["1995", "1999"]} />}>
                <Route path="Categories" element={<Categories />} />
                <Route path="Categories/:id" element={<EditCategorie />} />
                <Route path="Category/add" element={<AddCategorie />} />
                {/* Prosucts */}
                <Route path="products" element={<Products />} />
                <Route path="products/:id" element={<EditProduct />} />
                <Route path="product/add" element={<AddProduct />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
