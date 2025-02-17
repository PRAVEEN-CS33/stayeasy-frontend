import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../components/filter/filter.css'
import "./home.css";
import { Box, MenuItem, Select, FormControl, TextField, Button } from "@mui/material";
import { CalendarMonth, Person, LocationOn, Star, MonetizationOn, People } from "@mui/icons-material";
import PGCard from "../../components/card/Card";
import { Typography } from "@mui/material";
import { AccommodationService } from "../../services/api";


function Home() {
  const [accommodations, setAccommodations] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    location: "",
    reviews: "",
    rentRange: "",
    preferredBy: "",
  });

  const handleFilter = async(event) => {
    try{
      const response = await AccommodationService.filter(filters);
      setAccommodations(response.data);
    }catch(e){
      console.error(e);
    }
  };

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AccommodationService.getAll();
        setAccommodations(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  
  const handleCardClick = (accom) => {
    localStorage.setItem("selectedAccom", JSON.stringify(accom));
    window.open("/details", "_blank");
  };

  return (
    <div className="home">
      <div className="filterRectangle">
        <Box display="flex" justifyContent="center" alignItems="center" gap={2} flexWrap="">

          {/* Check Availability - Date Picker */}
          <FormControl className="filterItem">
            <Box display="flex" alignItems="center" gap={1}>
              <CalendarMonth sx={{ color: "#152c5b", padding: '5px' }} />
              <TextField
                type="date"
                name="date"
                value={filters.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={{ width: 140, backgroundColor: "white", borderRadius: 5 }}
              />
            </Box>
          </FormControl>

          {/* Location */}
          <FormControl className="filterItem"  >
            <Box display="flex" alignItems="center" gap={1}>
              <LocationOn sx={{ color: "#152c5b" }} />
              <Select
                name="location"
                value={filters.location}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="">Location</MenuItem>
                <MenuItem value="bangolore">Bangolore</MenuItem>
                <MenuItem value="salem">Salem</MenuItem>
                <MenuItem value="coimbatore">Coimbatore</MenuItem>
              </Select>
            </Box>
          </FormControl>

          {/* Number of Persons */}
          {/* <FormControl className="filterItem">
            <Box display="flex" alignItems="center" gap={1}>
              <Person sx={{ color: "#152c5b" }} />
              <Select name="persons" value={filters.persons} onChange={handleChange} >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4+</MenuItem>
              </Select>
            </Box>
          </FormControl> */}

          {/* Reviews */}
          <FormControl className="filterItem">
            <Box display="flex" alignItems="center" gap={1}>
              <Star sx={{ color: "#FFC107" }} />
              <Select name="reviews" value={filters.reviews} onChange={handleChange} displayEmpty>
                <MenuItem value="">Reviews</MenuItem>
                <MenuItem value="1">1 Star</MenuItem>
                <MenuItem value="2">2 Stars</MenuItem>
                <MenuItem value="3">3 Stars</MenuItem>
                <MenuItem value="4">4 Stars</MenuItem>
                <MenuItem value="5">5 Stars</MenuItem>
              </Select>
            </Box>
          </FormControl>

          {/* Rent Range */}
          <FormControl className="filterItem">
            <Box display="flex" alignItems="center" gap={1}>
              <MonetizationOn sx={{ color: "#4CAF50" }} />
              <Select name="rentRange" value={filters.rentRange} onChange={handleChange} displayEmpty>
                <MenuItem value="">Rent Range</MenuItem>
                <MenuItem value="5000">₹0 - ₹5000</MenuItem>
                <MenuItem value="10000">₹5000 - ₹10,000</MenuItem>
              </Select>
            </Box>
          </FormControl>

          {/* Preferred By */}
          <FormControl className="filterItem">
            <Box
              display="flex"
              alignItems="center"
              gap={1}
            >
              <People sx={{ color: "#152c5b" }} />
              <Select
                name="preferredBy"
                value={filters.preferredBy}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="">Preferred By</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="colive">Co-Live</MenuItem>
              </Select>
            </Box>
          </FormControl>

          {/* Search Button */}
          <Button variant="contained" className="searchButtonn" onClick={handleFilter}>
            Search
          </Button>

        </Box>
      </div>

      <div className="parentCards">
        {accommodations?.length > 0 ? (
          accommodations.map((accom) => (
            <PGCard
              key={accom.accommodation_id}
              name={accom.accommodation_name}
              amounts={accom.sharingRents}
              preferredBy={accom.preferred_by}
              handleCardClick={handleCardClick}
              row={accom}
            />
          ))
        ) : (
          <Typography variant="body2" color="gray">
            No accommodations available
          </Typography>
        )}
      </div>
    </div>
  );
}

export default Home;
