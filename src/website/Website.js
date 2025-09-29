import { Outlet } from "react-router-dom";
import Navbar from "../components/Nav/Navbar";
import Footer from "../components/Footer/Footer";

export default function Website() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
