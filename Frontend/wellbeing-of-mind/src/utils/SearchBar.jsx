import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const [inputValue, setInputValue] = useState(searchQuery);
  const [typingTimeout, setTypingTimeout] = useState(0);

  useEffect(() => {
    // Update search query after debounce timeout
    clearTimeout(typingTimeout);
    setTypingTimeout(setTimeout(() => setSearchQuery(inputValue), 1000));
  }, [inputValue]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <div className="col-md-4 py-2">
      <div className="search">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={inputValue}
          onChange={handleChange}
        />
        <button className="search-icon bg-dark" type="button" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
