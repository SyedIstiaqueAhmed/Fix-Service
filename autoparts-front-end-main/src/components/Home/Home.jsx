// import HeroSlider from "./HeroSlider";

import { useEffect, useState } from "react";
import { getData } from "../../utls/helper";
import HeroSlider from "./HeroSlider";
import Product from "./Product";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData(`http://localhost:3000/Product`, setProducts);
  }, []);
  // console.log(products);
  return (
    <>
      <HeroSlider />
      <Product products={products} />
    </>
  );
}
