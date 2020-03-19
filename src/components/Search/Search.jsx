import React, { useState } from 'react';
import { useSelector } from "react-redux";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { InputGroup, FormControl } from 'react-bootstrap';

import SearchResult from './SearchResult/SearchResult';

const Search = () => {
  const initialState = {
    isSearch: false,
    searchVal: ''
  };

  const [state, setState] = useState({
    ...initialState
  });

  const films = useSelector(state => state.films.items);


  const onSearch = (e) => {
    console.log('onSearch', e.target.value);

    //wip on search logic
    //wip on update film viewed

    setState({...state, searchVal: e.target.value});
  };

  const onClickSearch = () => {
    setState({ ...state, isSearch: !state.isSearch });
  };

  const onClearSearch = () => {
    setState({ ...initialState });
  };

  //search logic,
  const noSpaceVal = state.searchVal.trim().toLowerCase().replace(/\s/g,'');
  const keyword = state.searchVal.trim().toLowerCase();

  const results = films.filter(film => {
    return (
      film.name.toLowerCase().match(noSpaceVal) ||
      film.name.toLowerCase().replace(/\s/g,'').match(noSpaceVal) || 
      film.brand.name.toLowerCase().match(noSpaceVal) || 
      film.brand.name.toLowerCase().replace(/\s/g,'').match(noSpaceVal) || 
      film.seo.slug.toLowerCase().match(noSpaceVal) || 
      film.seo.slug.toLowerCase().replace(/-/g,'').match(noSpaceVal)
    )
  });


  return (
    <InputGroup className='search'>

      <SearchRoundedIcon className='searchIcon'/>

      <div className='searchGroup'>
        <FormControl
          className='searchBgColor searchInput'
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

      {
        state.searchVal && 
        <SearchResult
          keyword={ keyword }
          results={ results }
        />
      }
      
      
    </InputGroup>
  );
};

export default Search;