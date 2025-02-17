import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box, Chip, IconButton, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import pgimg from "../../assets/pg.jpg";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MoreHoriz } from "@mui/icons-material";

function AdminCard({ row, handleDelete, handleEdit, name = "", description = "", amount = "", preferredBy = "", image = null, onEdit, onDelete, }) {
    const [isFav, setFav] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleFavoriteClick = () => {
        setFav(!isFav);
    };

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleDeleteClick = () => {
        setAnchorEl(null);
        setOpenDelete(true);
    };
    const handleDeleteConfirm = () => {
        handleDelete(row.accommodation_id);
        setOpenDelete(false);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "60vw",
                width: "100%",
                borderRadius: 4,
                boxShadow: 3,
                overflow: "hidden",
                position: "relative",
            }}
        >
            {/* Image Section */}
            <Box sx={{ position: "relative", maxWidth: "25vw", }}>
                <CardMedia
                    component="img"
                    height="auto"
                    width="100%"
                    image={pgimg}
                    alt={name}
                    sx={{}}
                />
            </Box>
            {/* Discount Badge */}
            <Chip
                label="💰 UPTO 15% OFF"
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "#E1F5FE",
                    color: "#00796B",
                    fontSize: 12,
                    fontWeight: 600,
                    marginTop: 1,
                }}
            />
            {/* Content Section */}
            <CardContent sx={{ flex: 1, padding: 0, height: "100%", gap: 0 }}>
                {/* Availability Badge */}
                <Chip
                    label="🌟 DAILY STAYS AVAILABLE"
                    sx={{
                        backgroundColor: "#A889E7",
                        color: "white",
                        fontSize: 12,
                        fontWeight: 600,
                        marginBottom: 1,
                        borderRadius: 1,
                    }}
                />

                {/* Name & Location */}
                <Typography variant="h6" fontWeight="bold">
                    {name}
                </Typography>
                <Typography variant="body2" color="green" fontWeight={500}>
                    {preferredBy.toUpperCase()} PG
                </Typography>
                <Typography
                    variant="body2"
                    color="gray"
                    fontWeight={500}
                    sx={{
                        height: 50,
                        overflow: "hidden",
                        // display: "-webkit-box",
                        // WebkitBoxOrient: "vertical",
                        // WebkitLineClamp: 2,
                        // textOverflow: "ellipsis",
                    }}
                >
                    {description}
                </Typography>
                <Box>
                    <Typography variant="h10" fontWeight="">{name}
                    </Typography>
                    <Stack direction="row" spacing={1} width={100}>
                        <Chip label="Chip Outlined" variant="outlined" size="small" />
                    </Stack>
                </Box>
                {/* Amount Section */}
                <Typography variant="body2" color="gray" sx={{ marginTop: 1 }}>Prices</Typography>
                <Typography variant="body2" color="gray" sx={{ marginTop: 1 }}>Starts at</Typography>
                <Typography variant="h6" fontWeight="bold">₹{amount}</Typography>
            </CardContent>
            <Box
                sx={{
                    height:"100%",
                    alignSelf:"flex-start"
                }}
            >
                <Box
                >
                    <IconButton onClick={handleFavoriteClick} sx={{ color: isFav ? "red" : "gray" }}><FavoriteIcon /></IconButton>
                    <IconButton onClick={handleMenuOpen}><MoreHoriz /></IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={() => handleEdit(row)}> <EditIcon fontSize='small' sx={{ marginRight: 1, color: 'green' }} /> Edit </MenuItem>
                        <MenuItem onClick={handleDeleteClick}> <HighlightOffIcon fontSize='small' style={{ color: 'red' }} sx={{ marginRight: 1 }} /> Cancel </MenuItem>
                    </Menu>
                    <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                        <DialogTitle>Cancel Accommodation?</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Are you sure you want to cancel this accommodation? This action cannot be undone.</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDelete(false)} color="secondary">Cancel</Button>
                            <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
        </Card>
    );
}

export default AdminCard;
