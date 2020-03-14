import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '../NavBar/NavBar';

const Layout = ({title, keywords, description, className, style, children}) => {

  return (
    <div className='layout'>
      <Helmet>
        <title>{ title }</title>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#ffffff"/>
        <meta name="keywords" content={ keywords } />
        <meta name="description" content={ description } />
      </Helmet>

      <NavBar/>

      <div className={className ? `layoutBody ${className}` : `layoutBody`} style={ style }>
        { children }
      </div>

    </div>
  )
};

export default Layout;

