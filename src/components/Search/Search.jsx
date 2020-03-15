import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { InputGroup, FormControl } from 'react-bootstrap';

const Search = (props) => {
  
  return (
    <InputGroup className="search">
      <InputGroup.Prepend>
        <InputGroup.Text className="searchBgColor">
          <SearchIcon id='searchIcon'/>
        </InputGroup.Text>
      </InputGroup.Prepend>

      <FormControl
        type='search'
        className="searchBgColor searchInput"
        placeholder="Search..."
        
      />
    </InputGroup>
  );
};

export default Search;