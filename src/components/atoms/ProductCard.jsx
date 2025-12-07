import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ProductCard({ product }) {
  return (
    <div className="product-item">
      <div className="product-image">
        <Link to={`/product/${product.slug}`}>
          <img src={product.thumb} alt={product.prodName} />
        </Link>
      </div>
      <div className="product-info">
        <h4 className="product-name">
          <Link to={`/product/${product.slug}`}>
            {product.prodName}
          </Link>
        </h4>
        <p className="product-sku">
          SKU: <span>{product.sku}</span>
        </p>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    prodName: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
