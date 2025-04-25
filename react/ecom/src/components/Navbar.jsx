import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const navLinkStyle = {
  color: 'white',
  fontSize: '1.1rem',
  textDecoration: 'none',
  transition: 'color 0.3s ease, transform 0.3s ease',
  '&:hover': {
    color: 'black',
    transform: 'scale(1.2)',
  },
};

const Navbar = () => {
  const cart = useSelector(state =>state.cart);
  const totalItems = cart.reduce((acc,item)=> acc+item.quantity,0)
  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(135deg,rgb(19, 18, 19),rgb(167, 169, 170))',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            letterSpacing:'10px',
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          Tech Nova
        </Typography>

        <Box sx={{ display: 'flex', gap: 3 }}>
          <Typography component={Link} to="/" sx={navLinkStyle}>
            Home
          </Typography>
          <Typography component={Link} to="/about" sx={navLinkStyle}>
            About
          </Typography>
          <Typography component={Link} to="/contact" sx={navLinkStyle}>
            Contact
          </Typography>
          <IconButton
            component={Link}
            to="/cart"
            sx={{
              color: 'white',
              transition: 'color 0.3s ease',
              '&:hover': {
                color: 'black',
              },
            }}
          >
            <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
