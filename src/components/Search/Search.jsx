import React from 'react'
import "./Search.css";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Search({Searchstyle, searchText, onSearchChange}) {
    return (
        <div className={`sideNavSearchBarContainer ${Searchstyle}`}>
          <FontAwesomeIcon icon={faSearch} className="sideNavSearchIcon" />
           <input type="text" placeholder={searchText} className="sideNavSearchBar" onChange={onSearchChange} />
        </div>
      );
}

export default Search