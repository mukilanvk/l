import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const About = () => {
  return (
    <Box sx={{ padding: 4, maxWidth: 900, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Welcome to TechWave
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ textAlign: 'center', marginBottom: 4 }}>
        Leading dealer in tech products all over Tamil Nadu.
      </Typography>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="about-content"
          id="about-header"
        >
          <Typography variant="h6">About Us</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            We are an e-commerce company built with the power of young talent! Our goal is to deliver
            quality products that meet your tech needs.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="products-content"
          id="products-header"
        >
          <Typography variant="h6">Our Products</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {['Laptops', 'Accessories', 'PC Hardware Devices'].map((item, index) => (
              <ListItem key={index} sx={{ pl: 2 }}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="location-content"
          id="location-header"
        >
          <Typography variant="h6">Location</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Our offices are located in Coimbatore, Chennai, and other cities.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="contact-content"
          id="contact-header"
        >
          <Typography variant="h6">Contact Us</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            For more details, visit our website:&nbsp;
            <a href="https://www.techwave.com" target="_blank" rel="noopener noreferrer">
              www.techwave.com
            </a>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default About;
