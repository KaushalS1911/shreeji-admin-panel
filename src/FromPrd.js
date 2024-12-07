import React, { useEffect, useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    Link,
    Paper,
    CircularProgress,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Container,
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import line from "./assets/images/global/line.png";

const countries = [
    { code: 'IN', name: 'India' },
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    // Add more countries...
];

const FromPrd = () => {
    const [single, setSingle] = useState({});
    const { id } = useParams();
    const [title, setTitle] = useState(""); // Title field
    const [thumbnail, setThumbnail] = useState(null); // Product Image field
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState(""); // Category field
    const [country, setCountry] = useState(""); // Country field
    const [shelfLife, setShelfLife] = useState(""); // Shelf Life field
    const [packagingType, setPackagingType] = useState(""); // Packaging Type field
    const [preferredBuyerLocation, setPreferredBuyerLocation] = useState(""); // Preferred Buyer Location field
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getSingleData();
        }
    }, [id]);

    useEffect(() => {
        if (single) {
            setTitle(single.title || "");
            setThumbnail(single.image || null);
            setThumbnailPreview(single.image || null);
            setCategory(single.category || "");
            // Set other fields if available in the single product data
            setCountry(single.description?.country || "");
            setShelfLife(single.description?.shelfLife || "");
            setPackagingType(single.description?.packagingType || "");
            setPreferredBuyerLocation(single.description?.preferredBuyerLocation || "");
        }
    }, [single]);

    const getSingleData = () => {
        axios
            .get(`https://shreeji-be.onrender.com/api/product/${id}`)
            .then((res) => setSingle({...res.data.data,description: JSON.parse(res.data.data.description)}))
            .catch((err) => console.log(err));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setThumbnail(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setThumbnailPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("product-image", thumbnail);
        formData.append("category", category);

        // Create the description object
        const description = {
            country,
            shelfLife,
            packagingType,
            preferredBuyerLocation,
        };

        // Append the description object as JSON
        formData.append("description", JSON.stringify(description));

        if (id) {
            axios.put(`https://shreeji-be.onrender.com/api/product/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((res) => {
                    console.log(res.data);
                    navigate('/ourProducts');
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            axios
                .post("https://shreeji-be.onrender.com/api/product", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    navigate('/ourProducts');
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    };

    return (
        <Container>
            <Box sx={{ my: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box>
                    <Paper elevation={4} sx={{ padding: 4, borderRadius: 3 }}>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                            }}
                        >
                            <Typography sx={{ fontWeight: 600, fontSize: { lg: '40px', md: '34px', sm: '24px', xs: '28px' }, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                <Typography component={'img'} src={line} sx={{ mr: 1 }} alt="Line decoration" />
                                {id ? "Edit Product" : "Add Product"}
                            </Typography>

                            {/* File Upload Section */}
                            <Box
                                sx={{
                                    border: "2px dashed #ddd",
                                    borderRadius: "8px",
                                    padding: 4,
                                    textAlign: "center",
                                    bgcolor: "#fafafa",
                                    transition: "all 0.3s",
                                    "&:hover": {
                                        borderColor: "#7b61ff",
                                        bgcolor: "#f4f1ff",
                                    }
                                }}
                            >
                                <Button
                                    variant="contained"
                                    component="label"
                                    sx={{
                                        textTransform: "none",
                                        backgroundColor: "#7b61ff",
                                        fontSize: "16px",
                                        padding: "10px 20px",
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >
                                    <CloudUploadIcon />
                                    Upload Thumbnail
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </Button>
                                <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                                    Max file size 1GB
                                </Typography>
                                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                    By proceeding, you agree to our <Link href="#" underline="hover">Terms of Use</Link>.
                                </Typography>
                            </Box>

                            {thumbnailPreview && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', }}>
                                    <Box
                                        component="img"
                                        src={thumbnailPreview}
                                        alt="Thumbnail Preview"
                                        sx={{
                                            width: "50%",
                                            height: "auto",
                                            borderRadius: 2,
                                            boxShadow: 1,
                                        }}
                                    />
                                </Box>
                            )}

                            {/* Title Input */}
                            <TextField
                                label="Product Title"
                                variant="outlined"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                fullWidth
                                required
                                InputLabelProps={{
                                    sx: {
                                        fontSize: 18,
                                        fontWeight: 500,
                                    }
                                }}
                                inputProps={{
                                    sx: {
                                        padding: 2,
                                    }
                                }}
                            />

                            {/* Category Select */}
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <MenuItem value="Fruits">Fruits</MenuItem>
                                    <MenuItem value="Grains">Grains</MenuItem>
                                    <MenuItem value="Spices">Spices</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Country Select */}
                            <FormControl fullWidth>
                                <InputLabel>Country</InputLabel>
                                <Select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                >
                                    {countries.map((country) => (
                                        <MenuItem key={country.code} value={country.name}>
                                            {country.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Shelf Life Input */}
                            <TextField
                                label="Shelf Life"
                                variant="outlined"
                                value={shelfLife}
                                onChange={(e) => setShelfLife(e.target.value)}
                                fullWidth
                                required
                            />

                            {/* Packaging Type Input */}
                            <TextField
                                label="Packaging Type"
                                variant="outlined"
                                value={packagingType}
                                onChange={(e) => setPackagingType(e.target.value)}
                                fullWidth
                                required
                            />

                            {/* Preferred Buyer Location Input */}
                            <TextField
                                label="Preferred Buyer Location"
                                variant="outlined"
                                value={preferredBuyerLocation}
                                onChange={(e) => setPreferredBuyerLocation(e.target.value)}
                                fullWidth
                                required
                            />

                            {/*<TextField*/}
                            {/*    label="Country"*/}
                            {/*    variant="outlined"*/}
                            {/*    value={country}*/}
                            {/*    onChange={(e) => setPreferredBuyerLocation(e.target.value)}*/}
                            {/*    fullWidth*/}
                            {/*    required*/}
                            {/*/>*/}

                            {/*<TextField*/}
                            {/*    label="Shelf Life"*/}
                            {/*    variant="outlined"*/}
                            {/*    value={shelfLife}*/}
                            {/*    onChange={(e) => setPreferredBuyerLocation(e.target.value)}*/}
                            {/*    fullWidth*/}
                            {/*    required*/}
                            {/*/>*/}

                            {/*<TextField*/}
                            {/*    label="Packaging Type"*/}
                            {/*    variant="outlined"*/}
                            {/*    value={packagingType}*/}
                            {/*    onChange={(e) => setPreferredBuyerLocation(e.target.value)}*/}
                            {/*    fullWidth*/}
                            {/*    required*/}
                            {/*/>*/}


                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                sx={{
                                    padding: "12px 0",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    backgroundColor: "#7b61ff",
                                    "&:hover": {
                                        backgroundColor: "#634de2",
                                    },
                                }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} sx={{ color: "black" }} />
                                ) : (
                                    id ? "Edit Product" : "Add Product"
                                )}
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
};

export default FromPrd;
