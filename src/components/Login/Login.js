import {Button} from "react-bootstrap";
import {v4 as uuidv4} from 'uuid';
import {useSelector, useDispatch} from "react-redux";
import {ON_LOGIN, ON_REG, ON_SET_PASSWORD_IN, ON_SET_USERNAME_IN, ON_SET_ID} from "../../modules/threads";
import {useRef} from "react";

export function Login({_useSelector = useSelector, _useDispatch = useDispatch, _uuidv4 = uuidv4}) {
  const dispatch = _useDispatch()
  const loginError = _useSelector((state) => state.loginError)
  const usernameRef = useRef();
  const passwordRef = useRef();

  //handles login click
  function onLogin() {
    dispatch({type: ON_SET_PASSWORD_IN, value: usernameRef.current.value})
    dispatch({type: ON_SET_USERNAME_IN, value: passwordRef.current.value})
    dispatch({type: ON_LOGIN})
  }

  // handles the Create Account click
  function onCreateAccount() {
    const id = _uuidv4();
    dispatch({type: ON_SET_PASSWORD_IN, value: usernameRef.current.value})
    dispatch({type: ON_SET_USERNAME_IN, value: passwordRef.current.value})
    dispatch({type: ON_SET_ID, value: id})
    dispatch({type: ON_REG})
  }



  return<>
    <div className={"d-flex flex-column"}>
      <h1>Welcome to Threadboard</h1>
      <input ref={usernameRef} className={'mt-4'} type={'text'} placeholder={'Username'}/>
      <input ref={passwordRef} className={'mt-3'} type={'password'} placeholder={'Password'}/>
      {/*dispatches ON_LOGIN. the updated username and password are taken from redux*/}
      <Button onClick={onLogin} className={'mt-4'} >Login</Button>
      <Button onClick={onCreateAccount} className={'mt-4'} >Create Account</Button>
      {/*loginError is from redux*/}
      <div aria-label={"error"} className={'w-75 mt-2 text-danger'}>{loginError}</div>
    </div>

  </>
}