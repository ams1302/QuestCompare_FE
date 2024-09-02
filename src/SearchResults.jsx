import React from "react";
import './SearchResults.css';

function SearchResults({ searchResult, onResultClick }) {
    return (
        <div className="results-list">
            {searchResult.length > 0 ? (
                searchResult.map((result) => (
                    <div
                      key={result.id} 
                      className="result-item"
                      onClick={() => onResultClick(result)} 
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
