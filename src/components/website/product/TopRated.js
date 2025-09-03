import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default function TopRated(props) {
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
      className="col-12 border-bottom d-flex align-items-start flex-wrap mb-2"
    >
      <div
        className="col-md-4 col-12"
        style={{
          backgroundImage: `url(${props.image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "170px",
        }}
      ></div>

      <div className="m-1 col-md-7 col-12 rounded p-3 h-100 d-flex flex-column justify-content-between">
        <div>
          <p style={{ color: "gray" }} className="text-truncate">
            {props.title}
          </p>
          <p>{props.description}</p>
        </div>

        <div className="d-flex align-items-center justify-content-between pt-4">
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
              src={require("../../../images/cart-icon.png")}
              width="50px"
              alt="cart"
            />
          </div>
        </div>
      </div>
    </NavLink>
  );
}
