import { Backdrop, Box, Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import line from "../../assets/images/gallery/line.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GalleryPrd = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const getAllGallery = useCallback(() => {
        setLoading(true);
        axios.get("https://shreeji-be.onrender.com/api/gallery")
            .then((res) => {
                setData(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setError("Failed to load products.");
                console.log(err);
            });
    }, []);

    useEffect(() => {
        getAllGallery();
    }, [getAllGallery]);

    const handleDelete = (id) => {
        setLoading(true);
        axios.delete(`https://shreeji-be.onrender.com/api/gallery/${id}`)
            .then(() => {
                getAllGallery();
            })
            .catch((err) => {
                console.log(err);
                setError("Failed to delete product."); // Update error state
            })
            .finally(() => setLoading(false)); // Ensure loading is false after the request completes
    };

    return (

        <>
            {loading && (
                <Backdrop
                    open={true}
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        backdropFilter: "blur(10px)", // Apply blur effect to the background
                    }}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            {error && <Typography color="error">{error}</Typography>}
            <Box sx={{ mt: { md: 15, sm: 10, xs: 5 } }}>
                <Container>
                    <Box sx={{ position: 'relative' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: { md: 10, xs: 5 } }}>
                            <Typography sx={{ fontWeight: 600, fontSize: { lg: '40px', md: '34px', sm: '24px', xs: '28px' }, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                <Typography component={'img'} src={line} sx={{ mr: 1 }}></Typography>
                                Gallery
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 3, display: "flex", justifyContent: 'end' }}>
                            <Button
                                onClick={() => navigate('/add-gallery')}
                                sx={{
                                    borderRadius: '0',
                                    color: '#fff',
                                    boxShadow: 1,
                                    width: '150px',
                                    textAlign: 'center',
                                    backgroundColor: '#294462',
                                    textTransform: 'unset',
                                    py: 1,
                                    fontWeight: 600,
                                }}
                            >
                                + Add Product
                            </Button>
                        </Box>
                        <Grid container spacing={5}>
                            {data.map((gallery, index) => (
                                <Grid item md={4} sm={6} xs={12} key={index}>
                                    <Box sx={{ position: 'relative' }}>
                                        <Typography component={'img'} src={gallery.image} sx={{ width: '100%', objectFit: 'cover', height: { sm: '300px', xs: '300px' } }}></Typography>

                                        <Box sx={{ position: 'absolute', top: { sm: '5%', xs: '4%' }, right: '-3%' }}>
                                            <Button
                                                onClick={() => navigate(`/add-gallery/${gallery._id}`)}
                                                sx={{
                                                    borderRadius: '0',
                                                    color: '#fff',
                                                    boxShadow: 1,
                                                    width: '150px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    backgroundColor: '#294462',
                                                    textTransform: 'unset',
                                                    py: 1,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(gallery._id)}
                                                sx={{
                                                    borderRadius: '0',
                                                    color: '#fff',
                                                    boxShadow: 1,
                                                    width: '150px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    backgroundColor: '#19AED7',
                                                    textTransform: 'unset',
                                                    py: 1,
                                                    mt: 1,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default GalleryPrd
