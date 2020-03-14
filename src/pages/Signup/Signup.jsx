import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import Layout from '../../components/Layout/Layout';
import * as alert from '../../actions/alertActions';
import { signupUser } from '../../actions/authActions';


const Signup = () => {
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
    if(e.target.name === 'username' && e.target.value.trim().length < 4) {
      setState({ ...state, [e.target.name]: e.target.value.trim(), isValidName: false });
    }
    setState({ ...state, [e.target.name]: e.target.value.trim() })
  };


  const onSubmit = (e) => {
    e.preventDefault();
    const { 
      submitted, 
      isValidName, 
      isValidEmail, 
      isValidPw, 
      isValidConfirmPw,
      warning,
      ...formData 
    } = state;

    //validation 
    const checkValid = (isValidName && isValidEmail && isValidPw && isValidConfirmPw);
    const checkEmpty = Object.values(formData).every(i => i !== '');

    if(checkValid && checkEmpty) {
      dispatch(alert.clear())
      dispatch(signupUser(formData));
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

  const isCheckNamePw = (field) => {
    return regexName.test(field);
  };


  //check if validate & show warning
  useEffect(() => {
    const { email, password, confirmPassword } = state;

    //email
    if(email && email !== '' && !isCheckEmail(email)) {
      setState(state => ({...state, isValidEmail: false}))
    } else {
      setState(state => ({...state, isValidEmail: true}))
    };

    //password
    if(password && password !=='' && password.length < PW_LENGTH && !isCheckNamePw(password)) {
      setState(state => ({...state, isValidPw: false}))
    } else {
      setState(state => ({...state, isValidPw: true}))
    };

    //confirm password
    if(confirmPassword && confirmPassword !=='' && confirmPassword !== password) {
      setState(state => ({...state, isValidConfirmPw: false}))
    } else {
      setState(state => ({...state, isValidConfirmPw: true}))
    };

  }, [state.email, state.password, state.confirmPassword]);


  //success submit message
  useEffect(() => {
    if(!state.submitted) return;

    const offSubmitTimer = setTimeout(() => {
      return (
        dispatch(alert.clear()),
        setState(state => ({ ...state, submitted: !state.submitted }))
      )
    }, 10000);

    return () => {
      clearTimeout(offSubmitTimer);
    };
  }, [state.submitted, dispatch]);


  //check username & toLowerCase
  useEffect(() => {
    const { username } = state;
    if(username === '') return ;
    
    if(isCheckNamePw(username)) return setState(state => ({...state, username: username.toLowerCase(), isValidName: true}))

    const lowerUsernameTimer = setTimeout(() => {
      if(username && username !== '' && !isCheckNamePw(username)) {
        return setState(state => ({...state, username: username.toLowerCase(), isValidName: false}))
      }
    }, 200);

    return () => {
      clearTimeout(lowerUsernameTimer)
    };
  }, [state.username, state.isValidName]);

  console.log('state', state)

  return (
    <Layout
      title={`Signup - Photofilm`}
      keywords={`signup, register, photo film, camera film, film, photofilm`}
      description={"Signup an account to be a member of photofilm."}
      className={`d-flex justify-content-center align-items-center`}
    >

      <div className="signup">
        <Form onSubmit={ (e) => onSubmit(e) }>

          <div className="formInput">
            <FormGroup >
              <Label>Username</Label>
              <Input className={ !state.isValidName ? 'wrongBorder' : 'defaultBorder' } type="text" name="username" placeholder={`Username at least ${NAME_LENGTH} characters`} value={ state.username } onChange={ (e) => onChangeInput(e) } />

              {
                !state.isValidName && <div className='wrongText'>Username is required { NAME_LENGTH } characters long or above</div>
              }
            </FormGroup>

            <FormGroup>
              <Label>Email</Label>
              <Input className={ !state.isValidEmail ? 'wrongBorder' : 'defaultBorder' }type="text" name="email" placeholder="Email" value={ state.email } onChange={ (e) => onChangeInput(e) } />

              {
                (!state.isValidEmail && !isCheckEmail(state.email)) && <div className='wrongText'>Hmm...that doesn't look like an email address</div>
              }
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <Input className={ !state.isValidPw ? 'wrongBorder' : 'defaultBorder' } type="password" name="password" placeholder={`Password at least ${PW_LENGTH} characters`} value={ state.password } onChange={ (e) => onChangeInput(e) } />

              {
                !state.isValidPw && <div className='wrongText'>Password is required { PW_LENGTH } characters long or above</div>
              }
            </FormGroup>

            <FormGroup>
              <Label>Confirm Password</Label>
              <Input className={ !state.isValidConfirmPw ? 'wrongBorder' : 'defaultBorder' }type="password" name="confirmPassword" placeholder="Re-enter password" value={ state.confirmPassword } onChange={ (e) => onChangeInput(e) } />

              {
                !state.isValidConfirmPw && <div className='wrongText'>Password doesn't match</div>
              }
            </FormGroup>

            <Button type="submit" className="signupBtn btnFilled">Signup</Button>

            {/* {alertMessage} */}

            {
              state.warning.length > 0 && state.warning.map((warn, index) => (<div key={index} className='warning'>{`${warn}`}</div>))
            }

            {
              alertMessage && <div className="signupSuccess">{ alertMessage }</div>
            }
          </div>

          <div className="signupBottom">
            <Link to='/login' className="signupLink"><div className='linkText pinBlack'>Login your account</div></Link>
          </div>

        </Form>
      </div>
    </Layout>
  );
};


export default Signup;