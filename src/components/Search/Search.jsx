import React, { useState } from 'react';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { InputGroup, FormControl } from 'react-bootstrap';

const Search = () => {
  const initialState = {
    isSearch: false,
    searchVal: ''
  };

  const [state, setState] = useState({
    ...initialState
  });

  const onSearch = (e) => {
    console.log('onSearch', e.target.value);

    //wip on search logic

    setState({...state, searchVal: e.target.value});
  };

  const onClickSearch = () => {
    console.log('onClickSearch');
    
    setState({ ...state, isSearch: !state.isSearch });
  };

  const onClearSearch = () => {
    console.log('onClearSearch');

    setState({ ...initialState });
  };

  console.log('search state', state);


  return (
    <InputGroup className={`search`} >

      <SearchRoundedIcon className='searchIcon'/>

      <div className='searchGroup'>
        <FormControl
          // className={state.isSearch ? `searchExtend searchBgColor searchInput` : `searchBgColor searchInput`}
          className={`searchBgColor searchInput`}
          type='navSearch'
          placeholder="Search..."
          value={ state.searchVal }
          onChange={ (e) => onSearch(e) }
          onClick={ () => onClickSearch() }
        />
        
        <div className='searchClearWrapper' onClick={ () => onClearSearch() }>
          {
            state.searchVal && (
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