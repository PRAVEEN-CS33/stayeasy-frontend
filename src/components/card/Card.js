import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box, Chip, Rating } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

import pgimg from '../../assets/pg.jpg';

const PGCard = ({ name, amounts, preferredBy, image, handleCardClick, row }) => {

  const [isFav, setFav] = useState(false);

  const handleClick = () => {
    setFav(!isFav);
  };

  return (
    <Card
      sx={{
        maxWidth: 320,
        width: '100%',
        borderRadius: 4,
        boxShadow: 3
      }}
      onClick={() => handleCardClick(row)}
    >
      {/* Image & Favorite Icon */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="180"
          image={pgimg}
          alt={name}
          sx={{ borderRadius: "4px 4px 0 0" }}
        />
        <FavoriteIcon
          sx={{
            color: isFav ? "red" : "white",
            position: "absolute",
            top: 8,
            right: 8,
            // background:,
            borderRadius: "50%",
            padding: 0.5,
            fontSize: 22,
          }}
          onClick={handleClick}
        />
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
      </Box>

      <CardContent>
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
        <Box display="flex" alignItems="center">
          <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
          <Typography variant="body2" sx={{ marginLeft: 1, fontWeight: 500 }}>
            12k reviews
          </Typography>
        </Box>

        {/* Amount Section */}
        <Typography variant="body2" color="gray" sx={{ marginTop: 1 }}>
          Starts at
        </Typography>

        {/* Check if amounts exist */}
        {amounts?.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {/* {amounts.map((rent, index) => ( */}
            <div style={{ textAlign: "center", minWidth: "80px" }}>
              <Typography variant="h7" fontWeight="">
                ₹{amounts[0].rent_amount}
              </Typography>
            </div>
            {/* // ))} */}
          </div>
        ) : (
          <Typography variant="body2" color="gray">
            Rent details not available
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PGCard;
