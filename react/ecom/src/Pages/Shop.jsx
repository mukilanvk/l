import { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { Pagination, Stack } from '@mui/material';


const ProductList = lazy(() => import("./ProductList"));

const Shop = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const itemsWithId = data.map((item, index) => ({
    ...item,
    id: item.id ?? index + 1,
  }));
  
  const PaginationItem = itemsWithId.slice(
    (page - 1)*itemsPerPage,
    page*itemsPerPage
  )
  

  if (loading) return <p>Loading products...</p>;
  

  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
            backgroundColor: '#f7f7f7',
          }}
        >
          <div
            style={{
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3498db',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              animation: 'spin 1s linear infinite',
              marginBottom: '20px',
            }}
          ></div>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>Loading products list...</p>
        </div>
      }
    >
      <div>
        <ProductList data={PaginationItem} />
        {!loading && itemsWithId.length > 0 && (
  <Stack spacing={2} style={{ marginTop: '20px', padding:'30px' ,justifyContent:'center', alignItems:'center'}}>
    <Pagination
      count={Math.ceil(itemsWithId.length / itemsPerPage)}
      page={page}
      onChange={(e, value) => setPage(value)}
      color="secondary"
      shape="rounded"
      size="large"
      
      disabled={itemsWithId.length === 0}
    />

  </Stack>
)}
      </div>
    </Suspense>
  );
};

export default Shop;
