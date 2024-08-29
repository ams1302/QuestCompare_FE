import React from "react";
import './SearchResults.css';

function SearchResults({ searchResult, onResultClick }) {
    return (
        <div className="results-list">
            {searchResult.length > 0 ? (
                searchResult.map((result, id) => (
                    <div
                      key={id}
                      className="result-item"
                      onClick={() => onResultClick(result)}
                    >
                      {result}
                    </div>
                ))
            ) : (
                <div>No results found</div>
            )}
        </div>
    );
}

export default SearchResults;
