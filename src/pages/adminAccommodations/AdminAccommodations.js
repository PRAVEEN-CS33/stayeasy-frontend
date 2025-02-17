import React, { useEffect, useState } from "react";
import './adminaccommodations.css'
import AddIcon from '@mui/icons-material/Add';
import { Backdrop, Box, CircularProgress, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
    TextField,
    Checkbox,
    FormControlLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Divider,
    Grid,
    Select,
    FormControl,
    InputLabel,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import { AccommodationService, ServiceService, SharingRentService } from "../../services/api";
import { toast } from "react-toastify";

const theme = createTheme({
    palette: {
        primary: { main: "#1976d2" },
        secondary: { main: "#f50057" },
        background: { default: "#f5f5f5" },
    },
});


function ActionMenu({ row, handleDelete, handleEdit }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [isFav, setFav] = React.useState(false);

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

    return (
        <>
            <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleFavoriteClick}> <FavoriteIcon fontSize='small' sx={{ marginRight: 1, color: isFav ? "red" : "gray" }} /> Favorite </MenuItem>
                <MenuItem onClick={() => handleEdit(row)}> <EditIcon fontSize='small' sx={{ marginRight: 1, color: 'green' }} /> Edit </MenuItem>
                <MenuItem onClick={handleDeleteClick}> <DeleteIcon fontSize='small' style={{ color: 'red' }} sx={{ marginRight: 1 }} /> Delete </MenuItem>
            </Menu>
            <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                <DialogTitle>Delete Accommodation?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this accommodation? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDelete(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
const paginationModel = { page: 0, pageSize: 10 };

function AdminAccommodations() {

    const [open, setOpen] = React.useState(false);
    const [bufferopen, setBufferOpen] = React.useState(false);
    const [rows, setRows] = useState([]);
    const [rents, setRents] = useState([{ sharing_type: "", rent_amount: "" }]);
    const [editAccommodation, setEditAccommodation] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [basicInfo, setBasicInfo] = useState({
        accommodation_name: "",
        accommodation_types: "",
        description: "",
        gender_types: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        preferred_by: "",
    });


    const [amenities, setAmenities] = useState({
        meals: false,
        power_backup: false,
        workout_zone: false,
        housekeeping: false,
        refrigerator: false,
        washing_machine: false,
        hot_water: false,
        water_purifier: false,
        television: false,
        biometric_entry: false,
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditOpen(false)
        setBasicInfo({
            accommodation_name: "",
            accommodation_types: "",
            description: "",
            gender_types: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            preferred_by: "",
        })
        setEditAccommodation(null)
    }
    useEffect(() => {
        fetchAccommodations();
    }, []);

    const fetchAccommodations = async () => {
        try {
            const response = await AccommodationService.ownerView()

            if (Array.isArray(response.data)) {
                const formattedRows = response.data.map(({
                    accommodation_id,
                    accommodation_name,
                    accommodation_types,
                    description,
                    address,
                    city = "",
                    state,
                    pincode,
                    gender_types,
                    preferred_by,
                    reviews = [],
                    services,
                    sharingRents = []
                }) => ({
                    accommodation_id,
                    accommodation_name,
                    accommodation_types,
                    description,
                    address,
                    city,
                    state,
                    pincode,
                    gender_types,
                    preferred_by,
                    reviews,
                    services,
                    sharingRents,
                    actions: '',
                }));

                setRows(formattedRows);
            } else {
                console.error("Response data is not an array:", response.data);
            }

        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.error("Too many requests. Please try again later.");
            } else {
                console.error("Error fetching accommodations:", error);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            const deleteResponse = await AccommodationService.ownerDelete(id);
            console.log(deleteResponse);
            fetchAccommodations();
        } catch (error) {
            console.error("Error deleting accommodation:", error);
        }
    }

    const handleEdit = async (row) => {
        setEditOpen(true);
        setEditAccommodation(row);
        setBasicInfo(row);
        setOpen(true);
    }


    const handleBasicInfoChange = (e) => {
        setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        setAmenities({ ...amenities, [e.target.name]: e.target.checked });
    };

    const handleRentChange = (index, e) => {
        const newRents = [...rents];
        newRents[index][e.target.name] = e.target.value;
        setRents(newRents);
    };

    const addRentRow = () => {
        if (rents.length < 4) {
            setRents([...rents, { sharing_type: "", rent_amount: "" }]);
        }
    };

    const removeRentRow = (index) => {
        setRents(rents.filter((_, i) => i !== index));
    };
    const handleSave = async () => {
        setBufferOpen(true);
        try {
            const basicInfoResponse = await editOpen ? AccommodationService.ownerUpdate(editAccommodation.accommodation_id, basicInfo) : AccommodationService.ownerCreate(basicInfo);
            console.log(basicInfoResponse);
            if (basicInfoResponse.status === 201) {
                if (!editOpen) {
                    const accommodationId = basicInfoResponse.data.accommodation_id;
                    if (!accommodationId) {
                        throw new Error("Accommodation ID is missing. Cannot save amenities.");
                    }
                    // Send Amenities
                    const amenitiesData = { accommodation_id: accommodationId, ...amenities };
                    const Amenities = await ServiceService.create(amenitiesData);
                    console.log(Amenities);

                    // Send Rents
                    const rentData = rents.map(rent => ({ accommodation_id: accommodationId, ...rent }));

                    // Send rentData wrapped in a data field
                    const Rents = await SharingRentService.create({ data: rentData });
                    console.log(Rents);
                }
                console.log("All data saved successfully!");
                toast("All data saved successfully!")
            }
        } catch (error) {
            console.error("Error saving data:", error.response ? error.response.data : error.message);
        } finally {
            handleClose();
            setEditOpen(false);
            setTimeout(() => {
                setBufferOpen(false);
            }, 3000);
            setBasicInfo({
                accommodation_name: "",
                accommodation_types: "",
                description: "",
                gender_types: "",
                address: "",
                city: "",
                state: "",
                pincode: "",
                preferred_by: "",
            })
            setEditAccommodation(null)
            fetchAccommodations()
            setAmenities({
                meals: false,
                power_backup: false,
                workout_zone: false,
                housekeeping: false,
                refrigerator: false,
                washing_machine: false,
                hot_water: false,
                water_purifier: false,
                television: false,
                biometric_entry: false,
            });
            setRents([{ 
                sharing_type: "", 
                rent_amount: "" 
            }]);
        }
    }

    return (
        <div className='adminContainer'>
            <div className="adminHead">
                <h2>
                    Accommodation Overview
                </h2>
                <Box sx={{ '& > :not(style)': { m: 1 } }} onClick={handleOpen} size="small">
                    <Button variant="contained" size="small" sx={{
                        background: '#3252DF'
                    }}><AddIcon size='small' />add</Button>
                </Box>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <ThemeProvider theme={theme}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '100vh',
                            width: '100vw',
                        }}>
                            <Box sx={{
                                maxWidth: '55vw',
                                backgroundColor: "background.default",
                                padding: 2,
                                borderRadius: 2,
                                boxShadow: 3,
                            }}>
                                <h2 style={{ display: "flex", alignItems: "center", mb: 2, color: "#253a66" }}>{editOpen ? "Edit" : "Add"} Accommodation</h2>
                                <Grid container spacing={2}>
                                    {/* Left Section */}
                                    <Grid item xs={12} md={6}>
                                        <Paper sx={{ p: 3, borderRadius: 2, backgroundColor: "white" }}>
                                            <Typography variant="h7" color="secondary">Details</Typography>
                                            <Divider sx={{ mb: 2 }} />
                                            <TextField size="small" label="Accommodation Name" name="accommodation_name" value={basicInfo.accommodation_name} onChange={handleBasicInfoChange} fullWidth margin="normal" variant="outlined" />
                                            <FormControl size="small" fullWidth margin="normal">
                                                <InputLabel>Accommodation Type</InputLabel>
                                                <Select name="accommodation_types" value={basicInfo.accommodation_types} onChange={handleBasicInfoChange}>
                                                    <MenuItem value="Hotel">Hostel</MenuItem>
                                                    <MenuItem value="PG">PG</MenuItem>
                                                    <MenuItem value="Apartment">Apartment</MenuItem>
                                                    <MenuItem value="Hostel">Hostel</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <TextField size="small" label="Description" name="description" value={basicInfo.description} onChange={handleBasicInfoChange} fullWidth multiline rows={2} margin="normal" variant="outlined" />
                                            <FormControl size="small" fullWidth margin="normal">
                                                <InputLabel>Gender</InputLabel>
                                                <Select name="gender_types" value={basicInfo.gender_types} onChange={handleBasicInfoChange}>
                                                    <MenuItem value="male">Male</MenuItem>
                                                    <MenuItem value="Female">Female</MenuItem>
                                                    <MenuItem value="Other">Others</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <TextField size="small" label="Address" name="address" value={basicInfo.address} onChange={handleBasicInfoChange} fullWidth margin="normal" variant="outlined" />
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}><TextField size="small" label="City" name="city" value={basicInfo.city} onChange={handleBasicInfoChange} fullWidth variant="outlined" /></Grid>
                                                <Grid item xs={6}><TextField size="small" label="State" name="state" value={basicInfo.state} onChange={handleBasicInfoChange} fullWidth variant="outlined" /></Grid>
                                                <Grid item xs={6}><TextField size="small" label="Pincode" name="pincode" value={basicInfo.pincode} onChange={handleBasicInfoChange} fullWidth variant="outlined" /></Grid>
                                                <Grid item xs={6}><TextField size="small" label="Preferred By" name="preferred_by" value={basicInfo.preferred_by} onChange={handleBasicInfoChange} fullWidth variant="outlined" /></Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>

                                    {/* Right Section (Amenities + Rent Details) */}
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={2}>
                                            {/* Amenities */}
                                            <Paper sx={{ p: 3, borderRadius: 2, backgroundColor: "white" }}>
                                                <Typography variant="h7" color="secondary">Amenities</Typography>
                                                <Divider sx={{ mb: 1 }} />
                                                <Grid container>
                                                    {Object.keys(amenities).map((key) => (
                                                        <Grid item xs={6} key={key}>
                                                            <FormControlLabel
                                                                control={<Checkbox name={key} checked={amenities[key]} onChange={handleCheckboxChange} />}
                                                                label={key.replace("_", " ").toUpperCase()}
                                                                sx={{ fontSize: '10px' }}
                                                            />
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Paper>
                                            {/* Rent Details */}
                                            <Paper sx={{ p: 2, borderRadius: 2, backgroundColor: "white", mt: 2 }}>
                                                <div className="addrent">
                                                    <Typography variant="h7" color="secondary">Rent Details</Typography>
                                                    <IconButton
                                                        onClick={addRentRow}
                                                        disabled={rents.length >= 4}
                                                        variant="contained"
                                                        color="primary"
                                                        aria-label="add"
                                                        size="small"
                                                    >
                                                        <AddIcon fontSize="small" />
                                                    </IconButton>
                                                </div>
                                                {/* <Divider sx={{ mb: 1, mt: 1 }} /> */}

                                                <TableContainer component={Paper} sx={{ maxHeight: 160, overflowY: "auto", display: 'block' }}>
                                                    <Table stickyHeader>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell sx={{ fontSize: '10px' }}>Sharing Type</TableCell>
                                                                <TableCell sx={{ fontSize: '10px' }}>Rent Amount</TableCell>
                                                                <TableCell sx={{ fontSize: '10px' }}>Actions</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {rents.map((rent, index) => (
                                                                <TableRow key={index} sx={{ borderBottom: "none" }}>
                                                                    <TableCell sx={{ fontSize: "12px", padding: "4px", borderBottom: "none" }}>
                                                                        <TextField
                                                                            name="sharing_type"
                                                                            value={rent.sharing_type}
                                                                            onChange={(e) => handleRentChange(index, e)}
                                                                            size="small"
                                                                            variant="outlined"
                                                                            InputProps={{ sx: { height: 30, fontSize: "12px" } }} // Reduce height & font size
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell sx={{ fontSize: "12px", padding: "4px", borderBottom: "none" }}>
                                                                        <TextField
                                                                            name="rent_amount"
                                                                            value={rent.rent_amount}
                                                                            onChange={(e) => handleRentChange(index, e)}
                                                                            size="small"
                                                                            variant="outlined"
                                                                            InputProps={{ sx: { height: 30, fontSize: "12px" } }} // Reduce height & font size
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell sx={{ fontSize: "12px", padding: "4px", borderBottom: "none" }}>
                                                                        <IconButton onClick={() => removeRentRow(index)} color="error" size="small">
                                                                            <DeleteIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Paper>
                                        </Stack>
                                    </Grid>
                                </Grid>

                                {/* Action Buttons */}
                                <Box mt={2} display="flex" justifyContent="center" gap={2}>
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        size="small"
                                        color=""
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="contained" size="small" sx={{ background: '#3252DF' }} onClick={handleSave}>
                                        {editOpen ? "Update" : "Save"}
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </ThemeProvider>
                </Modal>
                <Backdrop
                    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={bufferopen}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
            <div className="adminparentCards">
                <Paper sx={{ height: '90vh' }}>
                    <DataGrid
                        rows={rows}
                        columns={[
                            { field: 'accommodation_id', headerName: 'ID', flex: 1, renderCell: (params) => <span style={{ color: '#6576ff', fontWeight: 'bold' }}>{params.value}</span> },
                            { field: 'accommodation_name', headerName: 'Accommodation Name', flex: 1 },
                            { field: 'accommodation_types', headerName: 'Type', flex: 1 },
                            { field: 'description', headerName: 'Description', flex: 1 },
                            { field: 'address', headerName: 'Address', flex: 1 },
                            { field: 'city', headerName: 'City', flex: 1 },
                            { field: 'state', headerName: 'State', flex: 1 },
                            { field: 'pincode', headerName: 'Pincode', flex: 1 },
                            { field: 'gender_types', headerName: 'Gender', flex: 1 },
                            { field: 'preferred_by', headerName: 'Preferred By', flex: 1 },
                            {
                                field: 'actions',
                                headerName: 'Actions',
                                width: 100,
                                sortable: false,
                                filterable: false,
                                renderCell: (params) => <ActionMenu row={params.row} handleDelete={handleDelete} handleEdit={handleEdit} />,
                            },
                        ]}
                        getRowId={(row) => row.accommodation_id}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[10, 20]}
                        checkboxSelection
                        sx={{
                            border: 0,
                            '& .MuiDataGrid-row:nth-of-type(odd)': { backgroundColor: '#f5f5f5' },
                        }}
                    />
                </Paper>
            </div>
        </div>
    )
}

export default AdminAccommodations