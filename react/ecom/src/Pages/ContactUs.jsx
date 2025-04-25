import React, { useState } from 'react';
import {
  Button,
  Alert,
  Grid,
  CircularProgress,
  Typography,
  Paper,
  TextField,
  Box,
} from '@mui/material';
import axios from 'axios';

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (form.name && form.email && form.message) {
      setLoading(true);
      try {
        await axios.post('http://localhost:3000/contacts', form);
        setSuccess(true);
        setError(false);
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } catch (err) {
        setSuccess(false);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const isFormValid = form.name && form.email && form.message;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection:"column",
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        backgroundColor: '#f5f5f5',
        px: 2,
        py: 5,
      }}
    >
      <Paper elevation={1} sx={{ p: 3, maxWidth: 500, width: '100%', borderRadius: 2 ,flexDirection:"column", }}>
        <Typography variant="h5" gutterBottom>
          Contact Us
        </Typography>

        <Grid container spacing={2} sx={{ p: 3, maxWidth: 600, width: '100%', borderRadius: 2 ,flexDirection:"column", }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              disabled={!isFormValid || loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </Button>
          </Grid>

          {success && (
            <Grid item xs={12}>
              <Alert severity="success">Message sent successfully!</Alert>
            </Grid>
          )}
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">Error sending message. Please try again.</Alert>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default ContactUs;
