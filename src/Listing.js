import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Backdrop, Box, Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import line from "./assets/images/global/line.png";
import { useNavigate } from 'react-router-dom';

const Listing = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const getAllBlog = () => {
        setLoading(true)
        axios.get("https://shreeji-be.onrender.com/api/blog")
            .then((res) => {
                setData(res.data.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    useEffect(() => {
        getAllBlog();
    }, [])
    console.log(data);

    const handleDelete = (id) => {
        setLoading(true)
        axios.delete(`https://shreeji-be.onrender.com/api/blog/${id}`)
            .then((res) => {
                getAllBlog()
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    return (
        <>
            {loading && (
                <Backdrop
                    open={true}
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            <Box sx={{ py: 5 }}>
                <Container>
                    <Box sx={{ position: 'relative' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: { md: 4, xs: 5 } }}>
                            <Typography sx={{ fontWeight: 600, fontSize: { lg: '40px', md: '34px', sm: '24px', xs: '28px' }, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                <Typography component={'img'} src={line} sx={{ mr: 1 }}></Typography>
                                Blog
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 3, display: "flex", justifyContent: 'end' }}>
                            <Button
                                onClick={() => navigate('/add-blog')}
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
                                + Add Blog
                            </Button>
                        </Box>
                        <Grid container spacing={5}>
                            {data.map((blogPrd, index) => (
                                <Grid item md={4} sm={6} xs={12} key={index}>
                                    <Box sx={{ position: 'relative' }}>
                                        <Typography component={'img'} src={blogPrd.thumbnail_image} sx={{ width: '100%', objectFit: 'cover', height: { sm: '300px', xs: '300px' } }}></Typography>
                                        <Typography sx={{
                                            position: 'absolute',
                                            bottom: '10%',
                                            width: '70%',
                                            backgroundColor: '#fff',
                                            boxShadow: 1,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: '#555555',
                                            fontWeight: 600,
                                            py: 3,
                                            px: 4,
                                            fontSize: { sm: '16px', xs: '14px' },
                                            left: { sm: '-6%', xs: '-3%' }
                                        }}>
                                            {blogPrd.heading}
                                        </Typography>
                                        <Box sx={{ position: 'absolute', top: { sm: '5%', xs: '4%' }, right: '-3%' }}>
                                            <Button
                                                onClick={() => navigate(`/add-blog/${blogPrd?._id}`)}
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
                                                onClick={() => handleDelete(blogPrd._id)}
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
    )
}

export default Listing
