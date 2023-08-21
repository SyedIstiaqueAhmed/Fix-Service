import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProductCardItem = ({ item }) => {
  const {
    ProductId,
    ProductPrice,
    ProductName,
    ProductImage,
    ProductDescription,
    ProductQuantity,
  } = item || {};
  const [productQty, setProductQty] = useState();
  // const history = useHistory();
  useEffect(() => {
    if (ProductQuantity) {
      setProductQty(ProductQuantity);
    }
  }, [ProductQuantity]);

  return (
   
    <div className="max-w-xs rounded-md bg-gray-900 shadow-xl shadow-gray-300 text-gray-100">
      <img
        src={ProductImage}
        alt=""
        className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
      />
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          {/* <p>Quantity : {productQty}</p> */}

          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold tracki">{ProductName}</h2>
            <div>
              <p className="">${ProductPrice}</p>
            </div>
          </div>
          <p className="dark:text-gray-100">{ProductDescription}</p>
        </div>
        <Link
          to={`/checkout/${ProductId}`}
          className="flex items-center justify-center w-full p-3 font-semibold tracki rounded-md bg-gray-400 "
        >
          Buy Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCardItem;
