import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import Search from '../Search/Search';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import BookmarkIcon from "@material-ui/icons/Bookmark";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const NavBar = () => {
  const { pathname } = useLocation();

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
    
  };


  return (
    <nav className="navWrapper">

      {/* desktop nav */}
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

        <MoreHorizRoundedIcon className='navMenuIcon pinGrey' onClick={ () => onClickDropdown() }/>
      </div>

      {/* mobile nav */}
      <div className='mobileNav'>
          <Search className='mobileSearch'/>
          <div className='linkWrapper'>
            {
              navList && (
                navList.map((n, index) => {
                  if(!n.icon) return;

                  return(
                    <Link to={ n.path } className='dropdownLink' key={index}>
                      <div className={ pathname === n.path ? mobileLinkActive : linkNormal }>
                        { n.icon }
                      </div>
                    </Link>
                  )
                })
              )
            }
          </div>
        </div>

      <div id='navDivider'></div>

    </nav>
  );
};

export default NavBar;
