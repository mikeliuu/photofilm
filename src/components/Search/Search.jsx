import React, { useState } from 'react';
import { useSelector } from "react-redux";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { InputGroup, FormControl } from 'react-bootstrap';

import SearchResult from './SearchResult/SearchResult';

const Search = () => {
  const initialState = {
    searchVal: '',
    searchResult: []
  };

  const [state, setState] = useState({
    ...initialState
  });

  const films = useSelector(state => state.films.items);


  const onSearch = (e) => {
    // console.log('onSearch', e.target.value);

    const noSpaceVal = e.target.value.trim().toLowerCase().replace(/\s/g,'');
  
    //search logic
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

    //results group by brand
    const mappedResults = results.reduce((acc, cur) => {
      let temp = acc.find(i => i.brand === cur.brand.name);
      
      if(!temp) {
        acc.push(temp = { brand: cur.brand.name, films: [] });
      };
      
      temp.films.push({ name: cur.name, slug: cur.seo.slug });

      return acc
    }, []);

    // console.log('mappedResults', mappedResults);

    setState({ ...state, searchVal: e.target.value, searchResult: mappedResults });
    
  };


  const onClearSearch = () => {
    setState({ ...initialState });
  };


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
          keyword={ state.searchVal && state.searchVal.trim().toLowerCase() }
          results={ state.searchResult || [] }
        />
      }
      
    </InputGroup>
  );
};

export default Search;