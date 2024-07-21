import React from "react";
import { Form } from "react-bootstrap";

const Search = ({ Searchstyle, searchText, onChange }) => {
  return (
    <Form className={Searchstyle}>
      <Form.Control
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={onChange}
      />
    </Form>
  );
};

export default Search;
