import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className='not-found-wrapper'>
    <p className='not-found'>
      404 Not Found.&nbsp; Please visit our <Link to='/'>Homepage</Link>.
    </p>

  </div>
);

export default NotFound;