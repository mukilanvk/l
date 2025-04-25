import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, clearCart } from '../redux/store';
import {
  Grid,
  Typography,
  IconButton,
  Button,
  Paper,
  Divider,
  Box,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const filteredCart = cart.filter((item) => item.quantity > 0);

  const handleChange = (id, quantity) => {
    const validQty = Math.max(0, parseInt(quantity));
    dispatch(updateQuantity({ id, quantity: validQty }));
  };

  const total = filteredCart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const handleSubmit = () => {
    alert('Order Confirmed!');
    dispatch(clearCart());
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding={3}
    >
      {filteredCart.length > 0 ? (
        filteredCart.map((item) => (
          <Box key={item.id} sx={{ width: '100%', maxWidth: 900, mb: 2 }}>
            <Paper elevation={3} sx={{ padding: 2 , borderRadius:'20px' }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
              >
                <Box sx={{ flex: '1 1 auto' }}>
                  <Typography variant="h6" fontWeight="bold">
                    {item.product_name}
                  </Typography>
                  <Typography variant="body2">Price: ₹{item.price}</Typography>
                  <Typography variant="body2">
                    Subtotal: ₹{(item.quantity * item.price).toFixed(2)}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" sx={{ mt: { xs: 2, sm: 0 } }}>
                  <IconButton
                    aria-label="Decrease quantity"
                    onClick={() => handleChange(item.id, item.quantity - 1)}
                    color="primary"
                    disabled={item.quantity <= 0}
                  >
                    <Remove />
                  </IconButton>
                  <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                  <IconButton
                    aria-label="Increase quantity"
                    onClick={() => handleChange(item.id, item.quantity + 1)}
                    color="primary"
                  >
                    <Add />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          </Box>
        ))
      ) : (
        <Typography variant="h6" align="center">
          Your cart is empty.
        </Typography>
      )}

      {filteredCart.length > 0 && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ width: '100%', maxWidth: 500, mt: 4 }}
        >
          <Divider sx={{ width: '100%', mb: 2 }} />

          <Paper elevation={3} sx={{ padding: 2, width: '100%', mb: 4 }}>
            <Typography variant="h6" align="center">
              <b>Total: ₹ {total.toFixed(2)}</b>
            </Typography>
          </Paper>

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit} 
             sx={{
              backgroundColor: 'green',        
              color: '#fff',
              paddingY: 1.5,
              fontWeight: 'bold',
              fontSize: '1rem',
              borderRadius: '8px',
              textTransform: 'none',
              boxShadow: '0px 3px 6px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: 'blue',
                transform: 'scale(1.02)',
                boxShadow: '0px 5px 12px rgba(0,0,0,0.25)',
              },
            }}
          >
            Confirm Order
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
