import React, { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import axios from "axios";
import _ from "lodash";
import "./Ginput.css";
import SearchResults from "./SearchResults";

function Ginput({setSubmitFlag,setFirstGame,setSecondGame}) {
  const [game1, setGame1] = useState("");
  const [game2, setGame2] = useState("");
  const [searchResult1, setSearchResult1] = useState([]);
  const [searchResult2, setSearchResult2] = useState([]);
  const [validGame1, setValidGame1] = useState(false);
  const [validGame2, setValidGame2] = useState(false);

  useEffect(() => {
    // Clear MongoDB collection on component mount
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
      // Handle finalize logic here
      console.log('Choices finalized:', game1, game2);
      try {
        const response = await axios.post('http://localhost:3001/api/mongoadd', {
          game1, game2
        });
        setFirstGame(game1)
        setSecondGame(game2)
        setSubmitFlag(true)
        
      } catch (error) {
        console.error('Error fetching data from IGDB:', error);
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
    setValidGame(false); // Reset validity on input change
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
    <div className="Ginput">
      <TextField
        variant="outlined"
        InputProps={{
          style: {
            backgroundColor: "white",
          },
        }}
        value={game1}
        onChange={(event) =>
          handleType(event.target.value, setGame1, setSearchResult1, setValidGame1)
        }
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
          },
        }}
        value={game2}
        onChange={(event) =>
          handleType(event.target.value, setGame2, setSearchResult2, setValidGame2)
        }
      />
      {game2.length > 2 && searchResult2.length > 0 && (
        <SearchResults
          searchResult={searchResult2}
          onResultClick={(result) => handleResultClick(result, setGame2, setSearchResult2, setValidGame2)}
        />
      )}

      <Button
        variant="outlined"
        style={{
          backgroundColor: "white",
        }}
        onClick={() => handleSubmit(game1, game2)}
        disabled={isButtonDisabled()} // Disable based on validity and empty fields
      >
        Finalize Choices
      </Button>
    </div>
  );
}

export default Ginput;
