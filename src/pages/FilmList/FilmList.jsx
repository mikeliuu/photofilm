import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProgressiveImage from 'react-progressive-image';

import Layout from '../../components/Layout/Layout';
import Loading from '../../components/Loading/Loading';

import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

import {
  fetchFilms,
  addFilmSaved,
  subFilmSaved,
} from "../../actions/filmActions";

// show more control //
const SHOW_AMOUNT = 3;
const SHOW_INITIAL = 6;


const FilmList = () => {
  const dispatch = useDispatch();
  const films = useSelector(state => state.films.items);

  const [state, setState] = useState({
    showRange: SHOW_INITIAL,
    savedList: window.localStorage.getItem("savedList")
    ? JSON.parse(window.localStorage.getItem("savedList"))
    : []
  });

  useLayoutEffect(() => {
    dispatch(fetchFilms());
  }, [dispatch]);

  useEffect(() =>{
    if(!window.localStorage['savedList']) {
      window.localStorage.setItem("savedList", JSON.stringify([]));
    };

    window.localStorage.setItem("savedList", JSON.stringify(state.savedList));
  }, [state]);


  // wrapper func from here! //
  const savedWrapperFunc = (id, saved, slug) => {
    if (state.savedList.indexOf(id) === -1 && saved >= 0) {
      dispatch(addFilmSaved(id, saved, slug));
      setState({...state, savedList: [...state.savedList, id]});
      
    } else if (saved > 0) {
      dispatch(subFilmSaved(id, saved, slug));
      setState({...state, savedList: state.savedList.filter(i => i !== id)});
    }
  };


  // show more here //
  const onShowMore = () => {
    if (films.length > 0) {
      setState({ ...state, showRange: state.showRange + SHOW_AMOUNT });
    }
  };


  const cardSection = () => (
    <>
      <div className="cardSection">
        {films &&
          films.length > 0 &&
          films.map((i, index) => {
            const filmName = i.brand.name && i.brand.name
              .toUpperCase()
              .concat(` - ${i.name.toUpperCase()}`);

            return ( index <= state.showRange - 1 ) && (
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
                        >
                          View
                        </Button>
                      </Link>

                      <Button
                        key={i.index}
                        className="cardBtn btnOutline"
                        onClick={() => savedWrapperFunc(i._id, i.saved, i.seo.slug)}
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
              );
            }
          )}
      </div>

      {
        films.length > 0 && state.showRange < films.length && (
        <div className="moreBtnWrapper">
          <Button className="btnMore" onClick={() => onShowMore()}>
            Show More
          </Button>
        </div>
        )
      }
    </>
  );


  return (
    <Layout 
      title={"Films - Photofilm"}
      keywords={"film list, photo films, photo film library, photofilm"}
      description={"Photofilm is a library for vintage camera film."}
    >

      <div className="cardSectionWrapper">
        { 
          films && films.length > 0 ? cardSection() : <Loading />
        }
      </div>

    </Layout>
  );
};

export default FilmList;
