import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from './components/Utils/ScrollToTop';
import NotMatch from './pages/NotMatch';
import FilmList from './pages/FilmList/FilmList';
import Film from './pages/Film';
import FilmSaved from './pages/FilmSaved';
import Signup from './pages/Signup/Signup';
import Checkout from './pages/Checkout';

const App = () => {
  return (
    <Router>

      <ScrollToTop/>

      <Switch>
          <Route exact path='/' component={FilmList} />
          <Route path='/saved' component={FilmSaved} />
          <Route path='/signup' component={Signup} />
          <Route path='/checkout' component={Checkout} />
          {/* <Route path='/brands' component={NotMatch} /> */}
          <Route path='/film/:seoName' component={Film} />
          <Route path='*' component={NotMatch} />
        </Switch>

    </Router>
    
  );
};

export default App;