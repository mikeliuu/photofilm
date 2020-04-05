import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import Layout from '../../components/Layout/Layout';
import * as alert from '../../actions/alertActions';
import { loginUser } from '../../actions/authActions';


const Login = () => {
  const dispatch = useDispatch();
  const alertMessage = useSelector(state => state.alert.message);

  const NAME_LENGTH = 4;
  const PW_LENGTH = 4;
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regexName = /^[a-z0-9]{4,}$/;


  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    isValidName: true,
    isValidEmail: true,
    isValidPw: true,
    isValidConfirmPw: true,
    submitted: false,
    warning: []
  };

  const [state, setState] = useState(initialState);

  const onChangeInput = (e) => {
    if(e.target.name === 'input' && e.target.value.trim().length < 4) {
      setState({ ...state, [e.target.name]: e.target.value.trim(), isValidName: false });
    }
    setState({ ...state, [e.target.name]: e.target.value })
  };


  const onSubmit = (e) => {
    e.preventDefault();
    const { 
      submitted, 
      isValidEmail, 
      isValidPw, 
      warning,
      ...formData 
    } = state;

    //validation 
    const checkValid = (isValidEmail && isValidPw);
    const checkEmpty = Object.values(formData).every(i => i !== '');

    // console.log('formData', formData);
    

    if(checkValid && checkEmpty) {
      dispatch(alert.clear())
      dispatch(loginUser(formData));
    } else { //enhace warning alert from which field
      setState({ ...state, warning: ['Umm...something wrong, please check again!']})
      return;
    };

    dispatch(alert.clear())
    return setState({ ...initialState, submitted: true });
  };


  const isCheckEmail = (email) => {
    return regexEmail.test(email);
  };

  // const isCheckNamePw = (field) => {
  //   return regexName.test(field);
  // };


  //check if validate & show warning
  useEffect(() => {
    const { email, password } = state;
    
    //email
    if(email && email !== '' && !isCheckEmail(email)) {
      setState(state => ({...state, isValidEmail: false}))
    } else {
      setState(state => ({...state, isValidEmail: true}))
    };

    //password
    if(password && password !=='') {
      setState(state => ({...state, isValidPw: false}))
    } else {
      setState(state => ({...state, isValidPw: true}))
    };

  }, [state.email, state.password]);


  //success submit message
  useEffect(() => {
    if(!state.submitted) return;

    const offSubmitTimeout = setTimeout(() => {
      return (
        dispatch(alert.clear()),
        setState(state => ({ ...state, submitted: !state.submitted }))
      )
    }, 10000);

    return () => {
      clearTimeout(offSubmitTimeout);
    };
  }, [state.submitted, dispatch]);


  
  return (
    <Layout
      title={`Login - Photofilm`}
      keywords={`login, login page, signin, photo film, camera film, film, photofilm`}
      description={"Login your member account of photofilm."}
      className={`d-flex justify-content-center align-items-center`}
    >

      <div className="signup">
        <Form onSubmit={ (e) => onSubmit(e) }>

          <div className="formInput">
            <FormGroup>
              <Label>Email</Label>
              <Input className={ !state.isValidEmail ? 'wrongBorder' : 'defaultBorder' }type="text" name="email" placeholder="Email" value={ state.email } onChange={ (e) => onChangeInput(e) } />

              {
                (!state.isValidEmail && !isCheckEmail(state.email)) && <div className='wrongText'>Hmm...that doesn't look like an email address</div>
              }
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <Input className={ !state.isValidPw ? 'wrongBorder' : 'defaultBorder' } type="password" name="password" placeholder={`Enter Password`} value={ state.password } onChange={ (e) => onChangeInput(e) } />

              {
                !state.isValidPw && <div className='wrongText'>Hmm...Your password is incorrect</div>
              }
            </FormGroup>

            <Button type="submit" className="authSubmitBtn btnFilled">
              { state.submitted && !alertMessage ? `Sending...` : `Login` }
            </Button>

            {/* {alertMessage} */}

            {
              state.warning.length > 0 && state.warning.map((warn, index) => (<div key={index} className='warning'>{`${warn}`}</div>))
            }

            {
              alertMessage && <div className="authSuccess">{ alertMessage }</div>
            }
          </div>

          <Link to='/signup' className="optionBottom signupLink"><div className='linkText pinBlack'>Create account</div></Link>

        </Form>
      </div>
    </Layout>
  );
};

export default Login;