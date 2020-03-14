import React, { useState, useEffect } from "react";
import { useParams, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchIgPosts
} from '../actions/igActions';

import Layout from '../components/Layout/Layout';
import Loading from '../components/Loading/Loading';
import Cardboard from '../components/Cardboard/Cardboard';
import IgPost from '../components/IgPost/IgPost';

const Film = () => {
  const dispatch = useDispatch();

  const { seoName } = useParams();

  const prevSeoName = useLocation().pathname.split('/')[2];  

  const pSlug = seoName || prevSeoName;

  const films = useSelector(state => state.films.items);
  const posts = useSelector(state => state.posts.items);

  const [state, setState] = useState({
    selected: {},
    tag: '',
    slug: ''
  });

  useEffect(() => {
    if(films && films.length > 0) {

      const selectedData = films.filter(i => i.seo.slug === pSlug)[0];

      const tag = selectedData.name.trim().replace('-', ' ').split(' ').join('').toLowerCase();

      setState(state => ({ 
        ...state, 
        selected: selectedData,
        tag: tag,
        slug: pSlug
      }));
    };
  }, [films, pSlug]);


  useEffect(() => {
    if(state.tag) {
      dispatch(fetchIgPosts(state.tag));
    };
  }, [state.tag, dispatch]);


  const hasSelected = Object.entries(state.selected).length > 0 && state.selected.constructor === Object;

  const hasPosts = posts && posts.length > 0;


  return (
    <Layout 
      title={state.selected.name && `${state.selected.name} - Photofilm`}
      keywords={`${state.selected.name}, photo film, camera film, film, photofilm`}
      description={"Here is detail of photo film."}
    >

      {
        hasSelected && (
          <Cardboard 
            image={state.selected.image}
            brand={state.selected.brand}
            name={state.selected.name}
            description={state.selected.description}
          />
        ) 
      }

      { hasSelected && hasPosts ? (
        <IgPost 
          tag={state.tag}
          posts={posts}
        />
      ) : <Loading />
      }

    </Layout>
  );
};

export default Film;
