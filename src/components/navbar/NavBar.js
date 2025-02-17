import React, { useEffect, useState } from "react";
import { AppBar, Box, Toolbar, Typography, Link, Button, Avatar, Menu, MenuItem, Tooltip, CardMedia } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { deepOrange } from '@mui/material/colors';
import { AuthService } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from '../../assets/logo.png'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  border: `1px solid gray`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    border: `1px solid black`,
  },
  marginLeft: 0,
  marginRight: 10,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole)
      setisLoggedIn(false)
    }
  }, [])

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleLogout = async () => {
    try {
      if (localStorage.getItem("role") === "user") {
        await AuthService.ownerLogout();
        toast.success("User-Logged out successfully!");
      } else {
        await AuthService.ownerLogout();
        toast.success("Owner-Logged out successfully!");
      }
    } catch (e) {
      console.log("error: ", e);
      toast.error("Logout failed! Please try again.");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setRole(null)
      setisLoggedIn(true);
      handleHomeClick();
      handleCloseUserMenu();
    }

  }

  return (
    <AppBar position="fixed" color="default" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Toolbar sx={{ width: '90vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo Section */}
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <CardMedia
            component="img"
            sx={{ height: "40px", borderRadius: "4px 0 0 4px"}}
            image={logo}
            alt="img1"
          />
          <Typography
            variant="h5"
            component="p"
            sx={{
              fontFamily: "'Poppins', Helvetica",
              fontWeight: 500,
              fontSize: 26,
              lineHeight: "normal",
              cursor: 'pointer'
            }}
            onClick={handleHomeClick}
          >
            <Box component="span" sx={{ color: "#3252df" }}>
              Stay
            </Box>
            <Box component="span" sx={{ color: "#152c5b" }}>
              Easy
            </Box>
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 3 }}>
          {role === 'owner' && (
            <>
              <Link href="/owner/admin" sx={{ color: "#152c5b", textDecoration: "none" }}>
                DashBoard
              </Link>
              <Link href="/owner/accommodations" sx={{ color: "#152c5b", textDecoration: "none" }}>
                Accommodations
              </Link>
              <Link href="/owner/bookings" sx={{ color: "#152c5b", textDecoration: "none" }}>
                Bookings
              </Link>
              <Link href="/owner/schedules" sx={{ color: "#152c5b", textDecoration: "none" }}>
                Schedules
              </Link>
            </>
          )}
          {role === 'user' && (
            <>
              <Link href="/home" sx={{ color: "#152c5b", textDecoration: "none" }}>
                Accommodations
              </Link>
              <Link href="/user/bookings" sx={{ color: "#152c5b", textDecoration: "none" }}>
                Bookings
              </Link>
              <Link href="/user/schedules" sx={{ color: "#152c5b", textDecoration: "none" }}>
                Schedules
              </Link>
            </>
          )}
        </Box>

        {/* Login Button */}
        <Box sx={{ display: 'flex' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {isLoggedIn && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#3252df",
                color: "white",
                boxShadow: "0px 0px 16.1px -1px rgba(0, 0, 0, 0.25)",
                textTransform: "none",
                borderRadius: 1,
                fontFamily: "'Poppins', Helvetica",
              }}
              onClick={handleLoginClick}
            >
              Login
            </Button>
          )}
          <Tooltip title="Open settings">
            <Avatar onClick={handleOpenUserMenu} sx={{ bgcolor: deepOrange[500], marginLeft: 2 }}>P</Avatar>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={setting === "Logout" ? handleLogout : handleCloseUserMenu}>
                <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
