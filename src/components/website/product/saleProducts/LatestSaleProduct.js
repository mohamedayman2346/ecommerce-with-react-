import { LATESTSALE } from "../../../../Api/api";
import { Axios } from "../../../../Api/Axios";
import { useEffect, useState } from "react";
import ProductShow from "../saleProducts/ProductShow";
import { Container } from "react-bootstrap";
import SkeletonShow from "../../Skeleton/Skeleton";

export default function LastSaleProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${LATESTSALE}`)
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
      col= '4'
      id={product.id}
    />
  ));

  return (
    <Container>
      <h1>Latest Sale Product</h1>
      <div className="d-flex align-items-stretch flex-wrap mb-5 ">
        {loading ? (
         <SkeletonShow length = '4' height = '300px' classes = 'col-lg-3 col-md-6 col-12 ' />
        ) : (
          showProduct
        )}
      </div>
    </Container>
  );
}
