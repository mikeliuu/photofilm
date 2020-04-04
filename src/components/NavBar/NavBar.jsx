import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import Search from '../Search/Search';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import BookmarkIcon from "@material-ui/icons/Bookmark";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';


const NavBar = () => {
  const { pathname } = useLocation();

  const [state ,setState] = useState({
    isOpenDropdown: false,
  });

  const linkNormal = `linkText pinGrey`;
  const linkActive = `linkText pinBlack`;
  const mobileLinkActive = `linkText mobileActive`;

  const navList = [
    { path: '/', text: 'Home', icon: '' },
    { path: '/saved', text: 'Saved', icon: <BookmarkIcon/> },
    { path: '/signup', text: 'Signup', icon: <AccountCircleRoundedIcon/> }
  ];


  const onClickDropdown = () => {
    console.log('click dropdown nav');
    
    setState({ ...state, isOpenDropdown: !state.isOpenDropdown });
  };


  return (
    <nav className="navWrapper">

    {
      state.isOpenDropdown ? (
        <div className='mobileNav'>
          <Search className='mobileSearch'/>
          <div className='linkWrapper'>
            {
              navList && (
                navList.map((n, index) => {
                  // if(!n.icon) return;

                  return(
                    <Link to={ n.path } className='dropdownLink' key={index}>
                      <div className={ pathname === n.path ? linkActive : linkNormal }>
                        { n.text }
                      </div>
                    </Link>
                  )
                })
              )
            }
          </div>

          <CloseRoundedIcon className='navCloseIcon' onClick={ () => onClickDropdown() }/>
        </div>
      ) : (
        <>
          <div className="navbar">
            <Link to="/" className="navLogo">
              Photofilm
            </Link>

            <div className='navRight'>
              <Search />
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

            <MoreHorizRoundedIcon className='navMenuIcon' onClick={ () => onClickDropdown() }/>
          </div>

          <div id='navDivider'></div>
        </>
        )
      }

      
      {/* {
        state.isOpenDropdown && <div className='navOverlay'></div>
      } */}

    </nav>
  );
};

export default NavBar;
