import { productCategories } from "../constants/product";

const ProductFilterTab = ({ active, onFilter }) => {
  return (
    <div role="tablist" className="tabs tabs-bordered w-max mx-auto">
      {["All", ...productCategories].map((category, index) => {
        return (
          <button
            key={index}
            role="tab"
            className={`tab ${active == category ? "tab-active" : ""}`}
            onClick={() => onFilter(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default ProductFilterTab;
