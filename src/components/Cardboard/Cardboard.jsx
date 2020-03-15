import React from "react";
import ProgressiveImage from 'react-progressive-image';

const Cardboard = (props) => (
  <div className='filmInfo'>

    <div className="cardboard">

      <div>
        <div className='imageWrapper'>
          <div className='infoImgBox'>
            <ProgressiveImage src={props.image} placeholder={props.image}>
              {src => <img id='filmImg' src={src} alt={props.name} />}
            </ProgressiveImage>
            
          </div>
        </div>
      </div>

      <div>
        <div className='infoWrapper'>
          <div className='infoHeader'>
            <h3>{props.name.toUpperCase()}</h3>
            <h5>{props.brand.name.toUpperCase()}</h5>
          </div>
          <div className='infoBody'>
            <p>{props.description}</p>
          </div>
        </div>
      </div>

    </div>

  </div>
);

export default Cardboard;