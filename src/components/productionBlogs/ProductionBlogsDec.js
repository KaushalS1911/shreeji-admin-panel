import { Box, Container, Typography } from '@mui/material'
import React from 'react'

import Line from '../../assets/images/blog/blogLine.png'
import BG from '../../assets/images/blog/blogPrdBg.png'
import { useNavigate } from 'react-router-dom'

const ProductionBlogsDec = () => {
    
    const navigate = useNavigate();

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    width: "100%",
                    backgroundImage: `url(${BG})`,
                    backgroundSize: "cover",
                    backgroundPosition: 'center',
                    backgroundRepeat: "no-repeat",
                    padding: "120px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "#fff",
                    '::before': {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "#294462E5",
                        zIndex: 1,
                    },
                }}
            >
                <Container sx={{ zIndex: 2 }}>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: { lg: '40px', md: '34px', sm: '24px', xs: '28px' },
                            mb: 1
                        }}
                    >
                        <Typography component={'img'} src={Line} width={'20px'} alt="line" style={{ marginRight: '10px' }} />Production Blogs
                    </Typography>
                    <Typography
                        sx={{ mb: 1, ml: { lg: -11, md: -4, sm: 6, xs: 2 }, fontSize: '14px', fontWeight: 500 }}
                    >
                        <Typography variant="span" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }} >Home</Typography> / <Typography variant='span' onClick={() => navigate('/blog')} sx={{ cursor: 'pointer' }}>Blog</Typography> / <Typography variant='span' style={{ color: '#19AED7', fontWeight: 500 }}>Production Blogs</Typography>
                    </Typography>
                </Container>
            </Box>

        </>
    )
}

export default ProductionBlogsDec
