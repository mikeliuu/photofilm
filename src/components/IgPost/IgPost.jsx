import React from "react";
import ProgressiveImage from 'react-progressive-image';

const IgPost = (props) => (
  <div className='igWrapper'>

    <div className='igHeader'>
      <h4>{`#${props.tag}`}</h4>
    </div>

    <div className='igList'>
      {
        props.posts && props.posts.length > 0 && props.posts.map((i, index) => (
          <ProgressiveImage src={i.display_url} placeholder={i.thumbnail_resource[0].src} key={index}>
            {src => <div className='igImg'><img src={src} alt={i.shortcode}/></div>}
          </ProgressiveImage>
        ))
      }
    </div>
    
  </div>
);

export default IgPost;