import React from 'react';
import { ListGroup } from 'react-bootstrap';

const SearchResult = (props) => {  

  // console.log('props.results', props.results);

  return(
    <div className='searchResult resultHeadColor'>
      <ListGroup>
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
                <React.Fragment key={index}>

                  <ListGroup.Item className='searchListHead'>
                    { i.brand.toUpperCase() }
                  </ListGroup.Item>

                  { 
                    i.films.length > 0 && (
                      i.films.map((f, index) => {
                        const filmName = `${f.name.charAt(0).toUpperCase()}${f.name.slice(1)}`
                        
                        return (
                          <ListGroup.Item key={index} action href={`/film/${f.slug}`}>
                            { filmName }
                          </ListGroup.Item>
                        )
                      })
                    )
                  }

                </React.Fragment>
              )
              
            })
          )
        }
      </ListGroup>
    </div>
  )
};

export default SearchResult;