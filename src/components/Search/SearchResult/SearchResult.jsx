import React from 'react';
import { ListGroup } from 'react-bootstrap';

const SearchResult = (props) => {

  return(
    <ListGroup className='searchResult'>

      {
        !props.results.length && (
          <ListGroup.Item className='noResults'>
            <p className="resultHead">No results found for query</p>

            <div className='keywordBold'>
              "{props.keyword && props.keyword.split('')}"
            </div>
          </ListGroup.Item>
        )
      }

      {
        props.results.length > 0 && (
          props.results.map((i, index) => {
            return (
              <ListGroup.Item key={index} action href={`/film/${i.seo.slug}`}>
                { i.name }
              </ListGroup.Item>
            )
            
          })
        )
      }

    </ListGroup>
  )
};

export default SearchResult;