import { Link } from "react-router-dom";
import "./home.css";
import LastProduct from "../../ShowProduct/LastProduct/LastProduct";
import CategoriesSection from "../CategoriesPage/CategoriesSection";
import LastSaleProduct from "../../ShowProduct/LastSaleProduct/LastSaleProduct";
import DateShow from "../../components/DateShow/DateShow";
import { Container } from "react-bootstrap";
import TopRated from "../../ShowProduct/TopRated/TopRated";
import {
  faArrowUp,
  faHeadset,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardComponent from "../../components/Card/CardComponent";

export default function Home() {

  function handleUp() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="py-5 overflow-hidden">
        {/* main section */}
        <main className=" row px-3 justify-content-around mt-5 align-items-start mb-5 ">
          <div className=" col-12 col-md-4 col-lg-3 mb-5 mb-md-0  px-5 animate__animated animate__fadeInUp">
            <div className="link-container">
              <Link to="#" className="nav-link">
                Woman’s Fashion
              </Link>
              <Link to="#" className="nav-link">
                Men’s Fashion
              </Link>
              <Link to="#" className="nav-link">
                Electronics
              </Link>
              <Link to="#" className="nav-link">
                Home & Lifestyle
              </Link>
              <Link to="#" className="nav-link">
                Medicine
              </Link>
              <Link to="#" className="nav-link">
                Sports & Outdoor
              </Link>
              <Link to="#" className="nav-link">
                Baby’s & Toys
              </Link>
              <Link to="#" className="nav-link">
                Groceries & Pets
              </Link>
              <Link to="#" className="nav-link">
                Health & Beauty
              </Link>
            </div>
          </div>
          <div className="col-12 col-md-8 animate__animated animate__fadeInUp animate-dalay-3">
            <img
              src={require("../../Access/images/home-img.png")}
              alt="iphone"
              className="img-fluid"
            />
          </div>
        </main>
        {/* product Show */}
        <LastProduct />
        <hr className="col-11 ms-auto me-auto" />
        {/* categorie section */}
        <CategoriesSection />
        {/* Last Sale Product */}
        <LastSaleProduct />
        {/* Speaker Image */}
        <Container
          className="row justify-content-between align-items-center bg-black ms-auto me-auto rounded p-2"
          style={{ minHeight: "80vh" }}
        >
          <div className="col-md-6 col-12 text-center text-md-start">
            <span className="text-success">categories</span>
            <h1 className="my-5 text-white">Enhance Your Music Experience</h1>
            {<DateShow position="lower" />}
            <Link to="/" className="btn btn-outline-success my-5 py-2 px-5">
              Buy Now!
            </Link>
          </div>
          <div className="col-12 col-md-6">
            <img
              src={require("../../Access/product-image/Frame 694.png")}
              className="img-fluid speaker-section"
              alt="speaker"
            />
          </div>
        </Container>
        {/* Top Rated */}
        <TopRated />
        {/* Feature */}
        <Container className="">
          {/* title */}
          <h5 className="section-title text-danger">Feature</h5>
          <h1>New Arrival</h1>
          {/* container */}
          <div className="row my-5">
            {/* first image (ps5) */}
            <div className="col-md-6 col-12 mb-2">
              <div className="custom-image position-relative bg-black rounded">
                <img
                  src={require("../../Access/product-image/ps5-slim-goedkope-playstation_large 1.png")}
                  alt="ps5"
                  className="img-fluid"
                />
                <div className="img-content position-absolute bottom-0 start-0 p-3">
                  <h3 className="text-white">playstation 5</h3>
                  <p className="text-white-50">
                    Black and White version of the PS5 coming out on sale.
                  </p>
                  <Link to="/All-Products" className="text-white-50">
                    Show Now
                  </Link>
                </div>
              </div>
            </div>
            {/* second images container */}
            <div className="col-md-6 col-12 ">
              <div className=" position-relative bg-black rounded">
                <img
                  src={require("../../Access/product-image/attractive-woman-wearing-hat-posing-black-background 1.png")}
                  alt="ps5"
                  className="img-fluid"
                />
                <div className="img-content position-absolute bottom-0 start-0 p-3">
                  <h3 className="text-white">Women’s Collections</h3>
                  <p className="text-white-50">
                    Featured woman collections that give you another vibe.
                  </p>
                  <Link to="/All-Products" className="text-white-50">
                    Show Now
                  </Link>
                </div>
              </div>
              {/* two image containet */}
              <div className="row">
                <div className="col-md-6 col-12">
                  <div className="custom-image position-relative bg-black rounded m-1">
                    <img
                      src={require("../../Access/product-image/69-694768_amazon-echo-png-clipart-transparent-amazon-echo-png 1.png")}
                      alt="ps5"
                      className="img-fluid"
                    />
                    <div className="img-content position-absolute bottom-0 start-0 p-3">
                      <h3 className="text-white">Speakers</h3>
                      <p className="text-white-50">Amazon wireless speakers</p>
                      <Link to="/All-Products" className="text-white-50">
                        Show Now
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="custom-image position-relative bg-black rounded mt-2">
                    <img
                      src={require("../../Access/product-image/652e82cd70aa6522dd785109a455904c.png")}
                      alt="ps5"
                      className="img-fluid"
                    />
                    <div className="img-content position-absolute bottom-0 start-0 p-3">
                      <h3 className="text-white">Perfume</h3>
                      <p className="text-white-50">GUCCI INTENSE OUD EDP</p>
                      <Link to="/All-Products" className="text-white-50">
                        Show Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* services */}
            {/* services */}
            <div className="row my-5 gap-5 justify-content-center">
              <CardComponent
                icon={
                  <FontAwesomeIcon
                    className="m-auto display-6 p-2 my-2 rounded-circle"
                    icon={faShield}
                  />
                }
                title={"MONEY BACK GUARANTEE"}
                text={"We reurn money within 30 days"}
                cardClass="p-3 text-center border-0 hover"
                titleClass="fw-bold"
              />
              <CardComponent
                icon={
                  <FontAwesomeIcon
                    className="m-auto display-6 p-2 my-2 rounded-circle"
                    icon={faHeadset}
                  />
                }
                title={"24/7 CUSTOMER SERVICE"}
                text={"Friendly 24/7 customer support"}
                cardClass="p-3 text-center border-0 hover"
                titleClass="fw-bold"
              />
              <CardComponent
                icon={
                  <FontAwesomeIcon
                    className="m-auto display-6 p-2 my-2 rounded-circle"
                    icon={faTruck}
                  />
                }
                title={"FREE AND FAST DELIVERY"}
                text={"Free delivery for all orders over $140"}
                cardClass="p-3 text-center border-0 hover"
                titleClass="fw-bold"
              />
            </div>
          </div>
          {/* <ArrowUp /> */}
            <div
              className="position-fixed rounded-circle p-2 arrow"
              onClick={handleUp}
              style={{ top: "85vh", right: "30px", background: "whitesmoke" }}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </div>

        </Container>
      </div>
    </>
  );
}
