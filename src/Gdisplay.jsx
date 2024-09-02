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
import "./Gdisplay.css"

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

const colors = [
   // Deep Purple
  "#4CAF50", // Green
  "#2196F3", // Blue
  "#E91E63", // Pink
  "#FFC107", // Amber
  "#009688", // Teal
  "#673AB7", // Indigo
  "#3F51B5", // Indigo Blue
  "#FF5722", // Deep Orange
  "#00BCD4", // Cyan
  "#9C27B0", // Purple
];

const getPlatformColor = (platform) => {
  if (platform.toLowerCase().includes('xbox')) {
    return '#107C10'; // Green
  } else if (platform.toLowerCase().includes('playstation')) {
    return '#003791'; // Blue
  } else if (platform.toLowerCase().includes('nintendo')) {
    return '#E60012'; // Red
  } else if (platform.toLowerCase().includes('pc')) {
    return '#171a21'; // Grey
  } else {
    return '#333'; // Default color
  }
};

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

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
                  <CardContent sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        display: "inline-block",
                        bgcolor: "#00c853",
                        color: "white",
                        borderRadius: "4px",
                        padding: "8px 12px", // Increased padding for better prominence
                        fontWeight: "bold",
                        fontSize: "1.2rem", // Increased font size for better visibility
                        mb: 1,
                      }}
                    >
                      {Math.round(game.rating)}
                    </Box>
                    <Typography variant="h5" component="div" sx={{ color: "white", fontWeight: "bold", mb: 1 }}>
                      {game.name}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          justifyContent: "left",
                        }}
                      > <Typography variant="body1" sx={{ color: "white", mb: 0.5, fontWeight: "bold" }}>
                      Genres:
                    </Typography>
                        {game.genre_names.map((genre, i) => (
                          <Box
                            key={i}
                            sx={{
                              bgcolor: getRandomColor(),
                              color: "white",
                              borderRadius: "16px",
                              padding: "4px 8px",
                              fontSize: "0.9rem",
                              fontWeight: "bolder",
                            }}
                          >
                            {genre}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          justifyContent: "left",
                        }}
                      >

<Typography variant="body1" sx={{ color: "white", mb: 0.5, fontWeight: "bold",justifyContent:"left" }}>
                        Themes:
                      </Typography>
                        {game.themes.map((theme, i) => (
                          <Box
                            key={i}
                            sx={{
                              bgcolor: getRandomColor(),
                              color: "white",
                              borderRadius: "16px",
                              padding: "4px 8px",
                              fontSize: "0.9rem",
                              fontWeight: "bolder",
                            }}
                          >
                            {theme}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          justifyContent: "left",
                        }}
                      >
                        <Typography variant="body1" sx={{ color: "white", mb: 0.5, fontWeight: "bold" }}>
                        Release Date:
                      </Typography>
                        <Box
                          sx={{
                            bgcolor: "#673AB7",
                            color: "white",
                            borderRadius: "16px",
                            padding: "4px 8px",
                            fontSize: "0.9rem",
                            fontWeight: "bolder",
                          }}
                        >
                          
                          {game.release_date || "N/A"}
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          justifyContent: "left",
                        }}
                      >
                        <Typography variant="body1" sx={{ color: "white", mb: 0.5, fontWeight: "bold" }}>
                        Modes:
                      </Typography>
                        {(game.game_mode || []).map((mode, i) => (
                          <Box
                            key={i}
                            sx={{
                              bgcolor: getRandomColor(),
                              color: "white",
                              borderRadius: "16px",
                              padding: "4px 8px",
                              fontSize: "0.9rem",
                              fontWeight: "bolder",
                            }}
                          >
                            {mode}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          justifyContent: "left",
                        }}
                      ><Typography variant="body1" sx={{ color: "white", mb: 0.5, fontWeight: "bold" }}>
                      Developers:
                    </Typography>
                        <Box
                          sx={{
                            bgcolor: '#6A1B9A',
                            color: "white",
                            borderRadius: "16px",
                            padding: "4px 8px",
                            fontSize: "0.9rem",
                            fontWeight: "bolder",
                            
                          }}
                        >
                          {game.developer || "N/A"}
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "left" }}>
  <Typography variant="body1" sx={{ color: "white", mb: 0.5, fontWeight: "bold" }}>
    Platforms:
  </Typography>
  {game.platform_names.map((platform, i) => (
    <Box
      key={i}
      
      sx={{
        bgcolor: getPlatformColor(platform),
        color: "white",
        borderRadius: "16px",
        padding: "4px 8px",
        fontSize: "0.9rem",
        fontWeight: "bolder",
      }}
    >
      {platform}
    </Box>
  ))}
</Box>
                    {game.screenshot_urls && game.screenshot_urls.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" component="div" gutterBottom sx={{ color: "white", mb: 1 }}>
                          Screenshots
                        </Typography>
                        <Slider {...sliderSettings}>
                          {game.screenshot_urls.map((url, i) => (
                            <Box
                              key={i}
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                bgcolor: "#2c2c2c",
                                p: 2,
                              }}
                            >
                              <img
                                src={url.replace("t_thumb", "t_1080p").replace("//", "https://")}
                                alt={`Screenshot ${i}`}
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "400px",
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
                fontFamily: '"Bungee", sans-serif',
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
            color: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
          Get AI Assistance
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            placeholder="Eg: I want to play a First-Person Game"
            type="text"
            fullWidth
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{
              bgcolor: "white",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#e13661",
                },
                "&:hover fieldset": {
                  borderColor: "#a11477",
                },
              },
            }}
          />
          {aiResponse && (
            <Box sx={{ mt: 2, bgcolor: "#1e1e1e", p: 2, borderRadius: "8px" }}>
              <Typography>{aiResponse}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "#e13661",
              backdropFilter: "blur(10px)",
              color: "white",
              padding: "8px 20px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#a11477",
              },
              transition: "background-color 0.3s ease-in-out",
            }}
          >
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#e13661",
              backdropFilter: "blur(10px)",
              color: "white",
              padding: "8px 20px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#a11477",
              },
              transition: "background-color 0.3s ease-in-out",
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Gdisplay;
