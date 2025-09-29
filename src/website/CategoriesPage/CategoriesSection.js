import { useEffect, useState } from "react";
import { CATEGORIE } from "../../Api/Api";
import LoadingPage from "../../components/Loading/loading";
import { Axios } from "../../Api/Axios";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import ShowCategories from "./ShowCategorie";

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${CATEGORIE}`)
      .then((res) => setCategories(res.data))
      .finally(() => setLoading(false));
  }, []);

  const showCategory = categories.map((category) => (
    <ShowCategories title={category.title} image={category.image} col={4} />
  ));

  return (
    <>
      {loading && <LoadingPage />}
      <Container className="mt-5 ">
        <h5 className="section-title text-danger">Categories</h5>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Browse By Category</h1>
          <div className="arrow d-flex gap-2">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="p-2  rounded-circle"
              style={{ background: " whitesmoke" }}
              //   onClick={handleLeft}
            />
            <FontAwesomeIcon
              icon={faArrowRight}
              className="p-2 rounded-circle"
              style={{ background: " whitesmoke" }}
              //   onClick={handleRight}
            />
          </div>
        </div>
        <div className="d-flex justify-content-start align-items-center last">
          {showCategory}
        </div>
      </Container>
    </>
  );
}
