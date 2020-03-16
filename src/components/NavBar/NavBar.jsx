import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import Search from '../Search/Search';

const NavBar = () => {
  const { pathname } = useLocation();

  const [state, setState] = useState({
    isSearch: false,
    searchVal: '',
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

    setState({ ...state, searchVal: '' });
  };


  const linkNormal = `linkText pinGrey`;
  const linkActive = `linkText pinBlack`;

  const navList = [
    { path: '/', text: 'Home' },
    { path: '/saved', text: 'Saved' },
    // { path: '/signup', text: 'Signup' }
  ];

  console.log('navbar state', state);


  return (
    <div className="navWarpper">
      <div className="navbar">
        <Link to="/" className="navLogo">
          Photofilm
        </Link>

        <div className='navRight'>
          <Search 
            value={ state.searchVal }
            isSearch={ state.isSearch }
            onChange={ (e) => onSearch(e) }
            onClick={() => onClickSearch() }
            btnOnClick={ () => onClearSearch() }
          />

          <div className="navList">
            {
              navList && (
                navList.map((n, index) => (
                  <Link to={ n.path } className='navLink' key={index}>
                    <div className={ pathname === n.path ? linkActive : linkNormal }>
                      { n.text }
                    </div>
                  </Link>
                ))
              )
            }
          </div>
        </div>

        <div id='navDivider'></div>
      </div>

    </div>
  );
};

export default NavBar;
