import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity ,clearCart } from '../redux/store';
import {
  Grid,
  Typography,
  IconButton,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';


const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const filteredCart = cart.filter(item => item.quantity > 0);

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
    <Grid container className="cart-items" spacing={3} padding={3}>
      {filteredCart.length > 0 ? (
        filteredCart.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Paper className="cart-item" elevation={3}>
              <div className="cart-content">
                <div className="item-info">
                  <Typography variant="h6" className="item-name">
                    <b>{item.product_name}</b>
                  </Typography>
                  <Typography variant="body2" className="item-price">
                    Price: ₹{item.price}
                  </Typography>
                  <Typography variant="body2" className="item-subtotal">
                    Subtotal: ₹{(item.quantity * item.price).toFixed(2)}
                  </Typography>
                </div>

                {/* Quantity Controls */}
                <div className="quantity-controls">
                  <IconButton
                    onClick={() => handleChange(item.id, item.quantity - 1)}
                    color="primary"
                    disabled={item.quantity <= 1}
                  >
                    <Remove />
                  </IconButton>
                  <Typography className="quantity-text">{item.quantity}</Typography>
                  <IconButton
                    onClick={() => handleChange(item.id, item.quantity + 1)}
                    color="primary"
                  >
                    <Add />
                  </IconButton>
                </div>
              </div>
            </Paper>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            Your cart is empty.
          </Typography>
        </Grid>
      )}

      {filteredCart.length > 0 && (
        <>
          <Grid item xs={12}>
            <Divider />
            <Paper className="cart-total" elevation={3}>
              <Typography variant="h7"><b>Total: ₹{total.toFixed(2)}</b></Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} className="submit-button-container">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Confirm Order
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Cart;
