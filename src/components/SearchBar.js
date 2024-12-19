import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';  // For styling

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');  // State for search term

  // Handle input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle Enter key press to trigger search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);  // Call onSearch with the search term
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for videos by hashtag"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button onClick={() => onSearch(searchTerm)}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default SearchBar;
