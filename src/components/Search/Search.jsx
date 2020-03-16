import React, { useState } from 'react';
import { useSelector } from "react-redux";
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

  const films = useSelector(state => state.films.items);


  const onSearch = (e) => {
    console.log('onSearch', e.target.value);

    //wip on search logic

    setState({...state, searchVal: e.target.value});
  };

  const onClickSearch = () => {
    setState({ ...state, isSearch: !state.isSearch });
  };

  const onClearSearch = () => {
    setState({ ...initialState });
  };

  //logic, move to onSearch
  const noSpaceVal = state.searchVal.trim().toLowerCase().replace(/\s/g,'');

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

  console.log('search noSpaceVal', noSpaceVal);
  console.log('search results', results);


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