import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import axios from "axios";
import _ from "lodash";
import "./Ginput.css";
import SearchResults from "./SearchResults";

function Ginput({ setSubmitFlag, setFirstGame, setSecondGame, setShowNextComponent }) {
  const [game1, setGame1] = useState("");
  const [game2, setGame2] = useState("");
  const [searchResult1, setSearchResult1] = useState([]);
  const [searchResult2, setSearchResult2] = useState([]);
  const [validGame1, setValidGame1] = useState(false);
  const [validGame2, setValidGame2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    const clearData = async () => {
      try {
        await axios.post('http://localhost:3001/api/clear');
        console.log('Database cleared');
      } catch (error) {
        console.error('Error clearing database:', error);
      }
    };

    clearData();
  }, []);

  const fetchSearchData = async (gameName, setSearchResult) => {
    try {
      const response = await axios.post('http://localhost:3001/api/games', {
        gameName
      });
      setSearchResult(response.data);
    } catch (error) {
      console.error('Error fetching data from IGDB:', error);
    }
  };

  const handleSubmit = async (game1, game2) => {
    if (!isButtonDisabled()) {
      setLoading(true);
      setButtonClicked(true);
      console.log('Choices finalized:', game1, game2);
      try {
        await axios.post('http://localhost:3001/api/mongoadd', {
          game1, game2
        });
        setFirstGame(game1);
        setSecondGame(game2);
        setSubmitFlag(true);
        // Trigger to show next component
        setShowNextComponent(true);
      } catch (error) {
        console.error('Error fetching data from IGDB:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const debouncedFetchSearchData = useCallback(
    _.debounce((gameName, setSearchResult) => {
      fetchSearchData(gameName, setSearchResult);
    }, 300),
    []
  );

  const capitalizeAfterSpace = (str) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleType = (value, setGameData, setSearchResult, setValidGame) => {
    const formattedValue = capitalizeAfterSpace(value);
    setGameData(formattedValue);
    if (formattedValue.length > 2) {
      debouncedFetchSearchData(formattedValue, setSearchResult);
    } else {
      setSearchResult([]);
    }
    setValidGame(false);
  };

  const handleResultClick = (result, setGameData, setSearchResult, setValidGame) => {
    setGameData(result.name);
    setSearchResult([]);
    setValidGame(true);
  };

  const isButtonDisabled = () => {
    return !validGame1 || !validGame2 || game1.trim() === "" || game2.trim() === "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="Ginput"
    >
      <TextField
        variant="outlined"
        InputProps={{
          style: {
            backgroundColor: "white",
            borderRadius: "8px",
          },
        }}
        value={game1}
        onChange={(event) =>
          handleType(event.target.value, setGame1, setSearchResult1, setValidGame1)
        }
        fullWidth
        placeholder="Enter a video game (e.g., Sekiro, Bloodborne)"
        margin="normal"
      />
      {game1.length > 2 && searchResult1.length > 0 && (
        <SearchResults
          searchResult={searchResult1}
          onResultClick={(result) => handleResultClick(result, setGame1, setSearchResult1, setValidGame1)}
        />
      )}

      <TextField
        variant="outlined"
        InputProps={{
          style: {
            backgroundColor: "white",
            borderRadius: "8px",
          },
        }}
        value={game2}
        onChange={(event) =>
          handleType(event.target.value, setGame2, setSearchResult2, setValidGame2)
        }
        fullWidth
        placeholder="Enter a video game (e.g., Sekiro, Bloodborne)"
        margin="normal"
      />
      {game2.length > 2 && searchResult2.length > 0 && (
        <SearchResults
          searchResult={searchResult2}
          onResultClick={(result) => handleResultClick(result, setGame2, setSearchResult2, setValidGame2)}
        />
      )}
      {isButtonDisabled() && (
  <div style={{
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#282c34', /* Dark background for contrast */
    color: '#61dafb', /* Light blue text color */
    fontSize: '16px',
    textAlign: 'center',
    borderRadius: '5px',
    border: '1px solid #61dafb', /* Matching border color */
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' /* Soft shadow for elevation */
  }}>
    Note: Choose the game from the drop-down search bar
  </div>
)}  

      {!isButtonDisabled() && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ position: 'relative' }}
        >
          {buttonClicked ? (
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                border: "4px solid #e13661",
                borderRadius: "50%",
                borderTop: "4px solid white",
                width: "24px",
                height: "24px",
                animation: "spin 1s linear infinite",
              }}
            ></span>
          ) : (
            <Button
              variant="contained"
              style={{
                backgroundColor: "#e13661",
                color: "white",
                marginTop: "20px",
                borderRadius: "8px",
                position: "relative",
                overflow: "hidden",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
              }}
              onClick={() => handleSubmit(game1, game2)}
              disabled={loading}
            >
              Finalize Choices
            </Button>
          )}
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Ginput;
