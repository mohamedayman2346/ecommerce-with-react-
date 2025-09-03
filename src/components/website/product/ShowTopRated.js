import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import {  TOPRATED } from "../../../Api/api";
import TopRated from "./TopRated";
import SkeletonShow from "../Skeleton/Skeleton";


export default function ShowTopRated() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${TOPRATED}`)
      .then((res) => setProduct(res.data))
      .finally(() => setLoading(false));
  }, []);


  const productShow = product.map((item) => (
    <TopRated
      title={item.title}
      description={item.description}
      image={item.images[0].image}
      price={item.price}
      discount={item.discount}
      rating={item.rating}
      id={item.id}
    />
  ));

  return (
    <div className="col-md-6 col-12" style={{ border: "2px solid #0DFEFD" }}>
      <h1 className="text-center m-0 p-3 bg-primary text-white">top Rated</h1>
      <div className="p-5">{loading ? (
                  <SkeletonShow
                    length="1"
                    height="800px"
                    classes=" col-12 "
                  />
                ) : (
                  productShow
                )}</div>
    </div>
  );
}
