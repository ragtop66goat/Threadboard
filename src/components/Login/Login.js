import {Button} from "react-bootstrap";
import {v4 as uuidv4} from 'uuid';
import {useSelector, useDispatch} from "react-redux";
import {ON_LOGIN, ON_REG, ON_SET_PASSWORD_IN, ON_SET_USERNAME_IN, ON_SET_ID} from "../../modules/threads";

export function Login({_useSelector = useSelector, _useDispatch = useDispatch, _uuidv4 = uuidv4}) {
  const dispatch = _useDispatch()
  const usernameIn = _useSelector((state) => state.usernameIn)
  const passwordIn = _useSelector((state) => state.passwordIn)
  const loginError = _useSelector((state) => state.loginError)

// updates username value in redux
  //todo: implement useRef for username and password input
  function onUsernameChange(e){
    dispatch({type: ON_SET_USERNAME_IN, value: e.target.value})
  }

  // updates password value in redux
  function onPasswordChange(e){
    dispatch({type: ON_SET_PASSWORD_IN, value: e.target.value})
  }

  // handles the Create Account click
  function onCreateAccount() {
    const id = _uuidv4();
    dispatch({type: ON_SET_ID, value: id})
    dispatch({type: ON_REG})
  }



  return<>
    <div className={"d-flex flex-column"}>
      <h1>Welcome to Threadboard</h1>
      <input onChange={onUsernameChange} value={usernameIn} className={'mt-4'} type={'text'} placeholder={'Username'}/>
      <input onChange={onPasswordChange} value={passwordIn} className={'mt-3'} type={'password'} placeholder={'Password'}/>
      {/*dispatches ON_LOGIN. the updated username and password are taken from redux*/}
      <Button onClick={() => dispatch({type: ON_LOGIN})} className={'mt-4'} >Login</Button>
      <Button onClick={onCreateAccount} className={'mt-4'} >Create Account</Button>
      {/*loginError is from redux*/}
      <div aria-label={"error"} className={'w-75 mt-2 text-danger'}>{loginError}</div>
    </div>

  </>
}