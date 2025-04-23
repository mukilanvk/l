import { Button } from "@mui/material";

const ProductList = ({ data }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {data.map((product) => (
        <div
          key={product.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            width: '250px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <h3>{product.name}</h3>
          <h4>SKU: {product.sku}</h4>
          <p>{product.description}</p>
          <p><strong>${product.price}</strong></p>
          <Button>
          Add to cart
        </Button>

        </div>
      ))}
    </div>
  );
};

export default ProductList;
