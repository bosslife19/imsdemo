import React, { useState } from 'react';
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

function Search({ Searchstyle, searchText }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleIconClick = () => {
        performSearch();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    };

    const performSearch = () => {
        if (searchQuery.trim() !== "") {
            navigate(`/search/${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className={`sideNavSearchBarContainer ${Searchstyle}`}>
            <FontAwesomeIcon
                icon={faSearch}
                className="sideNavSearchIcon"
                onClick={handleIconClick}
            />
            <input
                type="text"
                placeholder={searchText}
                className="sideNavSearchBar"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

export default Search;
