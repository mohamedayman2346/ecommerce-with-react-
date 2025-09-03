import { LATEST } from "../../../../Api/api";
import { Axios } from "../../../../Api/Axios";
import { useEffect, useState } from "react";
import ProductShow from "../saleProducts/ProductShow";
import SkeletonShow from "../../Skeleton/Skeleton";

export default function ShowLatestProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${LATEST}`)
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const showProduct = products.map((product) => (
    <ProductShow
      title={product.title}
      description={product.description}
      image={product.images[0].image}
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      col="12"
      id={product.id}
    />
  ));

  return (
    <div className="col-md-6 col-12">
      <div className="ms-md-4" style={{ border: "2px solid #0DFEFD" }}>
        <h1 className="text-center m-0 p-3 bg-primary text-white">
          Latest Product
        </h1>
        <div className="d-flex align-items-stretch  flex-wrap mb-5 ">
          {loading ? (
            <SkeletonShow
              length="4"
              height="300px"
              classes="col-md-6 col-12 "
            />
          ) : (
            showProduct
          )}
        </div>
      </div>
    </div>
  );
}
