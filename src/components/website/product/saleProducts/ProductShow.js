import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StringSlice from "../../../../helpers/StringSlice";
import { NavLink } from "react-router-dom";

export default function ProductShow(props) {
  const starsRound = Math.round(props.rating);
  const star = Math.min(starsRound, 5);

  const showGoldStart = Array.from({ length: star }).map((_, index) => (
    <FontAwesomeIcon icon={solid} style={{ color: "gold" }} key={index} />
  ));

  const showEmptyStart = Array.from({ length: 5 - star }).map((_, index) => (
    <FontAwesomeIcon icon={regularStar} key={index} />
  ));

  return (
    <NavLink
      to={`/product/${props.id}`}
      className={`col-lg-${props.col} col-md-6 col-12`}
    >
      <div className="m-1  border rounded p-3 h-100">
        <div className="border-buttom pb-3">
          <p style={{ color: "gray" }} className="text-truncate">
            {StringSlice(props.title, 35)}
          </p>
          <p>{StringSlice(props.description, 40)}</p>
          <div className="px-5 py-4 position-relative">
            <p
              className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center"
              style={{ width: "50px", height: "50px", lineHeight: "50px" }}
            >
              Sale
            </p>
            <img className="img-fluid" src={props.image} alt="img" />
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between mt-2">
          <div>
            {showGoldStart}
            {showEmptyStart}
            <div className="d-flex align-items-center gap-3">
              <h5 className="m-0 text-primary">{props.discount}$</h5>
              <del className="m-0" style={{ color: "gray" }}>
                {props.price}$
              </del>
            </div>
          </div>
          <div className="border p-2 rounded">
            <img
              src={require("../../../../images/cart-icon.png")}
              width="50px"
              alt="cart"
            />
          </div>
        </div>
      </div>
    </NavLink>
  );
}
