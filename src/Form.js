import React, { useEffect, useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    Container,
    CircularProgress,
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import line from "./assets/images/global/line.png";

const Form = () => {
    const { id } = useParams();
    const [heading, setHeading] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // Introductory text and export information
    const [introText, setIntroText] = useState("");
    const [exportInfo, setExportInfo] = useState("");

    // State for exported goods and sections
    const [exportedGoods, setExportedGoods] = useState([""]);
    const [sections, setSections] = useState([{ heading: "", content: "" }]);

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getSingleData();
        }
    }, [id]);


    const getSingleData = () => {
        setLoading(true); // Start loading
        axios
            .get(`https://shreeji-be.onrender.com/api/blog/${id}`)
            .then((res) => {
                const data = res.data.data;
    
                // Parse the description
                const description = JSON.parse(data.description);
                console.log("description : ",description)
                // Set state values
                setHeading(data.heading || "");
                setIntroText(description.introText || "");
                setExportInfo(description.exportInfo || "");
                setThumbnail(data.thumbnail_image || null);
                setThumbnailPreview(data.thumbnail_image || null);
                setExportedGoods(description.exportedGoods || [""]);
                setSections(description.sections || [{ heading: "", content: "" }]);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false)); // Stop loading
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

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();

        const formData = new FormData();
        formData.append("thumbnail-url", thumbnail);
        formData.append("heading", heading);
        const description = {
            introText,
            exportInfo,
            exportedGoods,
            sections,
        };

        formData.append("description", JSON.stringify(description));

        const apiCall = id
            ? axios.put(`https://shreeji-be.onrender.com/api/blog/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            : axios.post("https://shreeji-be.onrender.com/api/blog", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

        apiCall
            .then((res) => {
                console.log(res.data);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const addExportedGood = () => {
        setExportedGoods([...exportedGoods, ""]); // Add an empty string for new input
    };

    const handleExportedGoodChange = (index, value) => {
        const updatedGoods = [...exportedGoods];
        updatedGoods[index] = value; // Update the specific index
        setExportedGoods(updatedGoods);
    };

    const deleteExportedGood = (index) => {
        const updatedGoods = exportedGoods.filter((_, i) => i !== index);
        setExportedGoods(updatedGoods);
    };

    const addSections = () => {
        setSections([...sections, { heading: "", content: "" }]); // Add a new section
    };

    const handleSectionChange = (index, field, value) => {
        const updatedSections = [...sections];
        updatedSections[index][field] = value; // Update the specific field
        setSections(updatedSections);
    };

    const deleteSection = (index) => {
        const updatedSections = sections.filter((_, i) => i !== index);
        setSections(updatedSections);
    };

    return (
        <Container>
            <Box sx={{ my: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box>
                    <Paper elevation={4} sx={{ padding: 4, borderRadius: 3 }}>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                        >
                            <Typography sx={{ fontWeight: 600, fontSize: { lg: '40px', md: '34px', sm: '24px', xs: '28px' }, display: 'flex', alignItems: 'center' }}>
                                <img src={line} alt="Line" style={{ marginRight: '8px' }} />
                                {id ? "Edit Blog" : "Add Blog"}
                            </Typography>

                            {/* Thumbnail Upload */}
                            <Box sx={{
                                border: "2px dashed #ddd",
                                borderRadius: "8px",
                                padding: 4,
                                textAlign: "center",
                                bgcolor: "#fafafa",
                                transition: "all 0.3s",
                                "&:hover": { borderColor: "#7b61ff", bgcolor: "#f4f1ff" }
                            }}>
                                <Button variant="contained" component="label" sx={{ textTransform: "none", backgroundColor: "#7b61ff", fontSize: "16px", padding: "10px 20px", display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CloudUploadIcon />
                                    Upload Thumbnail
                                    <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                                </Button>
                            </Box>

                            {thumbnailPreview && (
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Box component="img" src={thumbnailPreview} alt="Thumbnail Preview" sx={{ width: "50%", height: "auto", borderRadius: 2, boxShadow: 1 }} />
                                </Box>
                            )}

                            {/* Heading */}
                            <TextField
                                label="Blog Heading"
                                variant="outlined"
                                value={heading}
                                onChange={(e) => setHeading(e.target.value)}
                                fullWidth
                                required
                                InputLabelProps={{ sx: { fontSize: 18, fontWeight: 500 } }}
                                inputProps={{ sx: { padding: 2 } }}
                            />

                            {/* Introductory Section */}
                            <TextField
                                label="Introductory Section"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={introText}
                                onChange={(e) => setIntroText(e.target.value)}
                                fullWidth
                                InputLabelProps={{ sx: { fontSize: 18, fontWeight: 500 } }}
                                inputProps={{ sx: { padding: 2 } }}
                            />

                            {/* Export Information Section */}
                            <TextField
                                label="Export Information"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={exportInfo}
                                onChange={(e) => setExportInfo(e.target.value)}
                                fullWidth
                                InputLabelProps={{ sx: { fontSize: 18, fontWeight: 500 } }}
                                inputProps={{ sx: { padding: 2 } }}
                            />

                            {/* Add Exported Goods Button */}
                            <Button
                                variant="outlined"
                                onClick={addExportedGood}
                                sx={{ mt: 2, textTransform: "none" }}
                            >
                                + Add Exported Goods
                            </Button>

                            {/* Render dynamic input fields for exported goods */}
                            {exportedGoods.map((good, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <TextField
                                        variant="outlined"
                                        value={good}
                                        onChange={(e) => handleExportedGoodChange(index, e.target.value)}
                                        placeholder={`Exported Good #${index + 1}`}
                                        fullWidth
                                    />
                                    <Button variant="contained" color="error" onClick={() => deleteExportedGood(index)}>
                                        X
                                    </Button>
                                </Box>
                            ))}

                            <Button
                                variant="outlined"
                                onClick={addSections}
                                sx={{ mt: 2, textTransform: "none" }}
                            >
                                + Add Sections
                            </Button>

                            {/* Render dynamic input fields for sections */}
                            {sections.map((section, index) => (
                                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <TextField
                                        variant="outlined"
                                        label="Section Heading"
                                        value={section.heading}
                                        onChange={(e) => handleSectionChange(index, "heading", e.target.value)}
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        variant="outlined"
                                        label="Section Content"
                                        value={section.content}
                                        onChange={(e) => handleSectionChange(index, "content", e.target.value)}
                                        multiline
                                        rows={4}
                                        fullWidth
                                        required
                                    />
                                    <Button variant="contained" color="error" onClick={() => deleteSection(index)}>
                                        Remove Section
                                    </Button>
                                </Box>
                            ))}

                            {/* Submit Button */}
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{ backgroundColor: "#7b61ff", mt: 3 }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : id ? "Update Blog" : "Create Blog"}
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
};

export default Form;
