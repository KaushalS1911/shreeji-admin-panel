import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';

function Inquiry() {
    const [inquiries, setInquiries] = useState([]);

    useEffect(() => {
        axios.get('https://shreeji-be.onrender.com/api/inquiry')
            .then(response => {
                    setInquiries(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching inquiries:', error);
            });
    }, []);

    return (
        <Container maxWidth="md" sx={{ marginTop: 4 }}>


            <Typography variant="h4" component="h1" gutterBottom>
                Inquiry List
            </Typography>
            <Grid container spacing={2}>
                {inquiries && inquiries?.map((inquiry) => (
                    <Grid item xs={12} key={inquiry._id}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {inquiry.name}
                                </Typography>
                                <Typography color="text.secondary">
                                    Email: {inquiry.email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Message: {inquiry.message}
                                </Typography>
                                <Typography variant="caption" display="block" color="text.secondary" gutterBottom>
                                    Inquiry At: {new Date(inquiry.createdAt).toLocaleString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Inquiry;
