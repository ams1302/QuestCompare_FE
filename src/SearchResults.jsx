import React from "react";
import './SearchResults.css';

function SearchResults({ searchResult, onResultClick }) {
    return (
        <div className="results-list">
            {searchResult.length > 0 ? (
                searchResult.map((result) => (
                    <div
                      key={result.id} // Use ID for uniqueness
                      className="result-item"
                      onClick={() => onResultClick(result)} // Pass the entire result object
                    >
                      {result.name}
                    </div>
                ))
            ) : (
                <div>No results found</div>
            )}
        </div>
    );
}

export default SearchResults;
