import React from 'react';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { InputGroup, FormControl } from 'react-bootstrap';

const Search = (props) => {
  
  return (
    <InputGroup className="search">
      <InputGroup.Prepend>
        <InputGroup.Text className="searchBgColor">
          <SearchRoundedIcon className='searchIcon'/>
        </InputGroup.Text>
      </InputGroup.Prepend>

      <div className='searchGroup'>
        <FormControl
          className="searchBgColor searchInput"
          type='navSearch'
          placeholder="Search..."
          value={ props.value }
          onChange={ props.onChange }
          onClick={ props.onClick }
        />
        
        <div className='searchClearWrapper' onClick={ props.btnOnClick }>
          {
            props.value && (
              <div className='clearBtnBg'>
                <ClearRoundedIcon 
                  className='searchClear'
                />
              </div>
            )
          }
        </div>
        
      </div>
      
    </InputGroup>
  );
};

export default Search;