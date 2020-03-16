import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProgressiveImage from 'react-progressive-image';

import Layout from '../components/Layout/Layout';
import Loading from '../components/Loading/Loading';

import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

import {
  addFilmSaved,
  subFilmSaved,
  addFilmViewed
} from "../actions/filmActions";

const FilmSaved = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    savedList: window.localStorage.getItem("saved_films")
    ? JSON.parse(window.localStorage.getItem("saved_films"))
    : []
  });

  const films = useSelector(state => state.films.items);


  useEffect(() =>{
    if(!window.localStorage['saved_films']) {
      window.localStorage.setItem("saved_films", JSON.stringify([]));
    };

    window.localStorage.setItem("saved_films", JSON.stringify(state.savedList));
  }, [state]);


  // wrapper func from here! //
  const savedWrapperFunc = (id, saved) => {
    if (state.savedList.indexOf(id) === -1 && saved >= 0) {
      dispatch(addFilmSaved(id, saved));
      setState({...state, savedList: [...state.savedList, id]});
      
    } else if (saved > 0) {
      dispatch(subFilmSaved(id, saved));
      setState({...state, savedList: state.savedList.filter(i => i !== id)});
    }
  };

  const viewedWrapperFunc = (id, viewed) => {
    dispatch(addFilmViewed(id, viewed));
  };


  const cardSection = () => {
    let savedData = [];

    const filterSavedData = films.length > 0 && state.savedList.length > 0 ? (
      state.savedList.map(i => films.filter(p => p._id === i))) : savedData;

    if(filterSavedData && filterSavedData.length > 0) {
      savedData = filterSavedData.reduce((acc, cur) => acc.concat(cur), []);
    };


    return (
      <>
        <div className="cardSection">
          { savedData.length > 0 && (
            savedData.map((i, index) => {

              const filmName = i.brand.name && i.brand.name
              .toUpperCase()
              .concat(` - ${i.name.toUpperCase()}`);

              return (
                <Card className="productCard" key={index}>
                <div className="pcardWrapper">
                  <ProgressiveImage src={i.image} placeholder={i.image}>
                    {src => <img src={`${src}`} alt={i.name}/>}
                  </ProgressiveImage>
                </div>
                <div className="cardDivider"></div>
                <Card.Body className="cbody">
                  <Card.Title className="ctitle">{filmName}</Card.Title>

                  <div className="crating">
                    <div className="rateWrapper">
                      <TrendingUpIcon style={{ marginRight: "2px" }} />
                      <div className="rateText">{i.viewed}</div>
                    </div>

                    <div className="rateWrapper">
                      <BookmarkIcon />
                      <div className="rateText">{i.saved}</div>
                    </div>
                  </div>

                  <div className="cardBtnWrapper">
                    <Link to={`/film/${i.seo.slug}`}>
                      <Button
                        className="cardBtn btnFilled"
                        onClick={() => viewedWrapperFunc(i._id, i.viewed)}
                      >
                        View
                      </Button>
                    </Link>

                    <Button
                      key={i.index}
                      className="cardBtn btnOutline"
                      onClick={() => savedWrapperFunc(i._id, i.saved)}
                    >
                      {state.savedList.indexOf(i._id) === -1 ? (
                        <>
                          <BookmarkBorderIcon />
                          Save
                        </>
                      ) : (
                        <>
                          <BookmarkIcon />
                          Saved
                        </>
                      )}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
              )
            })
          )}
        </div>
      </>
    )};


  const noSaved = () => (
    <div className='noSavedWrapper'>
      <p className='noSaved'>You have no saved film. Please add your favourite film <Link to='/'>here</Link>.</p>
    </div>
  );

  return (
    <Layout 
      title={"Saved Films - Photofilm"}
      keywords={"film saved, saved list, film list, photo films, photo film library, photofilm"}
      description={"Your saved film list at Photofilm."}
    >

      <div className="cardSectionWrapper">
        { 
          state.savedList && state.savedList.length > 0 ? (
            films && films.length > 0 ? cardSection() : <Loading />
          ) : noSaved()
        }
      </div>

    </Layout>
  );
};

export default FilmSaved;
