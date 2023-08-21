import ProductCardItem from "./ProductCardItem";

// eslint-disable-next-line react/prop-types
const Product = ({ products }) => {
  return (
    <div className="my-10 ml-5">
      <h1 className="text-3xl font-bold mb-3">All Products</h1>
      <div className="h-1 w-10 bg-gray-600" />
      <div className="grid grid-cols-3 gap-4 mt-10">
        {products?.map((item) => (
          // eslint-disable-next-line react/jsx-key
          <ProductCardItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Product;
