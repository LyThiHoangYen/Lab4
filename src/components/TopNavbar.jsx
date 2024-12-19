import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch } from '@fortawesome/free-solid-svg-icons';

function TopNavbar() {
  return (
    <div className="top-navbar">
      <FontAwesomeIcon icon={faTv} className="icon" />
      
        Following | <span>For You</span>
      
      <FontAwesomeIcon icon={faSearch} className="icon" />
    </div>
  );
};

export default TopNavbar;
