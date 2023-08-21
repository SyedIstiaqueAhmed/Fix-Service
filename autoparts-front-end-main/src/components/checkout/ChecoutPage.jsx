import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const CheckoutPage = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const { id } = params;
  const [qty, setQty] = useState(1);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/sells/products`)
      .then((response) => {
        if (response?.data.length > 0) {
          //   console.log(response?.data, id);
          const filterItem = response?.data?.find(
            (item) => item?.ProductId === +id
          );
          setProduct(filterItem);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleQty = (num) => {
    if (num > product.ProductQuantity) {
      alert("Out Of Stock");
    } else if (num < 1) {
      alert("Set Minimum Item");
    } else {
      setQty(num);
    }
  };
  //   console.log(product);
  const handlePurchase = () => {
    const payload = {
      ProductId: product.ProductId,
      ProductName: product?.ProductName,
      ProductPrice: +product.ProductPrice * qty,
      ProductQuantity: qty,
    };
    axios
      .post("http://localhost:3000/sells/sell ", payload)
      .then((response) => {
        console.log("Response:", response.data);
       alert("Purchase Successful");
       window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Purchase Unsuccessful");
        // Handle error here
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-8 rounded shadow-md flex">
        <div key={product.ProductId} className="flex p-4 border-b  w-full">
          <div className="w-2/3">
            <img
              src={product.ProductImage}
              alt={product.ProductName}
              className="max-w-full h-auto"
            />
          </div>
          <div className="w-2/3 ml-4">
            <h2 className="text-lg font-semibold mb-2">
              {product.ProductName}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              {product.ProductDescription}
            </p>
            <p className="text-lg font-semibold mb-2">
              ${product.ProductPrice}
            </p>
            <p>
              Stock Quantity : <span>{product.ProductQuantity}</span>
            </p>
            <div className="flex items-center">
              <label htmlFor={`quantity-${product.id}`} className="mr-2">
                Quantity:
              </label>
              <input
                type="number"
                onChange={(e) => handleQty(e.target.value)}
                id={`quantity-${product.id}`}
                className="border rounded py-1 px-2 w-20 focus:outline-none focus:ring focus:border-blue-300"
                min="1"
                defaultValue="1"
                value={qty}
              />
            </div>
            <p>Total Price : {+product.ProductPrice * qty}</p>
            <button
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => handlePurchase(product.id)}
            >
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
