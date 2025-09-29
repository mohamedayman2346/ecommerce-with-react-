import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { CATEGORIE } from "../../Api/Api";
import { Container } from "react-bootstrap";
import SkeletonShow from "../../components/Skeleton/Skeleton";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${CATEGORIE}`)
      .then((res) => setCategories(res.data))
      .finally(() => setLoading(false));
  }, []);

  const categoriesShow = categories.map((item, key) => (
    <div
      className="border p-2"
      key={key}
      title={item.title}
      style={{ height: "200px" }}
    >
      <img src={item.image} width={"100px"} alt="category image" />
      <p>{item.title.slice(0, 8)}...</p>
    </div>
  ));

  return (
    <div className="bg-secondary py-5" style={{ minHeight: "100vh" }}>
      <Container>
        <div className="d-flex justify-content-around align-items-center flex-wrap gap-2">
          {loading ? (
            <SkeletonShow
              length={categories.length}
              classes="col-lg-2 col-md-6 col-12 bg-white "
              baseColor="#202020"
              height="1500px"
            />
          ) : (
            categoriesShow
          )}
        </div>
      </Container>
    </div>
  );
}
