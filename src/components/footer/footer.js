import React from "react";
import { Box, Typography, Link, Divider } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#152c5b",
                color: "white",
                padding: "20px 40px",
                textAlign: "center",
                marginTop: "5vh",
                marginBottom: '0px',
            }}
        >
            {/* Links Section */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap", mb: 1 }}>
                <Link href="/home" color="inherit" underline="hover">Home</Link>
                <Link href="#" color="inherit" underline="hover">About Us</Link>
                <Link href="#" color="inherit" underline="hover">Privacy Policy</Link>
                <Link href="#" color="inherit" underline="hover">Terms & Conditions</Link>
                <Link href="#" color="inherit" underline="hover">Contact</Link>
            </Box>

            <Divider sx={{ backgroundColor: "white", my: 1, opacity: 0.3 }} />

            {/* Copyright Section */}
            <Typography variant="body2">
                © {new Date().getFullYear()} StayEasy. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
