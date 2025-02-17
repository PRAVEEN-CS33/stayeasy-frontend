import React, { useState } from "react";
import dayjs from "dayjs";
import { Card, CardContent, CardMedia, Typography, Box, IconButton, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { MoreHoriz } from "@mui/icons-material";
import pgimg from "../../assets/pg.jpg";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { BookingService, ScheduledVisitService } from "../../services/api";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { toast } from "react-toastify";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

function BookingCard({ page, row, status, handleDelete }) {
    const [isFav, setFav] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [checkIn, setCheckIn] = useState(dayjs(row.check_in));
    const [checkOut, setCheckOut] = useState(dayjs(row.check_out));
    const [visitDate, setVisitDate] = useState(dayjs(row.visit_date));

    const handleFavoriteClick = () => setFav(!isFav);
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleDeleteClick = () => {
        setAnchorEl(null);
        setOpenDelete(true);
    };

    const handleDeleteConfirm = () => {
        const id = page === "schedules" ? row.visit_id : row.id;
        const data = {
            "accommodation_id": row.accommodation_id,
            "owner_id": row.owner_id,
            "status": "canceled"
        }
        handleDelete(id, data);
        setOpenDelete(false);
    };

    const handleEdit = async () => {
        try {
            let updatedData;

            if (page === "booking") {
                updatedData = {
                    accommodation_id: row.accommodation_id,
                    owner_id: row.owner_id,
                    check_in: checkIn.format("YYYY-MM-DD HH:mm:ss"),
                    check_out: checkOut.format("YYYY-MM-DD HH:mm:ss"),
                };
                await BookingService.update(row.id, updatedData);
            } else {
                updatedData = {
                    accommodation_id: row.accommodation_id,
                    owner_id: row.owner_id,
                    visit_date: visitDate.format("YYYY-MM-DD HH:mm:ss"),
                };
                await ScheduledVisitService.update(row.visit_id, updatedData);
            }

            console.log("Updated Data Sent:", updatedData);
            toast.success(page, "Date updated successfully!");
        } catch (error) {
            console.error("Backend Response:", error.response?.data);
            toast.error(page + " date updation failed, Try again later!");
        } finally {
            setIsEdit(false);
        }
    };



    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "row",
                maxWidth: "35vw",
                width: "100%",
                borderRadius: 4,
                boxShadow: 3,
                overflow: "hidden",
                position: "relative",
                opacity: status === "canceled" ? 0.5 : 1
            }}
        >
            {/* Image Section */}
            <Box sx={{ position: "relative", width: "40%" }}>
                <CardMedia
                    component="img"
                    image={row.image || pgimg}
                    alt={row.accommodation_name}
                    sx={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: 1
                    }}
                />
            </Box>

            {/* Content Section */}
            <CardContent sx={{ flex: 1, paddingLeft: 2, }}>
                <Typography variant="h8" fontWeight="bold">
                    {row.accommodation_name}
                </Typography>

                <Typography variant="body2" color="textSecondary">
                    {row.user_name ? `Booked by: ${row.user_name}` : "User info not available"}
                </Typography>

                {page === "booking" && (
                    <>
                        <Typography variant="body2" color="green" fontWeight={500}
                            sx={{
                                animation: "blink 1s infinite",
                                "@keyframes blink": {
                                    "50%": { opacity: 0 },
                                },
                                color: status === "canceled" ? "red" : "green",
                            }}>
                            {row.booking_status}
                        </Typography>
                        {isEdit ? (
                            <Stack direction="row" spacing={1} alignItems="center" marginTop={1}>
                                <DateTimePicker
                                    label="Check-in"
                                    value={checkIn}
                                    onChange={(newValue) => setCheckIn(newValue)}
                                    sx={{ flexGrow: 1, minWidth: "120px" }}
                                    slotProps={{ textField: { size: "small" } }}
                                />
                                <DateTimePicker
                                    label="Check-out"
                                    value={checkOut}
                                    onChange={(newValue) => setCheckOut(newValue)}
                                    sx={{ flexGrow: 1, minWidth: "120px" }}
                                    slotProps={{ textField: { size: "small" } }}
                                />
                                <IconButton onClick={handleEdit}>
                                    <PublishedWithChangesIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => setIsEdit(false)}>
                                    <CancelOutlinedIcon color="error" />
                                </IconButton>
                            </Stack>
                        ) : (
                            <>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    <strong>Check-in:</strong> {row.check_in}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    <strong>Check-out:</strong> {row.check_out}
                                </Typography>
                            </>
                        )}

                        <Typography variant="body2" sx={{ mt: 1 }}>
                            <strong>Amount:</strong> ₹{row.amount}
                        </Typography>

                        <Typography variant="body2" sx={{ mt: 1 }}>
                            <strong>Payment Status:</strong> {row.payment_status ? row.payment_status : "Pending"}
                        </Typography>
                    </>
                )}
                {page === "schedules" && (
                    <>
                        <Typography variant="body2" color="green" fontWeight={500}
                            sx={{
                                animation: "blink 1s infinite",
                                "@keyframes blink": {
                                    "50%": { opacity: 0 },
                                },
                                color: status === "canceled" ? "red" : "green",
                            }}>
                            {row.status}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            <strong>Owner ID:</strong> {row.owner_id}
                        </Typography>
                        {isEdit ? (
                            <Stack direction="row" spacing={1} alignItems="center" marginTop={1}>
                                <DateTimePicker
                                    label="Visit date"
                                    value={visitDate}
                                    onChange={(newValue) => setVisitDate(newValue)}
                                    sx={{ flexGrow: 1, minWidth: "120px" }}
                                    slotProps={{ textField: { size: "small" } }}
                                />
                                <IconButton onClick={handleEdit}>
                                    <PublishedWithChangesIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => setIsEdit(false)}>
                                    <CancelOutlinedIcon color="error" />
                                </IconButton>
                            </Stack>
                        ) : (
                            <>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    <strong>Visit Date:</strong> {row.visit_date}
                                </Typography>
                            </>
                        )}

                    </>

                )}


            </CardContent>

            {/* Actions */}
            <Box sx={{ alignSelf: "self-start" }}>

                <Box>
                    <IconButton onClick={handleFavoriteClick} sx={{ color: isFav ? "red" : "gray" }}>
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton onClick={handleMenuOpen}>
                        <MoreHoriz />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={() => { setIsEdit(true); handleMenuClose() }}>
                            <EditIcon fontSize="small" sx={{ marginRight: 1, color: 'green' }} /> Edit
                        </MenuItem>
                        <MenuItem onClick={handleDeleteClick}>
                            <HighlightOffIcon fontSize="small" style={{ color: 'red' }} sx={{ marginRight: 1 }} /> Cancel
                        </MenuItem>
                    </Menu>
                </Box>

                {/* Delete Confirmation Dialog */}
                <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                    <DialogTitle>Cancel Booking?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to cancel this booking? This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDelete(false)} color="secondary">back</Button>
                        <Button onClick={handleDeleteConfirm} color="error">Cancel Booking</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Card>
    );
}

export default BookingCard;
