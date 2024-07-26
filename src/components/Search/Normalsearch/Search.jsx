import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Form } from "react-bootstrap";

const Search = ({ Searchstyle, searchText, onChange }) => {
 
  return (
<div className={`sideNavSearchBarContainer ${Searchstyle}`}>
<FontAwesomeIcon
    icon={faSearch}
    className="sideNavSearchIcon"
 />
<input
    type="text"
    placeholder={searchText}
    className="sideNavSearchBar"
 />
</div>
  );
};

export default Search;
