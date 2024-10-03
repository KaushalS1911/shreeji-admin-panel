import { Box, Container, Grid, MenuItem, Select, Typography, Drawer, IconButton, Collapse } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Logo from '../assets/images/global/Logo.png';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import line from '../assets/images/global/navLines.png';
import BookIcon from '@mui/icons-material/Book';
import CollectionsIcon from '@mui/icons-material/Collections';


const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();


    const isActiveRoute = (routes) => {
        if (!Array.isArray(routes)) {
            routes = [routes];
        }
        const currentPath = window.location.pathname;
        return routes.some(route => route === '/' ? currentPath === route : currentPath.startsWith(route));
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleSubmenuToggle = (submenu) => {
        setOpenSubmenu(openSubmenu === submenu ? null : submenu);
    };

    const closeSubmenuAndNavigate = (path) => {
        setOpenSubmenu(null);
        navigate(path);
    };

    const closeSidebarAndNavigate = (path) => {
        setSidebarOpen(false);
        navigate(path);
    };

    return (
        <Box sx={{ position: 'relative' }}>
            <Box sx={{ backgroundColor: '#fff', boxShadow: 1 }}>
                <Container>
                    <Box>
                        <Box sx={{ display: { sm: 'flex', xs: 'none' }, justifyContent: 'center' }}>
                            <MenuItem
                                onClick={() => navigate('/ourProducts')}
                                sx={getItemStyles(isActiveRoute('/ourProducts'))}
                            >
                                <Typography className='lines' component={'img'} src={line} sx={{ display: 'none', mr: 1 }}></Typography>
                                <Typography className='navItem'>Our Products</Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => navigate('/')}
                                sx={getItemStyles(isActiveRoute('/'))}
                            >
                                <Typography className='lines' component={'img'} src={line} sx={{ display: 'none', mr: 1 }}></Typography>
                                <Typography className='navItem'>Blog</Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => navigate('/gallery')}
                                sx={getItemStyles(isActiveRoute('/gallery'))}
                            >
                                <Typography className='lines' component={'img'} src={line} sx={{ display: 'none', mr: 1 }}></Typography>
                                <Typography className='navItem'>Gallery</Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => navigate('/inquiry')}
                                sx={getItemStyles(isActiveRoute('/inquiry'))}
                            >
                                <Typography className='lines' component={'img'} src={line} sx={{ display: 'none', mr: 1 }}></Typography>
                                <Typography className='navItem'>Inquiry</Typography>
                            </MenuItem>
                        </Box>
                        <Box sx={{ display: { sm: 'none', xs: 'flex' }, justifyContent: 'end' }}>
                            <IconButton onClick={toggleSidebar} sx={{ color: '#294462' }}>
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        <Drawer anchor='left' open={sidebarOpen} onClose={toggleSidebar}>
                            <Box sx={{ width: 250, backgroundColor: '#294462', height: '100vh', color: '#fff' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                                    <Typography component={'img'} src={Logo} sx={{ width: '30%' }}></Typography>
                                    <IconButton onClick={toggleSidebar}>
                                        <CloseIcon sx={{ color: '#fff' }} />
                                    </IconButton>
                                </Box>
                                <Box sx={{ px: 2 }}>
                                    <MenuItem onClick={() => handleSubmenuToggle('products')} sx={getSidebarItemStyles(isActiveRoute('/ourProducts'))}>
                                        <StorefrontIcon />
                                        <Typography>Our Products</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => closeSidebarAndNavigate('/')} sx={getSidebarSubmenuItemStyles(isActiveRoute('/'))}>
                                        <BookIcon />
                                        <Typography>Blog</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => closeSidebarAndNavigate('/gallery')} sx={getSidebarItemStyles(isActiveRoute('/gallery'))}>
                                        <CollectionsIcon />
                                        <Typography>Gallery</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => closeSidebarAndNavigate('/inquiry')} sx={getSidebarItemStyles(isActiveRoute('/inquiry'))}>
                                        <CollectionsIcon />
                                        <Typography>Inquiry</Typography>
                                    </MenuItem>
                                </Box>
                            </Box>
                        </Drawer>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

const getItemStyles = (isActive) => ({
    position: 'relative',
    py: 2.5,
    px: { md: 4, sm: 2 },
    color: '#A0A0A0',
    '&:hover': {
        color: '#19AED7',
    },
    '&:hover .lines': {
        display: 'block',
        transition: '0.5s',
    },
    '&:hover .navItem': {
        fontWeight: 600,
        transition: '0.5s',
    },
    ...(isActive && {
        color: '#19AED7',
        fontWeight: 600,
        '.lines': {
            display: 'block',
        },
        '.navItem': {
            fontWeight: 600
        },
    }),
});


const getSubmenuItemStyles = (isActive) => ({
    p: 1,
    color: '#A0A0A0',
    '&:hover': {
        color: '#19AED7',
        fontWeight: 600,
    },
    ...(isActive && {
        color: '#19AED7',
        fontWeight: 600,
    })
});

const getSidebarItemStyles = (isActive) => ({
    px: 1,
    py: 1,
    '&:hover': {
        backgroundColor: '#19AED7',
    },
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    ...(isActive && {
        backgroundColor: '#19AED7',
    })
});

const getSidebarSubmenuItemStyles = (isActive) => ({
    p: 1,
    '&:hover': {
        backgroundColor: '#19AED7',
    },
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    ...(isActive && {
        backgroundColor: '#19AED7',
    })
});

export default Navbar;
