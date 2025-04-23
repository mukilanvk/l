import { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';

const ProductList = lazy(() => import("./ProductList"));

const Shop = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setData(response.data); 
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      
      <Suspense fallback={<p>Loading products list...</p>}>
        <ProductList data={data} />
      </Suspense>
      
    </div>
  );
};

export default Shop;
