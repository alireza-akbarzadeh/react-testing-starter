import { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { CategoriesSelect } from "../components/CategoriesSelect";
import { ProductsTable } from "../components/ProductsTable";

function BrowseProducts() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >();

  return (
    <>
      <h1>Products</h1>
      <div className="max-w-xs">
        <CategoriesSelect setSelectedCategoryId={setSelectedCategoryId} />
      </div>
      <ProductsTable selectedCategoryId={selectedCategoryId} />
    </>
  );
}

export default BrowseProducts;
