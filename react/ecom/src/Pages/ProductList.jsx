import { Button, Card, CardContent } from "@mui/material";
import { addToCart } from '../redux/store';
import { useDispatch } from 'react-redux';

const ProductList = ({ data }) => {
  const dispatch = useDispatch();

  const handleAdd = (product) =>{
    dispatch(addToCart(product));
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center',marginTop:'40px'}}>
      {data.map((product) => (
        <Card key={product.id} style={{ width: '250px',padding:'5px 25px', borderRadius:'25px' }}>
          <CardContent>
            <h3 style={{ margin: '8px 0' }}>{product.product_name}</h3>
            <h5 style={{ margin: '4px 0', color: '#555' }}>{product.brand} |{product.sku}</h5>
            <p style={{ margin: '8px 0' }}>{product.description}</p>
            <p style={{ fontWeight: 'bold',color:'green' }}>₹  {product.price}</p>
            <Button variant="contained" color="primary"
            style={{ fontWeight: 'bold',fontSize:'12px',borderRadius:'20px' }}
            onClick={() => handleAdd(product)}>
              Add to cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
