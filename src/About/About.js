import { Container } from "react-bootstrap";
import "../components/CSS/Form.css";
import { NavLink } from "react-router-dom";
import CardComponent from "../components/Card/CardComponent";
import {
  faBagShopping,
  faDollarSign,
  faHeadset,
  faSackDollar,
  faShield,
  faShop,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../components/Card/Card.css";
import { PersonData } from "./PersonData";
import { motion } from "framer-motion";
import "../components/CSS/slider.css";
import { useEffect, useRef, useState } from "react";

export default function About() {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef(null);
  useEffect(() => {
    setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
  },[])
  console.log(width)

  // personData card
  const personDataShow = PersonData.map((item, key) => (
    <motion.div className="item" key={key}>
      <CardComponent
        img={item.src}
        title={item.name}
        text={item.text}
        cardClass="p-3 border-0"
        titleClass="fw-bold"
        social
      />
    </motion.div>
  ));

  return (
    <Container className="py-5 " style={{ minHeight: "100vh" }}>
      <div className="d-flex my-5">
        <NavLink className="nav-link text-black-50 me-2" to="/">
          Home /{" "}
        </NavLink>
        <NavLink className="nav-link fw-bold" to="/About">
          {" "}
          About{" "}
        </NavLink>
      </div>
      <main>
        {/* header */}
        <div className="row gap-5">
          <div className="col-12 col-md-5 text-md-start text-center animate__animated animate__fadeInUp ">
            <h1>Our Story</h1>
            <p className="my-5">
              Launced in 2015, Exclusive is South Asia’s premier online shopping
              makterplace with an active presense in Bangladesh. Supported by
              wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sallers and 300 brands and serves 3 millioons
              customers across the region.{" "}
            </p>
            <p className="mb-2">
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.
            </p>
          </div>
          <div className="col-12 col-md-5 animate__animated animate__fadeInUp animate-dalay-5s">
            <img
              src={require("../Access/images/About.png")}
              className="img-fluid"
              alt="about img"
            />
          </div>
        </div>
        {/* header card */}
        <div className="row my-5 gap-5 justify-content-center " data-aos="fade-right" data-aos-duration="20000" data-aos-once="true">
          <CardComponent
            icon={
              <FontAwesomeIcon
                className="m-auto display-6 p-2 my-2 rounded-circle "
                icon={faShop}
              />
            }
            title={"10.5k"}
            text={"Sallers active our site"}
            cardClass="p-3 text-center hover "
            titleClass="fw-bold"
            
          />
          <CardComponent
            icon={
              <FontAwesomeIcon
                className="m-auto display-6 p-2 my-2 rounded-circle"
                icon={faDollarSign}
              />
            }
            title={"33k"}
            text={"Mopnthly Produduct Sale"}
            cardClass="p-3 text-center hover"
            titleClass="fw-bold"
          />
          <CardComponent
            icon={
              <FontAwesomeIcon
                className="m-auto display-6 p-2 my-2 rounded-circle hover"
                icon={faBagShopping}
              />
            }
            title={"45.5k"}
            text={"Customer active in our site"}
            cardClass="p-3 text-center hover"
            titleClass="fw-bold"
          />
          <CardComponent
            icon={
              <FontAwesomeIcon
                className="m-auto display-6 p-2 my-2 rounded-circle hover"
                icon={faSackDollar}
              />
            }
            title={"25k"}
            text={"Anual gross sale in our site"}
            cardClass="p-3 text-center hover"
            titleClass="fw-bold"
          />
        </div>
        {/* person card */}
        <div className="d-flex flex-wrap">
          <motion.div className="carousel" ref = {carouselRef} whileTap={{cursor: 'grabbing'}}>
            <motion.div
              className="inner-carousel"
              drag="x"
              dragConstraints={{ right: 0 ,left: -width}}
            >
              {personDataShow}
            </motion.div>
          </motion.div>
        </div>
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
      </main>
    </Container>
  );
}
