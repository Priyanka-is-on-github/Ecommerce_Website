import { useContext, useState } from "react";
// import { PaletteMode } from "@mui/material";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../utils/contextUtils";
// import showAuthenticationContext from "../../utils/contextUtils";

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

function NavigationBar() {
  // const { showAuthentication, setShowAuthenticationContext } = useContext(
  //   showAuthenticationContext
  // );
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  console.log("cart from navbar=", cart, cart.length);

  const handleHomeClick = () => {
    navigate("/");
  };

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor: "white",

              maxHeight: 40,
              border: "1px solid",

              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <img
                onClick={handleHomeClick}
                src={
                  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
                }
                style={logoStyle}
                alt="logo of sitemark"
              />

              <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                    width: "100%",
                    justifyContent: "flex-end",
                  },
                }}
              >
                <MenuItem
                  onClick={() => scrollToSection('/')}
                  sx={{ py: "6px", px: "12px"  }}
                >
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    <Link
                      to="/"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Home
                    </Link>
                  </Typography>
                </MenuItem>

                <MenuItem
                  onClick={() => scrollToSection("products")}
                  sx={{ py: "6px", px: "12px"  }}
                >
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    <Link
                      to="/products"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Products
                    </Link>
                  </Typography>
                </MenuItem>

                <MenuItem
                  onClick={() => scrollToSection("features")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Link to="/cart" className="flex relative">
                    <ShoppingCartIcon
                      color="primary"
                      sx={{ zIndex: "23", bgColor: "white" }}
                    />
                    <span
                      className=" text-red-600 px-1 py-0 absolute top-[-11px] right-[-5px] rounded-full bg-red-100 text-xs"
                      style={{ zIndex: "2" }}
                    >
                      {cart.length ? cart.length : 0}
                    </span>
                  </Link>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <Button color="primary" variant="text" size="small">
                <Link
                  to="/signin"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Sign in
                </Link>
              </Button>
              <Button color="primary" variant="contained" size="small">
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Sign UP
                </Link>
              </Button>
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60vw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,

                      lg:{ 
                        dislpay:'block'
                      }
                    }}
                  >
                   
                  </Box>
                  <MenuItem >
                  <Link to='/'>
                  Home
                  </Link>
                 
                  </MenuItem>
                  <MenuItem >
                  <Link to='/products'>
                  Products
                  </Link>
                   
                  </MenuItem>

                  <Divider />
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      href="/signup"
                      target="_blank"
                      sx={{ width: "100%" }}
                    >
                      Sign up
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      href="/signin"
                      target="_blank"
                      sx={{ width: "100%" }}
                    >
                      Sign in
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default NavigationBar;
