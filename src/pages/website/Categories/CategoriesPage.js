import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { CATEGORIE } from "../../../Api/api";
import { Container } from "react-bootstrap";
import StringSlice from "../../../helpers/StringSlice";
import SkeletonShow from "../../../components/website/Skeleton/Skeleton";

export default function CategoriesPage() {
  const [categorie, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${CATEGORIE}`)
      .then((res) => setCategories(res.data))
      .finally((_) => setLoading(false));
  }, []);

  const CategorieShow = categorie.map((item, key) => (
    <div key={key} className="col-lg-2 col-md-6 col-12 bg-transparent border-0">
      <div className="m-1 bg-white border d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100">
        <img className="ms-3" width="50px" src={item.image} alt="just an img" />
        <p className="m-0 py-2 px-4 overflow-hidden">
          {StringSlice(item.title, 12)}
        </p>
      </div>
    </div>
  ));

  return (
    <>
      <div className="bg-secondary py-5">
        <Container>
          <div className="d-flex justify-content-center align-items-center flex-wrap gap-2 row">
            {loading ? (
              <SkeletonShow
                length="15"
                classes="col-lg-2 col-md-6 col-12 "
                baseColor="white"
                height="70px"
              />
            ) : (
              CategorieShow
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
