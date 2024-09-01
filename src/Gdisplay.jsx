import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Settings for the carousel
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  appendDots: (dots) => (
    <Box sx={{ mt: 2 }}>
      <ul
        style={{
          margin: "0",
          padding: "0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {dots}
      </ul>
    </Box>
  ),
  customPaging: (i) => (
    <Box
      sx={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: "white",
        opacity: "0.7",
        transition: "opacity 0.3s",
        "&:hover": {
          opacity: "1",
        },
      }}
    />
  ),
};

function Gdisplay({ firstGame, secondGame }) {
  const [latestGames, setLatestGames] = useState([]);
  const [open, setOpen] = useState(false); // State to handle modal visibility
  const [inputValue, setInputValue] = useState(""); // State to handle input value
  const [aiResponse, setAiResponse] = useState(""); // State to handle AI response

  useEffect(() => {
    // Fetch the latest two games from the backend
    const fetchLatestGames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/latest-games"
        );
        setLatestGames(response.data);
      } catch (error) {
        console.error("Error fetching latest games:", error);
      }
    };

    fetchLatestGames();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAiResponse(""); // Clear AI response when closing the modal
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/send-to-api", {
        inputValue,
        firstGame,
        secondGame,
      });
      setAiResponse(response.data.result);
    } catch (error) {
      console.error("Error submitting AI request:", error);
    }
  };

  return (
    <Grid
      container
      spacing={3}
      sx={{ height: "100vh", bgcolor: "#1e1e1e", p: 2 }}
    >
      {latestGames.map((game, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Box sx={{ p: 2, height: "100%" }}>
            <Card
              sx={{
                height: "100%",
                bgcolor: "#2c2c2c",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: "auto",
                  maxHeight: 400,
                  objectFit: "contain",
                  borderBottom: "1px solid #444",
                }}
                image={game.cover_url
                  .replace("t_thumb", "t_1080p")
                  .replace("//", "https://")}
                alt={game.name}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ color: "white", fontWeight: "bold", mb: 1 }}
                >
                  {game.name}
                </Typography>
                <Typography variant="body1" sx={{ color: "white", mb: 0.5 }}>
                  Rating: {game.rating}
                </Typography>
                <Typography variant="body1" sx={{ color: "white", mb: 0.5 }}>
                  Genres: {game.genre_names.join(", ")}
                </Typography>
                <Typography variant="body1" sx={{ color: "white", mb: 0.5 }}>
                  Themes: {game.themes.join(", ")}
                </Typography>
                <Typography variant="body1" sx={{ color: "white", mb: 0.5 }}>
                  Released: {game.release_date}
                </Typography>
                <Typography variant="body1" sx={{ color: "white", mb: 0.5 }}>
                  Modes: {game.game_mode.join(", ")}
                </Typography>
                <Typography variant="body1" sx={{ color: "white", mb: 0.5 }}>
                  Developer: {game.developer.join(", ")}
                </Typography>
                <Typography variant="body1" sx={{ color: "white", mb: 0.5 }}>
                  Platforms: {game.platform_names.join(", ")}
                </Typography>

                {/* Screenshot Carousel */}
                {game.screenshot_urls && game.screenshot_urls.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="h6"
                      component="div"
                      gutterBottom
                      sx={{ color: "white", mb: 2 }}
                    >
                      Screenshots
                    </Typography>
                    <Slider {...sliderSettings}>
                      {game.screenshot_urls.map((url, index) => (
                        <Box
                          key={index}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <img
                            src={url
                              .replace("t_thumb", "t_1080p")
                              .replace("//", "https://")}
                            alt={`Screenshot ${index + 1}`}
                            style={{
                              maxWidth: "100%",
                              width: "90%",
                              height: "auto",
                              borderRadius: "8px",
                            }}
                          />
                        </Box>
                      ))}
                    </Slider>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        </Grid>
      ))}

      {/* Button to open the modal */}
      {latestGames.length === 2 && (
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#e13661",
                backdropFilter: "blur(10px)",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#a11477",
                },
                height: "100%",
              }}
              onClick={handleClickOpen}
            >
              Can't make a decision yet? Use AI to help you out
            </Button>
          </Box>
        </Grid>
      )}

      {/* Modal structure */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#2c2c2c",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
            minHeight: "40vh",
          },
        }}
      >
        <DialogTitle sx={{ color: "white", fontWeight: "bold" }}>
          Get AI Assistance
        </DialogTitle>
        <DialogContent
          sx={{
            minHeight: "30vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {aiResponse ? (
            <Box
              sx={{
                background: "linear-gradient(135deg, #f44336, #e91e63)",
                color: "white",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #d32f2f",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
                textAlign: "center",
                fontWeight: "bold",
                animation: "fadeIn 1s",
              }}
            >
              <Typography variant="body1">{aiResponse}</Typography>
            </Box>
          ) : (
            <TextField
              autoFocus
              placeholder="I want to play a game in First Person Perspective..."
              margin="dense"
              sx={{
                height: '100%',
              }}
              type="text"
              fullWidth
              variant="outlined"
              InputProps={{
                sx: {
                  bgcolor: "white",
                  borderRadius: "5px",
                  color: "#2c2c2c",
                },
              }}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          {!aiResponse && (
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                backgroundColor: "#e13661",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Submit
            </Button>
          )}
          <Button
            onClick={handleClose}
            sx={{ color: "#a11477", fontWeight: "bold" }}
          >
            {aiResponse ? 'Close' : 'Cancel'}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Gdisplay;
