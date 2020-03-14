import React from "react";
import Loader from 'react-loader-spinner';

const loaderColor = '#D0C5A7'; //$primary-color

const Loading = () => (
  <div className='loaderWrapper'>
    <Loader type="ThreeDots" height={80} width={80} color={loaderColor}/>
    <p className='loading'>loading...</p>
  </div>
);

export default Loading;
