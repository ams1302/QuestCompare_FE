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
  Skeleton,
} from "@mui/material";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, useAnimation } from "framer-motion";

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
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(true);

  const controls = useAnimation();

  useEffect(() => {
    const fetchLatestGames = async () => {
      try {
        const delay = 2000; // 2 seconds delay
        const timeoutId = setTimeout(async () => {
          try {
            const response = await axios.get("http://localhost:3001/api/latest-games");
            setLatestGames(response.data);
            setLoading(false);
            controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
          } catch (error) {
            console.error("Error fetching latest games:", error);
            setLoading(false);
          }
        }, delay);

        return () => clearTimeout(timeoutId);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchLatestGames();
  }, [controls]);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setAiResponse("");
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
    <Grid container spacing={3} sx={{ height: "100vh", bgcolor: "#1e1e1e", p: 2 }}>
      {loading ? (
        [1, 2].map((_, index) => (
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
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton width="60%" height={30} />
                  <Skeleton width="80%" height={20} />
                  <Skeleton width="70%" height={20} />
                  <Skeleton width="80%" height={20} />
                  <Skeleton width="90%" height={20} />
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))
      ) : (
        latestGames.map((game, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Box sx={{ p: 2, height: "100%" }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                transition={{ duration: 0.8 }}
              >
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
                    image={game.cover_url.replace("t_thumb", "t_1080p").replace("//", "https://")}
                    alt={game.name}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div" sx={{ color: "white", fontWeight: "bold", mb: 1 }}>
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
                    {game.screenshot_urls && game.screenshot_urls.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" component="div" gutterBottom sx={{ color: "white", mb: 2 }}>
                          Screenshots
                        </Typography>
                        <Slider {...sliderSettings}>
                          {game.screenshot_urls.map((url, index) => (
                            <Box key={index} sx={{ display: "flex", justifyContent: "center" }}>
                              <img
                                src={url.replace("t_thumb", "t_1080p").replace("//", "https://")}
                                alt={`Screenshot ${index + 1}`}
                                style={{
                                  maxWidth: "100%",
                                  width: "100%",
                                  height: "auto",
                                  borderRadius: "8px",
                                  transition: "transform 0.5s ease-in-out",
                                }}
                              />
                            </Box>
                          ))}
                        </Slider>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          </Grid>
        ))
      )}

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
                transition: "background-color 0.3s ease-in-out",
              }}
              onClick={handleClickOpen}
            >
              Can't make a decision yet? Use AI to help you out
            </Button>
          </Box>
        </Grid>
      )}

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
        <DialogTitle sx={{ color: "white", fontWeight: "bold" }}>AI Assistance</DialogTitle>
        <DialogContent>
          {aiResponse ? (
            <Box
              sx={{
                backgroundColor: "#333",
                color: "white",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
              }}
            >
              {aiResponse}
            </Box>
          ) : (
            <TextField
              fullWidth
              multiline
              rows={5}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Eg: I want to play a game with a sci-fi setting"
              variant="outlined"
              sx={{
                backgroundColor: "#E1D9D1",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: "#e13661",
              "&:hover": {
                backgroundColor: "#f8f8f8",
              },
            }}
          >
            Cancel
          </Button>
          {!aiResponse && (
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                backgroundColor: "#e13661",
                color: "white",
                "&:hover": {
                  backgroundColor: "#a11477",
                },
                transition: "background-color 0.3s ease-in-out",
              }}
            >
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Gdisplay;
