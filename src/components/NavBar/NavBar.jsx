import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import Search from '../Search/Search';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import BookmarkIcon from "@material-ui/icons/Bookmark";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import useWindowDimensions from '../Utils/WindowDimensions';

const NavBar = () => {
  const { pathname } = useLocation();
  const { width } = useWindowDimensions();

  //media query
  const MEDIA_MD = 768;

  const linkNormal = `linkText pinGrey`;
  const linkActive = `linkText pinBlack`;
  const mobileLinkActive = `linkText mobileActive`;

  const navList = [
    { path: '/', text: 'Home', icon: '' },
    { path: '/saved', text: 'Saved', icon: <BookmarkIcon/> },
    { path: '/signup', text: 'Signup', icon: <AccountCircleRoundedIcon/> }
  ];

  const [state ,setState] = useState({
    isOpenDropdown: false,
    isTabletWidth: false
  });


  useEffect(() => {
    if(width <= MEDIA_MD) {
      setState(state => ({ ...state, isTabletWidth: true }));
    } else {
      setState(state => ({ ...state, isTabletWidth: false }));
    };

  }, [width]);


  const onClickDropdown = () => {
    setState({ ...state, isOpenDropdown: !state.isOpenDropdown });
  };



  return (
    <nav className="navWrapper">

    {
      state.isOpenDropdown ? (
        <div className={ `mobileNav ${(state.isOpenDropdown && 'fadeIn')}` }>
          <Search className='mobileSearch'/>
          <div className='linkWrapper'>
            {
              navList && (
                navList.map((n, index) => {
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
        <> {/* desktop & tablet */}
          <div className="navbar">
            <Link to="/" className="navLogo">
              Photofilm
            </Link>

            <div className='navRight'>
              <Search />
              <div className="navList">

                {
                  navList && (
                    navList.map((n, index) => {
                      if(state.isTabletWidth && !n.icon) return;

                      return (
                        <Link to={ n.path } className={ state.isTabletWidth ? `navLink navLinkAdjust` : 'navLink' } key={ index }>

                          <div className={ 
                            pathname === n.path ? (
                              (state.isTabletWidth && n.icon) ?
                              linkActive : linkActive
                            ) : linkNormal 
                          }>

                            { 
                              state.isTabletWidth && n.icon ? 
                              (
                                <div className="navIconAdjust">
                                  { n.icon }
                                </div>
                              ) : n.text
                            }

                          </div>
                        </Link>
                      )
                    })
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
