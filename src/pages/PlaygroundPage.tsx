import ProductForm from "../components/ProductForm";

const PlaygroundPage = () => {
  return <ProductForm onSubmit={(value) => console.log(value)} />;
};

export default PlaygroundPage;
