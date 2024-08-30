import React, { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import axios from "axios";
import _ from "lodash";
import "./Ginput.css";
import SearchResults from "./SearchResults";

function Ginput() {
  const [game1, setGame1] = useState("");
  const [game2, setGame2] = useState("");
  const [searchResult1, setSearchResult1] = useState([]);
  const [searchResult2, setSearchResult2] = useState([]);

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

  const handleType = (value, setGameData, setSearchResult) => {
    const formattedValue = capitalizeAfterSpace(value);
    setGameData(formattedValue);
    if (formattedValue.length > 2) {
      debouncedFetchSearchData(formattedValue, setSearchResult);
    } else {
      setSearchResult([]); // Clear results if the input is too short
    }
  };

  const handleResultClick = (result, setGameData, setSearchResult) => {
    setGameData(result); // Update text field with the clicked result
    setSearchResult([]); // Clear search results
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
          handleType(event.target.value, setGame1, setSearchResult1)
        }
      />
      {game1.length > 2 && searchResult1.length > 0 && (
        <SearchResults
          searchResult={searchResult1}
          onResultClick={(result) => handleResultClick(result, setGame1, setSearchResult1)}
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
          handleType(event.target.value, setGame2, setSearchResult2)
        }
      />
      {game2.length > 2 && searchResult2.length > 0 && (
        <SearchResults
          searchResult={searchResult2}
          onResultClick={(result) => handleResultClick(result, setGame2, setSearchResult2)}
        />
      )}

      <Button
        variant="outlined"
        style={{
          backgroundColor: "white",
        }}
        // onClick={handleSubmit}
      >
        Finalize Choices
      </Button>
    </div>
  );
}

export default Ginput;
