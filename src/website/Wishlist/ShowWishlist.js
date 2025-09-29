import { useContext } from "react";
import { Best } from "../../Context/BestChange";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ShowWishList(props) {
  const starRound = Math.round(props.rating);
  const star = Math.min(starRound, 5);

  const GoldStar = Array.from({ length: star }).map((_, key) => (
    <FontAwesomeIcon icon={solid} style={{ color: "gold" }} key={key} />
  ));

  const blackStar = Array.from({ length: 5 - star }).map((_, key) => (
    <FontAwesomeIcon icon={regularStar} key={key} />
  ));

  const { setBestChanger } = useContext(Best);

  // delete product
  function handleDelete(id) {
    const getProduct = JSON.parse(localStorage.getItem("bestProduct")) || [];
    const filterProduct = getProduct.filter((item) => item.id !== id);
    localStorage.setItem("bestProduct", JSON.stringify(filterProduct));
    setBestChanger((prev) => !prev);
  }

  return (

    <div className={`m-1 border p-3 h-100 col-md-${props.col} col-12`} style={{width: '300px'}}>
      <div className="position-relative">
        <div
          className=" position-relative image-container d-flex align-items-center justify-content-center"
          style={{ minHeight: "300px" }}
        >
          <div className="img-container">
            <img src={props.image} alt="product img" className="img-fluid" width={'200px'} />
          </div>
          <Link
            to={`/product/${props.id}`}
            className="nav-link bg-black text-white text-center position-absolute bottom-0 w-100 py-3 fs-5 add-cart"
          >
            Add to Cart
          </Link>
        </div>
        <div className="icon position-absolute top-0 end-0 m-3">
          <span
            style={{ cursor: "pointer" }}
            className=" nav-link  "
            onClick={() => handleDelete(props.id)}
          >
            <FontAwesomeIcon
              className="d-block bg-danger rounded-circle p-1"
              icon={faX}
            />
          </span>
          <Link to="/showlater" className="nav-link">
            <FontAwesomeIcon
              icon={faEye}
              className="d-block bg-white rounded-circle p-1"
            />
          </Link>
        </div>
        <div className="position-absolute top-0 start-0 my-1 mx-2">
          {props.price - props.discount > 0 && (
            <p className="bg-danger text-secondary px-2 py-1">
              -
              {Math.trunc(((props.price - props.discount) / props.price) * 100)}
              %
            </p>
          )}
        </div>
        {/* content */}
        <div>
          <h4>{props.title}</h4>
          {/* price */}
          <div className="d-flex  justify-content-start gap-3">
            <p className="text-danger"> {props.discount} </p>
            {props.price > 0 && (
              <del className="text-secondary"> {props.price} </del>
            )}
          </div>
          {/* start && stock */}
          <div className="d-flex align-items-center justify-content-start gap-3">
            <div className="d-flex">
              {GoldStar}
              {blackStar}
            </div>
            <p className="m-0">({props.stock})</p>
          </div>
        </div>
      </div>
    </div>
  );
}
