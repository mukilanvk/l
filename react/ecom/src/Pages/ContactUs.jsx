import React, { useState } from 'react';
import {
  TextField,
  Button,
  Alert,
  Grid,
  CircularProgress,
  Typography,
  Paper,
} from '@mui/material';
import axios from 'axios';


const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (form.name && form.email && form.message) {
      setLoading(true);
      try {
        await axios.post('http://localhost:3001/contacts', form);
        setSuccess(true);
        setError(false);
        setForm({ name: '', email: '', message: '' ,subject:'',phone:''});
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
    <div className="contact-container">
      <Paper elevation={4} className="contact-form">
        <Typography variant="h5" gutterBottom>
          Contact Us
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
          <TextField
    label="Name"
    fullWidth
    variant="outlined"
    margin="normal" 
    value={form.name}
    onChange={(e) => setForm({ ...form, name: e.target.value })}
  />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="phone"
              fullWidth
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="subject"
              fullWidth
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              multiline
              rows={3}
              fullWidth
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
    </div>
  );
};

export default ContactUs;
