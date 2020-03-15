import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { InputGroup, FormControl } from 'react-bootstrap';

const Search = (props) => {
  
  return (
    <InputGroup className="search">
      <InputGroup.Prepend>

        <InputGroup.Text id="search-input" className="searchInput">
          <SearchIcon />
        </InputGroup.Text>

      </InputGroup.Prepend>

      <FormControl
        className="searchInput"
        placeholder="Search..."
        aria-label="search-input"
        aria-describedby="search-input"
      />
    </InputGroup>
  );
};

export default Search;