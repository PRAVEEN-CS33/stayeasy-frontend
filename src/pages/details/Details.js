import React, { useEffect, useState } from "react";
import "./details.css";
import {
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    Box,
    List,
    ListItem,
    Chip,
    Avatar,
    LinearProgress,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tooltip,
    TextField,
    Modal,
    Fade,
} from "@mui/material";
import Divider from '@mui/material/Divider';
import StarIcon from "@mui/icons-material/Star";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import image2 from "../../assets/2.avif";
import image1 from "../../assets/1.avif";
import { InfoOutlined, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { DateTimePicker } from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";
import { QRCodeCanvas } from "qrcode.react";
import { Grid, styled } from "@mui/system";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AgreementIcon from "@mui/icons-material/Description";
import TruckIcon from "@mui/icons-material/LocalShipping";
import BrushIcon from "@mui/icons-material/Build";
import SofaIcon from "@mui/icons-material/Weekend";
import { BookingService, PaymentService, ScheduledVisitService } from "../../services/api";
import { toast } from "react-toastify";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

const services = [
    { icon: <WalletIcon />, title: "Pay", subtitle: "Token or Rent", isNew: true },
    { icon: <AgreementIcon />, title: "Create", subtitle: "Agreement", isNew: false },
    { icon: <TruckIcon />, title: "Estimate", subtitle: "Moving Cost", isNew: false },
    { icon: <BrushIcon />, title: "Book", subtitle: "Home Services", isNew: true },
    { icon: <SofaIcon />, title: "Rent / Buy", subtitle: "Furniture", isNew: false },
];
// Styled icon container
const IconWrapper = styled(Box)({
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "50%",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    position: "relative",
});

// Styled "NEW" badge
const NewBadge = styled(Box)({
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FF4F64",
    color: "#fff",
    fontSize: "10px",
    fontWeight: "bold",
    borderRadius: "10px",
    padding: "2px 6px",
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

const steps = ['Select', 'Payment', 'Complete'];

function Details() {
    const [accomData, setAccom] = useState([]);
    const [checkIn, setCheckIn] = useState(dayjs());
    const [checkOut, setCheckOut] = useState(dayjs().add(1, "day"));
    const [type, setType] = useState(1);
    const [slot, setSlot] = useState(1);
    const [amount, setAmount] = useState();
    const [paymentMethod, setPaymentMethod] = useState("QR");
    const [status, setStatus] = useState("Pending");
    const ratingsData = {
        averageRating: 3.4,
        totalReviews: accomData.reviews ? accomData.reviews.length : 0,
        ratingBreakdown: [51, 13, 9, 4, 21]
    };
    const [activeStep, setActiveStep] = React.useState(0);
    const [color, setColor] = useState("orange");
    const [open, setOpen] = React.useState(false);
    const [visitDate, setVisitDate] = useState("");
    const [openModal, setOpenModal] = React.useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const navigate = useNavigate();

    const handleSchedule = async () => {
        try {
            const response = await ScheduledVisitService.create({
                'accommodation_id': accomData.accommodation_id,
                'owner_id': accomData.owner_id,
                'visit_date': visitDate,
                'status': "pending"
            })
            toast.success(response.data);
            navigate('/user/schedules');
        } catch (e) {
            toast.error(e);
        }   
    };

    const handleNext = () => {
        if (activeStep === 2) {
            handleOpen();
            handleBooking();
        }
        if (paymentMethod === "Cash") {
            setActiveStep(2);
        } else {
            setActiveStep((prevActiveStep) => (prevActiveStep < 2 ? prevActiveStep + 1 : prevActiveStep));
        }
    };

    const handleBack = () => {
        if (paymentMethod === "Cash") {
            setActiveStep(0);
        } else {
            setActiveStep((prevActiveStep) => (prevActiveStep > 0 ? prevActiveStep - 1 : prevActiveStep));
        }
    };

    const handleBooking = async () => {
        try {
            const data = {
                "accommodation_id": accomData.accommodation_id,
                "owner_id": accomData.owner_id,
                "check_in": dayjs(checkIn).format("YYYY-MM-DD HH:mm:ss"),
                "check_out": dayjs(checkOut).format("YYYY-MM-DD HH:mm:ss"),
                "amount": amount,
                "status": "confirmed",
                "sharing_rent_type_id": type,
                "no_of_slots": slot
            };
            const BookingResponse = await BookingService.create(data);
            if (BookingResponse.status === 200) {
                const paymentData = {
                    "booking_id": BookingResponse.data.id,
                    "amount": amount,
                    "payment_status": status,
                }
                await PaymentService.create(paymentData);
            }
        } catch (e) {
            toast.error(e.response.data.message);
        } finally {
            setTimeout(() => {
                setOpen(false);
            }, 3000);
            navigate('/user/bookings');
            toast.success("Booking successfull")
        }
    }


    useEffect(() => {
        const storedData = localStorage.getItem("selectedAccom");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setAccom(parsedData);
            if (parsedData.sharingRents?.length > 0) {
                setAmount(parsedData.sharingRents[0].rent_amount);
            }
        }
    }, []);


    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus("Completed");
            setColor("green");
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 15 }}>
            {/* Hotel Image Banner */}
            <Box sx={{ height: 400, display: "flex", gap: 1 }}>
                <CardMedia
                    component="img"
                    sx={{ height: "100%", width: "50%", borderRadius: "4px 0 0 4px" }}
                    image={image1}
                    alt="img1"
                />
                <CardMedia
                    component="img"
                    sx={{ height: "100%", width: "50%", borderRadius: "0 4px 4px 0" }}
                    image={image2}
                    alt="img2"
                />
            </Box>

            <Box sx={{ display: 'flex' }}>
                <Box flex={1.5}>
                    <Box display={'flex'}>
                        <Box flex={1}>
                            <Typography variant="h4" mt={2}>{accomData.accommodation_name}</Typography>
                            <Typography variant="subtitle1" color="textSecondary">{accomData.address}, {accomData.city}</Typography>
                        </Box>
                        <Box
                            mt={2}
                            mr={2}
                            sx={{
                                width: 90,
                                borderRadius: 1,
                                overflow: "hidden",
                                textAlign: "center",
                                boxShadow: 1,
                            }}
                        >
                            {/* Rating Section */}
                            <Box sx={{ bgcolor: "#7AC143", color: "#fff", py: 0.5, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Typography fontWeight="bold">{ratingsData.averageRating}</Typography>
                                <StarIcon sx={{ fontSize: 20, ml: 0.2 }} />
                            </Box>
                            {/* Total Ratings Section */}
                            <Box sx={{ bgcolor: "#fff", py: 0.5 }}>
                                <Typography variant="body2" fontWeight="bold">
                                    {ratingsData.totalReviews} Ratings
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Hotel Info */}
                    <Box sx={{ flex: 2 }}>
                        <Typography variant="h6" mt={2} fontWeight={'bold'}>About this {accomData.accommodation_name}</Typography>
                        <Typography variant="body2" color="textSecondary" mt={1} mr={2} height={'10vh'} fontWeight={'bold'}>{accomData.description}</Typography>
                        {/* Amenities */}
                        <Typography variant="h6" mt={2} fontWeight={'bold'}>Amenities</Typography>
                        {accomData.services && (
                            <Box sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                mt: 2,
                                // mr: 10
                            }}>
                                {Object.entries(accomData.services)
                                    .filter(([key, value]) => value === 1 && key !== "id" && key !== "accommodation_id")
                                    .map(([key]) => (
                                        // sx={{ flexBasis: "40%", maxWidth: "50%", textAlign: "center" }}
                                        <Box key={key}>
                                            <Chip
                                                label={key.replace("_", " ").toUpperCase()}
                                                color=""
                                                variant="outlined"
                                                sx={{ width: "100%" }}
                                            />
                                        </Box>
                                    ))}
                            </Box>
                        )}
                        <Box mt={2}>
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                NoBroker Services
                            </Typography>
                            <Grid container justifyContent={'space-between'} mr={2}>
                                {services.map((service, index) => (
                                    <Grid item key={index}>
                                        <Box display="flex" flexDirection="column" alignItems="center">
                                            <IconWrapper>
                                                {service.isNew && <NewBadge>NEW</NewBadge>}
                                                <Box sx={{ fontSize: 20, color: "#FFB000" }}>{service.icon}</Box>
                                            </IconWrapper>
                                            <Typography variant="body1" fontWeight="bold" mt={1}>
                                                {service.title}
                                            </Typography>
                                            <Typography variant="body2" color="gray">
                                                {service.subtitle}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Box>
                {/* Booking Section */}
                <Card
                    sx={{
                        height: '35vh',
                        backgroundColor: '', //#f5f5f5
                        borderRadius: 2,
                        boxShadow: 3,
                        flex: 1,
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: "column",
                        gap: 2,
                        mt: 2,
                        p: 2
                    }}
                >
                    <Typography variant="h4" fontWeight="bold" mb={2}>Schedule Visit</Typography>
                    {/* Visit Date Input */}
                    <TextField
                        label="Visit Date"
                        type="date"
                        InputLabelProps={{ shrink: true }} // Keeps label above input
                        fullWidth
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                    />
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={handleSchedule}
                        sx={{
                            color: "##3252df",
                        }}
                    >
                        Schedule
                    </Button>
                    <Divider sx={{ width: "100%" }} flexItem>
                        <Chip label="or" size="small" />
                    </Divider>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleOpenModal}
                        sx={{
                            color: "#f5f5f5",
                            bgcolor: "#152c5b"
                        }}
                    >
                        Book Now
                    </Button>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openModal}
                        onClose={handleCloseModal}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                        }}
                    >
                        <Fade in={openModal}>
                            <Box sx={style}>
                                <Box mt={3} p={2} sx={{ height: '65vh', minWidth: "35vw", backgroundColor: '#f5f5f5', borderRadius: 2, }}>
                                    {/* Booking Section */}
                                    <Box sx={{ width: '100%' }} mb={4}>
                                        <Stepper activeStep={activeStep}>
                                            {steps.map((label, index) => {
                                                const stepProps = {};
                                                const labelProps = {};
                                                return (
                                                    <Step key={label} {...stepProps}>
                                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                                    </Step>
                                                );
                                            })}
                                        </Stepper>
                                        <React.Fragment>
                                            <Typography sx={{ mt: 2, mb: 4 }}>Step {activeStep + 1}</Typography>
                                            <Box sx={{ height: '45vh' }}>
                                                {activeStep === 0 && (
                                                    <>
                                                        <Stack direction="row" spacing={1} alignItems="center" marginTop={1} mb={2}>
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
                                                        </Stack>
                                                        {/* Guest Selection */}
                                                        <FormControl fullWidth sx={{ mt: 2, mb: 2 }} variant="outlined">
                                                            <InputLabel shrink>Sharing Type</InputLabel>
                                                            <Select
                                                                value={type}
                                                                onChange={(e) => {
                                                                    const selected = e.target.value;
                                                                    setType(selected);
                                                                    setAmount(accomData.sharingRents[selected - 1].rent_amount * slot);
                                                                }}
                                                                size="small"
                                                                label="Sharing Type"
                                                            >
                                                                {[1, 2, 3, 4].map((num) => (
                                                                    <MenuItem key={num} value={num}>
                                                                        {num}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl fullWidth sx={{ mt: 0, mb: 2 }} variant="outlined">
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    display: "flex",
                                                                    justifyContent: "flex-end", // Aligns text to the right
                                                                    color: "green",
                                                                    animation: "blinker 1.5s linear infinite",
                                                                    "@keyframes blinker": {
                                                                        "50%": { opacity: 0.2 }, // Blinking effect
                                                                    },
                                                                }}
                                                                mb={1}
                                                            >
                                                                Available: {accomData?.sharingRents?.[type - 1]?.available_slots ?? "N/A"}
                                                            </Typography>

                                                            <TextField
                                                                value={slot}
                                                                type="number"
                                                                onChange={(e) => {
                                                                    let selectedGuests = Number(e.target.value);
                                                                    const availableSlots = accomData?.sharingRents?.[type - 1]?.available_slots ?? 1; // Ensure a valid number

                                                                    if (selectedGuests < 1) {
                                                                        selectedGuests = 1;
                                                                    }
                                                                    if (selectedGuests > availableSlots) {
                                                                        selectedGuests = availableSlots;
                                                                    }

                                                                    setSlot(selectedGuests);
                                                                    setAmount((accomData?.sharingRents?.[type - 1]?.rent_amount ?? 0) * selectedGuests);
                                                                }}
                                                                size="small"
                                                                label="No of Beds"
                                                                inputProps={{ min: 1 }}
                                                            />
                                                        </FormControl>

                                                        {/* Payment Method Selection */}
                                                        <FormControl fullWidth sx={{ mt: 2, mb: 2 }} variant="outlined">
                                                            <InputLabel shrink>Payment Method</InputLabel>
                                                            <Select
                                                                value={paymentMethod}
                                                                onChange={(e) => {
                                                                    setPaymentMethod(e.target.value);

                                                                }}
                                                                size="small"
                                                                label="Payment Method"
                                                            >
                                                                <MenuItem value="QR">QR</MenuItem>
                                                                <MenuItem value="UPI">UPI</MenuItem>
                                                                <MenuItem value="Card">Credit/Debit Card</MenuItem>
                                                                <MenuItem value="Cash">Cash</MenuItem>
                                                            </Select>
                                                        </FormControl>

                                                        <Box sx={{ width: "100%" }} display={'flex'} justifyContent={'space-between'} mt={1} mb={2}>
                                                            <Typography variant="subtitle1" fontWeight="bold">
                                                                Total price
                                                                <Box display="flex" alignItems="center" gap={0.5} >
                                                                    <Typography variant="body2" color="gray" sx={{ fontSize: 10 }}>
                                                                        Including taxes & fees
                                                                    </Typography>
                                                                    <Tooltip title="Includes all applicable taxes and service charges">
                                                                        <InfoOutlined fontSize="small" sx={{ color: "gray", cursor: "pointer" }} />
                                                                    </Tooltip>
                                                                </Box>
                                                            </Typography>
                                                            <Box display="flex" alignItems="center" gap={1}>
                                                                <Typography variant="h5" fontWeight="bold">
                                                                    &#8377; {amount || "N/A"}
                                                                </Typography>
                                                            </Box>
                                                        </Box>

                                                    </>
                                                )}
                                                {activeStep === 1 && (
                                                    <>
                                                        {/* QR Code for Payment */}
                                                        <Box display="flex" flexDirection="column" alignItems="center" mt={2} sx={{ minWidth: "35vw" }}>
                                                            <Typography variant="h6" mb={1}>Scan QR to Pay</Typography>
                                                            <QRCodeCanvas
                                                                value={`upi://pay?pa=8098167783@ptsbi&pn=StayEasy&am=${amount || "0"}&cu=INR`}
                                                                size={150}
                                                            />
                                                            <Typography variant="h6">&#8377; {amount || "N/A"}</Typography>
                                                            <Box>
                                                                <Typography variant="h6">
                                                                    Payment Status:{" "}
                                                                    <Typography
                                                                        component="span"
                                                                        variant="body1"
                                                                        sx={{
                                                                            color,
                                                                            animation: status === "Pending" ? "blinking 1s infinite" : "none"
                                                                        }}
                                                                    >
                                                                        {status}
                                                                    </Typography>
                                                                </Typography>

                                                                {/* Blinking effect */}
                                                                <style>
                                                                    {`@keyframes blinking {
                                                                0% { opacity: 1; }
                                                                50% { opacity: 0.5; }
                                                                100% { opacity: 1; }
                                                            }`}
                                                                </style>
                                                            </Box>
                                                        </Box>
                                                    </>
                                                )}
                                                {activeStep === 2 && (
                                                    <Box ml={2} mr={2} >
                                                        <Typography variant="h6" sx={{ mb: 2 }} >Booking Overview</Typography>

                                                        {/* Check-in & Check-out Dates */}
                                                        <Typography variant="subtitle1" display={'flex'} justifyContent={'space-between'}><strong>Check-in:</strong> {checkIn.format("DD/MM/YYYY HH:mm")}</Typography>
                                                        <Typography variant="subtitle1" display={'flex'} justifyContent={'space-between'}><strong>Check-out:</strong> {checkOut.format("DD/MM/YYYY HH:mm")}</Typography>

                                                        {/* Number of Guests */}
                                                        <Typography variant="subtitle1" display={'flex'} justifyContent={'space-between'}><strong>Sharing:</strong> {type} Sharing</Typography>

                                                        <Typography variant="subtitle1" display={'flex'} justifyContent={'space-between'}><strong>Slots:</strong> {slot} Slots</Typography>

                                                        {/* Payment Method */}
                                                        <Typography variant="subtitle1" display={'flex'} justifyContent={'space-between'}><strong>Payment Method:</strong> {paymentMethod}</Typography>

                                                        {/* Total Price */}
                                                        <Box sx={{ width: "100%" }} display={'flex'} justifyContent={'space-between'} mt={1} mb={2}>
                                                            <Typography variant="subtitle1" fontWeight="bold">
                                                                Total price
                                                                <Box display="flex" alignItems="center" gap={0.5} >
                                                                    <Typography variant="body2" color="gray" sx={{ fontSize: 10 }}>
                                                                        Including taxes & fees
                                                                    </Typography>
                                                                    <Tooltip title="Includes all applicable taxes and service charges">
                                                                        <InfoOutlined fontSize="small" sx={{ color: "gray", cursor: "pointer" }} />
                                                                    </Tooltip>
                                                                </Box>
                                                            </Typography>
                                                            <Box display="flex" alignItems="center" gap={1}>
                                                                <Typography variant="h5" fontWeight="bold">
                                                                    &#8377; {amount || "N/A"}
                                                                </Typography>
                                                            </Box>
                                                        </Box>

                                                        {/* Payment Status */}
                                                        <Typography variant="h6" display={'flex'} justifyContent={'space-between'}>
                                                            Payment Status:{" "}
                                                            <Typography
                                                                component="span"
                                                                variant="body1"
                                                                sx={{
                                                                    color: status === "Pending" ? "orange" : "green",
                                                                    animation: status === "Pending" ? "blinking 1s infinite" : "none"
                                                                }}
                                                            >
                                                                {status}
                                                            </Typography>
                                                        </Typography>

                                                        {/* Blinking effect for "Pending" status */}
                                                        <style>
                                                            {`
                                                    @keyframes blinking {
                                                        0% { opacity: 1; }
                                                        50% { opacity: 0.5; }
                                                        100% { opacity: 1; }
                                                    }
                                                `}
                                                        </style>
                                                    </Box>
                                                )}

                                            </Box>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                            }} >
                                                <Button
                                                    color="inherit"
                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}
                                                    startIcon={<KeyboardArrowLeft />}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Back
                                                </Button>
                                                <Box sx={{ flex: '1 1 auto' }} />
                                                <Button onClick={handleNext} variant="contained" endIcon={<KeyboardArrowRight />} size="small">
                                                    {activeStep === steps.length - 1 ? 'Book Now' : 'Next'}
                                                </Button>
                                            </Box>
                                        </React.Fragment>
                                    </Box>
                                </Box>
                            </Box>
                        </Fade>
                    </Modal>
                </Card>
            </Box>
            {/* Room Options */}
            <Typography variant="h6" mt={2} mb={2} fontWeight={'bold'}>Room Options</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: "center", justifyContent: 'left' }}>
                {accomData.sharingRents && accomData.sharingRents.length > 0 ? (
                    accomData.sharingRents.map((rent) => (
                        <Box key={rent.id} sx={{ width: "30%", mt: 0, display: 'flex', alignItems: 'center', flexWrap: 'wrap', background: "#e1f5fe80", borderRadius: "10px" }}>
                            <CardContent>
                                <Box width={"300px"} display={'flex'} justifyContent={'space-between'} >
                                    <Typography variant="h6">{rent.sharing_type} Sharing</Typography>
                                    <Typography variant="h6"><strong style={{ fontSize: "15px" }}>Available:{rent.available_slots}</strong> </Typography>
                                </Box>
                                <Typography variant="body2" color="textSecondary">Best price for this type</Typography>
                                <Typography variant="h5" mt={1}>&#8377; {rent.rent_amount} / month</Typography>
                            </CardContent>
                        </Box>
                    ))
                ) : (
                    <Typography>No room options available</Typography>
                )}
            </Box>

            <Box mt={3}>
                {/* Title */}
                <Typography variant="h6" gutterBottom fontWeight={'bold'}>
                    Ratings and Reviews
                </Typography>

                <Box display={'flex'} width={"70%"} border={1} borderColor={'gray'} justifyContent={'space-between'}>
                    <Box display="flex" alignItems="center" justifyContent={'center'} gap={1} flex={1}>
                        <Typography variant="h4" sx={{ backgroundColor: "#4CAF50", color: "#fff", padding: "6px 12px", borderRadius: "5px" }}>
                            {ratingsData.averageRating}★
                        </Typography>
                        <Typography variant="body1">FAIR</Typography>
                        <Typography variant="body2">{ratingsData.totalReviews} ratings</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box flex={1} display="flex" alignItems="center" justifyContent={'center'} gap={1}>
                        <Box>
                            {ratingsData.ratingBreakdown.map((percentage, index) => (
                                <Box key={index} display="flex" alignItems="center" mt={1} fl>
                                    <Typography variant="body2">{5 - index} ★</Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={percentage}
                                        sx={{ width: "100px", margin: "0 10px" }}
                                    />
                                    <Typography variant="body2">{percentage}%</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
                {/* Reviews List */}
                {accomData.reviews && accomData.reviews.length > 0 ? (
                    <List sx={{ mt: 2 }}>
                        {accomData.reviews.slice(0, 5).map((review) => (
                            <ListItem key={review.id} alignItems="flex-start">
                                <Avatar src={review.user_avatar || "/default-avatar.png"} sx={{ width: 48, height: 48, mr: 2 }} />
                                <Box width={"60%"}>
                                    {/* User Name & Date */}
                                    <Typography fontWeight="bold">{review.user_name || "Anonymous User"}</Typography>
                                    <Typography variant="body2" color="text.secondary">{review.review_date}</Typography>

                                    {/* Review Text */}
                                    <Typography variant="body1" mt={1}>
                                        {review.review_text || "No comment provided"}
                                    </Typography>

                                    {/* Review Image (if available) */}
                                    {review.review_image && (
                                        <Box mt={1}>
                                            <img src={review.review_image} alt="Review" style={{ width: 100, borderRadius: 5 }} />
                                        </Box>
                                    )}
                                </Box>
                                {/* Rating */}
                                <Box>
                                    <Typography sx={{ backgroundColor: "#4CAF50", color: "#fff", padding: "3px 6px", borderRadius: "5px" }}>
                                        {review.rating} ★
                                    </Typography>
                                </Box>
                            </ListItem>

                        ))}
                    </List>
                ) : (
                    <Typography>No reviews available</Typography>
                )}
            </Box>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container >
    );
}

export default Details;
