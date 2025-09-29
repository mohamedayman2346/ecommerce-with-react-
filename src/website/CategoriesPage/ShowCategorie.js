import { NavLink } from "react-router-dom";

export default function ShowCategories(props) {
  return (
    <NavLink
      to={`/categoriesPage`}
      className={`col-lg-${props.col} col-md-6 col-12 nav-link`}
    >
      {/* image */}
      <div className="m-1 border p-3 h-100">
        <div
          className=" position-relative image-container d-flex align-items-center justify-content-center"
          style={{ height: "150px" }}
        >
          <img src={props.image} alt="product img" className="img-fluid" />
        </div>

        {/* content */}
        <div>
          <h4>{props.title.slice(0, 15)}{props.title.length > 10 && '...'}</h4>
        </div>
        {/* start && stock */}
      </div>
    </NavLink>
  );
}
